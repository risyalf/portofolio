---
title: "Laravel Octane + FrankenPHP: Eksekusi Ribuan Request per Detik Tanpa Overhead PHP-FPM"
description: "Panduan lengkap akselerasi performa backend Laravel menggunakan Laravel Octane bertenaga FrankenPHP dan worker persistensi di memori RAM."
pubDate: 2026-10-06
category: "Laravel"
tags: ["Laravel Octane","FrankenPHP","Performance","Docker","DevOps"]
author: "Risyal Febrianto"
readTime: "8 min read"
featured: false
---

Tradisi lama siklus hidup PHP klasik adalah **share-nothing architecture**: setiap kali ada HTTP request masuk, PHP-FPM akan mem-boot framework dari nol, membaca konfigurasi, menginisialisasi service providers, mengeksekusi router, lalu membuang semua alokasi memori setelah response dikirim.

Dengan **Laravel Octane** dan runtime modern seperti **FrankenPHP** (atau Swoole/RoadRunner), aplikasi Laravel Anda hanya di-boot sekali di dalam RAM dan tetap hidup (*daemon mode*). Hasilnya adalah latensi di bawah 5 milidetik dan throughput meningkat hingga 5-10 kali lipat.

---

## 1. Mengapa FrankenPHP Menjadi Pilihan Utama?

FrankenPHP adalah application server modern berbasis Caddy web server yang ditulis dalam Go. Keunggulannya meliputi:
- **Automatic HTTPS** (sertifikat Let's Encrypt terintegrasi otomatis).
- **HTTP/3 Support** secara out-of-the-box.
- **Early Hints (103)** untuk mempercepat loading aset browser.
- **Integrasi native worker** tanpa membutuhkan ekstensi C yang rumit seperti Swoole.

Instalasi pada proyek Laravel:

```bash
composer require laravel/octane
php artisan octane:install --server=frankenphp
```

---

## 2. Menjalankan Octane Server

Di lingkungan development:

```bash
php artisan octane:start --watch
```

Flag `--watch` akan memantau perubahan file dan me-reload worker otomatis saat kode diperbarui.

---

## 3. Hati-hati dengan Memory Leaks & Static State!

Karena framework tidak lagi di-reboot antar HTTP request, Anda harus waspada terhadap persistensi data di service container:

### Aturan Emas Octane:
1. **Hindari menyimpan state request-specific di singleton**.
2. **Jangan mengikat Request instance ke property static**.
3. Gunakan callback resolver daripada static assignment.

Contoh penanganan yang benar:

```php
namespace App\Services;

use App\Models\User;

class CartManager
{
    // HINDARI: public ?User $currentUser = null;
    
    // GUNAKAN: Ambil user secara dinamis per operasi
    public function getActiveCart(int $userId)
    {
        return Cache::remember("cart:{$userId}", 300, function () use ($userId) {
            return Cart::where('user_id', $userId)->first();
        });
    }
}
```

---

## 4. Konfigurasi Deployment Docker di Production

Contoh Dockerfile ringkas berbasis image resmi FrankenPHP:

```dockerfile
FROM dunglas/frankenphp:latest-php8.3

ENV SERVER_NAME=":80"
WORKDIR /app

COPY . /app
RUN composer install --no-dev --optimize-autoloader
RUN php artisan config:cache && php artisan route:cache

CMD ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=80"]
```

---

## Kesimpulan

Laravel Octane dengan FrankenPHP membawa kapabilitas PHP setara dengan runtime Go atau Node.js dalam kecepatan eksekusi, sembari tetap mempertahankan kemudahan ekosistem Laravel yang ekspresif.
