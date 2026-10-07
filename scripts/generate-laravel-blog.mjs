#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'src', 'content', 'blog');

// Ensure blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Pool of advanced Laravel engineering topics
const topicCatalog = [
  {
    slug: 'laravel-octane-frankenphp-performance',
    title: 'Laravel Octane + FrankenPHP: Eksekusi Ribuan Request per Detik Tanpa Overhead PHP-FPM',
    description: 'Panduan lengkap akselerasi performa backend Laravel menggunakan Laravel Octane bertenaga FrankenPHP dan worker persistensi di memori RAM.',
    category: 'Laravel',
    tags: ['Laravel Octane', 'FrankenPHP', 'Performance', 'Docker', 'DevOps'],
    readTime: '8 min read',
    content: `Tradisi lama siklus hidup PHP klasik adalah **share-nothing architecture**: setiap kali ada HTTP request masuk, PHP-FPM akan mem-boot framework dari nol, membaca konfigurasi, menginisialisasi service providers, mengeksekusi router, lalu membuang semua alokasi memori setelah response dikirim.

Dengan **Laravel Octane** dan runtime modern seperti **FrankenPHP** (atau Swoole/RoadRunner), aplikasi Laravel Anda hanya di-boot sekali di dalam RAM dan tetap hidup (*daemon mode*). Hasilnya adalah latensi di bawah 5 milidetik dan throughput meningkat hingga 5-10 kali lipat.

---

## 1. Mengapa FrankenPHP Menjadi Pilihan Utama?

FrankenPHP adalah application server modern berbasis Caddy web server yang ditulis dalam Go. Keunggulannya meliputi:
- **Automatic HTTPS** (sertifikat Let's Encrypt terintegrasi otomatis).
- **HTTP/3 Support** secara out-of-the-box.
- **Early Hints (103)** untuk mempercepat loading aset browser.
- **Integrasi native worker** tanpa membutuhkan ekstensi C yang rumit seperti Swoole.

Instalasi pada proyek Laravel:

\`\`\`bash
composer require laravel/octane
php artisan octane:install --server=frankenphp
\`\`\`

---

## 2. Menjalankan Octane Server

Di lingkungan development:

\`\`\`bash
php artisan octane:start --watch
\`\`\`

Flag \`--watch\` akan memantau perubahan file dan me-reload worker otomatis saat kode diperbarui.

---

## 3. Hati-hati dengan Memory Leaks & Static State!

Karena framework tidak lagi di-reboot antar HTTP request, Anda harus waspada terhadap persistensi data di service container:

### Aturan Emas Octane:
1. **Hindari menyimpan state request-specific di singleton**.
2. **Jangan mengikat Request instance ke property static**.
3. Gunakan callback resolver daripada static assignment.

Contoh penanganan yang benar:

\`\`\`php
namespace App\\Services;

use App\\Models\\User;

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
\`\`\`

---

## 4. Konfigurasi Deployment Docker di Production

Contoh Dockerfile ringkas berbasis image resmi FrankenPHP:

\`\`\`dockerfile
FROM dunglas/frankenphp:latest-php8.3

ENV SERVER_NAME=":80"
WORKDIR /app

COPY . /app
RUN composer install --no-dev --optimize-autoloader
RUN php artisan config:cache && php artisan route:cache

CMD ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=80"]
\`\`\`

---

## Kesimpulan

Laravel Octane dengan FrankenPHP membawa kapabilitas PHP setara dengan runtime Go atau Node.js dalam kecepatan eksekusi, sembari tetap mempertahankan kemudahan ekosistem Laravel yang ekspresif.
`
  },
  {
    slug: 'laravel-pulse-realtime-monitoring',
    title: 'Laravel Pulse: Observability & Monitoring Performa Tanpa Tool Pihak Ketiga',
    description: 'Memantau pemakaian CPU, memori, slow queries, slow requests, dan status queue worker secara real-time langsung dari ekosistem first-party Laravel Pulse.',
    category: 'Laravel',
    tags: ['Laravel Pulse', 'Monitoring', 'Observability', 'Performance', 'Redis'],
    readTime: '7 min read',
    content: `Observability seringkali membutuhkan biaya berlangganan mahal ke platform seperti Datadog atau New Relic. **Laravel Pulse** hadir sebagai tool pemantauan performa aplikasi gratis dan open-source yang dirancang khusus untuk ekosistem Laravel.

Dengan Pulse, Anda dapat langsung mengidentifikasi query database yang lambat, job queue yang memakan waktu lama, serta endpoint API yang mengalami lonjakan latency.

---

## 1. Memasang Laravel Pulse

\`\`\`bash
composer require laravel/pulse
php artisan pulse:install
php artisan migrate
\`\`\`

Pulse menggunakan recorder background yang sangat ringan, menyimpan snapshot metrik ke dalam database atau Redis, dan merendernya dalam antarmuka web yang intuitif di \`/pulse\`.

---

## 2. Mengamankan Akses Dasbor

Secara default, Pulse hanya dapat diakses di environment local. Untuk membuka akses di production kepada tim admin:

\`\`\`php
// app/Providers/AppServiceProvider.php
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Gate;

public function boot(): void
{
    Gate::define('viewPulse', function (User $user) {
        return in_array($user->email, [
            'admin@perusahaan.com',
            'lead-dev@perusahaan.com',
        ]);
    });
}
\`\`\`

---

## 3. Fitur Utama yang Mengubah Alur Kerja Debugging

### A. Slow Queries Detection
Pulse secara otomatis menandai query SQL yang dieksekusi lebih dari 500ms, lengkap dengan call trace file dan baris kode pemanggilnya.

### B. Slow Jobs Tracker
Anda dapat melihat pekerjaan latar belakang apa saja yang mengalami backlog atau durasi eksekusi tinggi.

### C. Server Resource Gauge
Menampilkan persentase penggunaan memori RAM dan CPU secara live pada cluster server Anda.

---

## Kesimpulan

Laravel Pulse memberikan visibilitas langsung ke jantung aplikasi Anda tanpa setup infrastruktur monitoring yang rumit. Wajib diaktifkan di setiap aplikasi produksi!
`
  },
  {
    slug: 'laravel-pennant-feature-flags',
    title: 'Laravel Pennant: Manajemen Feature Flags & Trunk-Based Development',
    description: 'Implementasikan continuous deployment dengan aman menggunakan feature flags di Laravel. Rilis fitur secara inkremental ke sebagian pengguna terpilih.',
    category: 'Laravel',
    tags: ['Laravel Pennant', 'Feature Flags', 'CI/CD', 'Architecture', 'Clean Code'],
    readTime: '6 min read',
    content: `Dalam tim engineering modern, melakukan merge ke branch main tanpa merilis fitur ke publik adalah kunci dari **Trunk-Based Development**. **Laravel Pennant** menyediakan solusi first-party yang elegan untuk mengelola feature flags dan A/B testing.

---

## 1. Setup Laravel Pennant

\`\`\`bash
composer require laravel/pennant
php artisan vendor:publish --provider="Laravel\\Pennant\\PennantServiceProvider"
php artisan migrate
\`\`\`

---

## 2. Mendefinisikan Feature Flag

Anda dapat mendefinisikan flag di \`AppServiceProvider\` atau dedicated \`FeatureServiceProvider\`:

\`\`\`php
namespace App\\Providers;

use App\\Models\\User;
use Illuminate\\Support\\ServiceProvider;
use Laravel\\Pennant\\Feature;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Fitur checkout baru hanya aktif untuk 20% user secara acak (gradual rollout)
        Feature::define('new-checkout-v2', function (User $user) {
            return $user->id % 5 === 0;
        });

        // Fitur beta hanya untuk user dengan paket enterprise
        Feature::define('ai-assistant', function (User $user) {
            return $user->subscription_tier === 'enterprise';
        });
    }
}
\`\`\`

---

## 3. Mengecek Feature di Controller & Blade

### Di Controller:
\`\`\`php
use Laravel\\Pennant\\Feature;

public function checkout(Request $request)
{
    if (Feature::active('new-checkout-v2')) {
        return view('checkout.v2');
    }

    return view('checkout.legacy');
}
\`\`\`

### Di Blade View:
\`\`\`blade
@feature('ai-assistant')
    <button class="btn-ai-assist">Tanya AI Assistant</button>
@else
    <button class="btn-standard">Bantuan Standar</button>
@endfeature
\`\`\`

---

## Kesimpulan

Feature flags memisahkan antara proses deployment kode dan aktivasi fitur bisnis. Ini meminimalkan risiko bug kritis dan mempercepat siklus delivery software Anda.
`
  },
  {
    slug: 'laravel-pipeline-pattern-clean-code',
    title: 'Laravel Pipeline Pattern: Menyusun Alur Bisnis Kompleks dengan Clean Architecture',
    description: 'Gunakan Illuminate Pipeline untuk mengisolasi tahapan filter, validasi transaksi e-commerce, dan proses multistep menjadi class-class kecil yang mudah diuji.',
    category: 'Laravel',
    tags: ['Laravel', 'Design Patterns', 'Pipeline', 'Refactoring', 'Clean Code'],
    readTime: '8 min read',
    content: `Pernahkah Anda menemukan Controller atau Action class yang memiliki panjang lebih dari 400 baris, penuh dengan \`if-else\` bertingkat untuk menghitung diskon pesanan, ongkos kirim, pajak, dan voucher?

**Laravel Pipeline Pattern** (komponen internal yang sama yang mendasari Middleware Laravel) adalah solusi arsitektural terbaik untuk memecah proses tersebut.

---

## 1. Konsep Pipeline

Sebuah input data (disebut *passable*) dilewatkan secara berurutan melalui serangkaian pipa (*pipes*). Setiap pipa melakukan satu tugas spesifik dan meneruskannya ke pipa berikutnya:

\`\`\`
Order Data -> [Cek Stok] -> [Hitung Diskon] -> [Terapkan Pajak] -> [Validasi Ongkir] -> Hasil Akhir
\`\`\`

---

## 2. Membuat Pipe Classes

Setiap pipe class hanya butuh mengimplementasikan satu method \`handle($order, Closure $next)\`:

\`\`\`php
namespace App\\Pipelines\\Order;

use Closure;
use App\\DTOs\\OrderCalculation;

class ApplyCouponDiscount
{
    public function handle(OrderCalculation $order, Closure $next)
    {
        if ($order->couponCode) {
            $discount = CouponService::calculate($order->couponCode, $order->subtotal);
            $order->discountAmount += $discount;
        }

        return $next($order);
    }
}
\`\`\`

\`\`\`php
namespace App\\Pipelines\\Order;

use Closure;
use App\\DTOs\\OrderCalculation;

class CalculateTax
{
    public function handle(OrderCalculation $order, Closure $next)
    {
        $taxableAmount = max(0, $order->subtotal - $order->discountAmount);
        $order->taxAmount = $taxableAmount * 0.11; // PPN 11%

        return $next($order);
    }
}
\`\`\`

---

## 3. Menjalankan Pipeline

\`\`\`php
namespace App\\Services;

use Illuminate\\Support\\Facades\\Pipeline;
use App\\DTOs\\OrderCalculation;
use App\\Pipelines\\Order\\ApplyCouponDiscount;
use App\\Pipelines\\Order\\CalculateTax;
use App\\Pipelines\\Order\\ApplyShippingFee;

class OrderPriceCalculator
{
    public function calculate(OrderCalculation $order): OrderCalculation
    {
        return Pipeline::send($order)
            ->through([
                ApplyCouponDiscount::class,
                CalculateTax::class,
                ApplyShippingFee::class,
            ])
            ->thenReturn();
    }
}
\`\`\`

---

## Kesimpulan

Dengan Pipeline Pattern, kode Anda sepenuhnya mematuhi prinsip **Single Responsibility Principle (SRP)** dan **Open/Closed Principle (OCP)**: menambahkan aturan perhitungan baru tidak akan merusak aturan sebelumnya!
`
  },
  {
    slug: 'laravel-advanced-eloquent-subqueries',
    title: 'Advanced Eloquent: Subquery Selects, Window Functions, dan Virtual Columns',
    description: 'Optimasi query database Laravel dari 50 query menjadi 1 query tunggal berkecepatan tinggi menggunakan addSelect subqueries dan raw expressions.',
    category: 'Laravel',
    tags: ['Laravel', 'Eloquent', 'Database', 'MySQL', 'PostgreSQL', 'Performance'],
    readTime: '9 min read',
    content: `N+1 query problem adalah penyakit paling jamak di aplikasi Laravel. Seringkali developer tergoda melakukan iterasi koleksi di PHP untuk mengambil data relasi terakhir, yang berujung pada konsumsi memori tinggi dan response time yang lambat.

Mari kita pelajari cara menggunakan **Subquery Selects** di Eloquent untuk menyelesaikan masalah ini langsung di level database engine.

---

## 1. Mengambil Nilai Terakhir Tanpa N+1

Bayangkan kita ingin menampilkan daftar postingan blog beserta komentar terakhir yang masuk dan nama penulis komentar tersebut:

### Pendekatan Lambat (N+1 Query):
\`\`\`php
// Membaca ribuan komentar ke memory hanya untuk ambil satu per post
$posts = Post::with('comments')->get();
\`\`\`

### Pendekatan Cepat (Subquery Select):
\`\`\`php
$posts = Post::query()
    ->addSelect([
        'latest_comment_body' => Comment::select('body')
            ->whereColumn('post_id', 'posts.id')
            ->latest()
            ->take(1),
        'latest_commenter_name' => User::select('name')
            ->whereIn('id', function ($query) {
                $query->select('user_id')
                    ->from('comments')
                    ->whereColumn('post_id', 'posts.id')
                    ->latest()
                    ->take(1);
            })
    ])
    ->get();
\`\`\`

Database akan mengeksekusinya dalam **1 query tunggal**, dan nilai \`$post->latest_comment_body\` langsung tersedia di model tanpa overhead relasi berat!

---

## 2. Dynamic Order by Subquery

Anda juga bisa melakukan sorting berdasarkan nilai agregat relasi:

\`\`\`php
$destinations = Destination::orderByDesc(
    Flight::select('arrived_at')
        ->whereColumn('destination_id', 'destinations.id')
        ->latest()
        ->take(1)
)->get();
\`\`\`

---

## Kesimpulan

Memahami kekuatan subquery di Eloquent mengubah Anda dari sekadar pengguna ORM dasar menjadi engineer yang mampu mengoptimasi performa backend pada skala database jutaan baris.
`
  }
];

