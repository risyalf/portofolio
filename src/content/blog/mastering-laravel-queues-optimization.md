---
title: "Mastering Laravel Queues: High-Throughput Background Jobs with Redis & Horizon"
description: "Strategi optimasi arsitektur antrean (queues) pada skala produksi di Laravel menggunakan Redis, Laravel Horizon, rate limiting terdistribusi, dan penanganan graceful degradation."
pubDate: 2026-03-20
category: "Laravel"
tags: ["Laravel", "Queues", "Redis", "Horizon", "Performance", "Microservices"]
author: "Risyal Febrianto"
readTime: "9 min read"
featured: false
---

Ketika aplikasi web mulai bertumbuh dari ribuan pengguna harian menjadi jutaan request per menit, synchronous processing menjadi titik kemacetan utama (*bottleneck*). Mengirim email transaksi, memproses pembayaran via payment gateway, mengekspor laporan PDF berukuran raksasa, atau menyinkronkan data pihak ketiga harus dialihkan ke latar belakang (*background workers*).

Di ekosistem PHP modern, **Laravel Queue System** dipadukan dengan **Redis** dan **Laravel Horizon** adalah standar emas industri.

---

## 1. Menentukan Struktur Queue Berdasarkan Prioritas

Salah satu kesalahan umum pada deployment Laravel adalah menempatkan semua job ke dalam satu queue default (`default`). Jika queue Anda dipenuhi oleh ratusan job ekspor laporan yang memakan waktu 30 detik per job, email verifikasi user yang penting akan tertahan berjam-jam.

Solusinya adalah membagi antrean berdasarkan bobot pekerjaan:

```php
// config/horizon.php
'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['high', 'default', 'low', 'reports'],
            'balance' => 'auto',
            'autoScalingStrategy' => 'time',
            'maxProcesses' => 20,
            'minProcesses' => 5,
            'tries' => 3,
            'timeout' => 90,
        ],
    ],
],
```

Dengan mengurutkan antrean `['high', 'default', 'low', 'reports']`, worker akan selalu memproses semua item di antrean `high` sebelum menyentuh antrean lainnya.

---

## 2. Pemanfaatan Redis Rate Limiting Terdistribusi

Ketika berinteraksi dengan API pihak ketiga (misalnya WhatsApp Gateway atau Stripe) yang menerapkan batas frekuensi ketat (rate limit), kita tidak boleh membombardir endpoint tersebut secara serentak.

Laravel menyediakan helper concurrency limiter yang sangat kuat:

```php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;

class SendWhatsAppNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        // Membatasi maksimal 10 request per detik secara global di seluruh server
        Redis::throttle('whatsapp-api-limit')
            ->allow(10)
            ->every(1)
            ->then(function () {
                // Eksekusi API call
                $this->dispatchNotification();
            }, function () {
                // Jika limit tercapai, kembalikan job ke antrean untuk dicoba lagi setelah 3 detik
                $this->release(3);
            });
    }
}
```

---

## 3. Idempotency: Menghindari Duplikasi Eksekusi

Pada lingkungan terdistribusi, kegagalan jaringan atau worker restart sesaat sebelum acknowledgement dapat menyebabkan sebuah job dieksekusi dua kali (*at-least-once delivery*).

Untuk mencegah transaksi finansial atau pengurangan stok ganda, selalu terapkan **Idempotency Key**:

```php
namespace App\Jobs;

use Illuminate\Support\Facades\Cache;

class ProcessInvoicePaymentJob implements ShouldQueue
{
    public function __construct(
        public string $invoiceId,
        public float $amount
    ) {}

    public function handle(): void
    {
        $lock = Cache::lock("invoice:processing:{$this->invoiceId}", 60);

        if (! $lock->get()) {
            // Pekerjaan sedang berjalan di worker lain atau sudah selesai
            return;
        }

        try {
            // Logika pemotongan saldo / debet
            $this->chargeCustomer();
        } finally {
            $lock->release();
        }
    }
}
```

---

## 4. Monitoring Real-Time dengan Laravel Horizon

Laravel Horizon menyajikan dasbor visual memukau untuk mengamati metrik throughput per menit, runtime durasi, kegagalan job, serta visualisasi beban kerja CPU. 

Pastikan Anda memasang alert notifikasi melalui Slack atau Telegram ketika metrik `wait` (waktu antrean menunggu worker) melewati ambang batas tertentu:

```bash
php artisan horizon:snapshot
```

---

## Ringkasan Praktik Terbaik

1. **Gunakan Redis sebagai backend queue**, hindari `database` driver di lingkungan produksi beban tinggi.
2. **Kategorikan queue secara eksplisit** (`high`, `default`, `background`).
3. **Posisikan job sebagai lightweight unit**: jangan kirim seluruh instance model raksasa jika Anda hanya butuh ID entitasnya.
4. **Gunakan timeout dan max retry yang masuk akal** untuk mencegah antrean macet oleh dead jobs.