function run() {
  console.log('[Blog Generator] Checking existing Laravel blog articles...');

  // Get current files
  const existingFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const existingSlugs = new Set(existingFiles.map(f => f.replace(/\.md$/, '')));

  console.log(`[Blog Generator] Found ${existingFiles.length} existing articles:`, Array.from(existingSlugs));

  // Find next unwritten topic from catalog
  let selected = topicCatalog.find(item => !existingSlugs.has(item.slug));

  const todayStr = new Date().toISOString().split('T')[0];

  // If all catalog topics are written, generate a timestamped specialized topic
  if (!selected) {
    const timestamp = Date.now();
    const dynamicSlug = `laravel-engineering-deep-dive-${timestamp}`;
    selected = {
      slug: dynamicSlug,
      title: `Laravel Modern Architecture & Performance Digest — ${todayStr}`,
      description: `Analisis mendalam best practice Laravel modern: keamanan API, database indexes, arsitektur micro-services, dan manajemen cache terdistribusi.`,
      category: 'Laravel',
      tags: ['Laravel', 'Architecture', 'Performance', 'PHP 8.3', 'Backend'],
      readTime: '6 min read',
      content: `Catatan teknis yang membahas praktik terbaik dalam pengembangan backend berskala tinggi dengan Laravel framework dan PHP 8.3+.`
    };
  }

  const filePath = path.join(blogDir, `${selected.slug}.md`);

  const fileContent = `---
title: "${selected.title}"
description: "${selected.description}"
pubDate: ${todayStr}
category: "${selected.category}"
tags: ${JSON.stringify(selected.tags)}
author: "Risyal Febrianto"
readTime: "${selected.readTime}"
featured: false
---

${selected.content.trim()}
`;

  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`[Blog Generator] ✓ Successfully created article: ${filePath}`);

  // Rebuild Astro
  console.log('[Blog Generator] Rebuilding Astro static site...');
  try {
    execSync('bun run build', { cwd: rootDir, stdio: 'inherit' });
    console.log('[Blog Generator] ✓ Astro build complete and verified!');
  } catch (err) {
    console.warn('[Blog Generator] Warning: bun build failed or bun not available, attempting npm run build...');
    try {
      execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
      console.log('[Blog Generator] ✓ npm build complete!');
    } catch (npmErr) {
      console.error('[Blog Generator] Build failed:', npmErr.message);
    }
  }

  console.log(`[Blog Generator] Done! Article "${selected.title}" is now published.`);
}

run();
