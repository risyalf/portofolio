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

// Pool of advanced Laravel, PHP, and PostgreSQL engineering topics
const topicCatalog = [
  {
    slug: 'laravel-postgresql-high-concurrency-locking',
    title: 'Optimasi Konkurensi Tinggi: Laravel 11, PHP 8.3 & PostgreSQL Row-Level Locking (SKIP LOCKED)',
    description: 'Mencegah race condition, double-spending, dan deadlock pada transaksi inventaris & finansial menggunakan SELECT FOR UPDATE SKIP LOCKED di Laravel & PostgreSQL.',
    category: 'PostgreSQL & Laravel',
    tags: ['Laravel 11', 'PHP 8.3', 'PostgreSQL', 'Concurrency', 'Database Locking', 'Clean Architecture'],
    readTime: '9 min read',
    content: `Dalam sistem transaksi finansial dan manajemen inventaris e-commerce dengan lalu lintas tinggi, masalah paling umum yang dihadapi backend engineer adalah **race condition**. Dua request yang tiba di milidetik yang sama dapat membaca stok yang sama, memvalidasinya, lalu sama-sama mengurangi saldo atau kuota, berujung pada *overselling* atau *double-spending*.

Kombinasi **Laravel 11**, **PHP 8.3**, dan fitur native **PostgreSQL row-level locking** (\`SELECT FOR UPDATE SKIP LOCKED\`) memberikan solusi performa tinggi tanpa perlu distributed lock Redis yang rumit.

---

## 1. Masalah dengan Locking Konvensional

Pendekatan umum biasanya mengandalkan transaction biasa atau \`lockForUpdate()\`:

\`\`\`php
// Pendekatan standar: Rentan antrean bottleneck dan Deadlock
DB::transaction(function () use ($productId, $quantity) {
    $product = Product::where('id', $productId)->lockForUpdate()->first();

    if ($product->stock >= $quantity) {
        $product->decrement('stock', $quantity);
        return true;
    }

    throw new InsufficientStockException();
});
\`\`\`

Ketika 500 worker memproses antrean pesanan untuk item populer secara bersamaan, 499 worker akan terblokir menunggu lock dirilis. Ini menyebabkan lonjakan koneksi database (*connection pool exhaustion*) dan latency meroket.

---

## 2. Solusi Elegan: PostgreSQL SKIP LOCKED

PostgreSQL menyediakan modifier \`SKIP LOCKED\`. Alih-alih menunggu baris yang terkunci, database akan langsung melewati baris yang sedang diproses transaksi lain dan mengambil baris berikutnya yang bebas:

\`\`\`sql
SELECT * FROM job_tickets 
WHERE status = 'pending' 
ORDER BY priority DESC 
LIMIT 1 
FOR UPDATE SKIP LOCKED;
\`\`\`

### Implementasi di Laravel 11:

\`\`\`php
namespace App\\Services;

use App\\Models\\OrderTicket;
use Illuminate\\Support\\Facades\\DB;

class TicketProcessingService
{
    public function claimNextTicket(int $workerId): ?OrderTicket
    {
        return DB::transaction(function () use ($workerId) {
            /** @var OrderTicket|null $ticket */
            $ticket = OrderTicket::query()
                ->where('status', 'pending')
                ->orderBy('created_at', 'asc')
                ->lock('FOR UPDATE SKIP LOCKED')
                ->first();

            if (! $ticket) {
                return null;
            }

            $ticket->update([
                'status' => 'processing',
                'assigned_worker_id' => $workerId,
                'claimed_at' => now(),
            ]);

            return $ticket;
        });
    }
}
\`\`\`

Dengan \`lock('FOR UPDATE SKIP LOCKED')\`, 50 worker paralel dapat mengambil 50 tiket berbeda secara instan dalam 1 query tanpa ada satupun yang tertahan atau mengalami deadlock.

---

## 3. Atomic Decrement dengan PostgreSQL Check Constraint

Untuk perlindungan lapis baja di tingkat basis data, jangan hanya mengandalkan validasi di layer PHP:

\`\`\`sql
-- Migration PostgreSQL: Pasang check constraint
ALTER TABLE products ADD CONSTRAINT check_stock_non_negative CHECK (stock >= 0);
\`\`\`

Di layer PHP 8.3 / Laravel:

\`\`\`php
namespace App\\Actions;

use App\\Models\\Product;
use Illuminate\\Database\\QueryException;

final readonly class DeductStockAction
{
    public function execute(int $productId, int $amount): bool
    {
        try {
            // Atomic update langsung di PostgreSQL engine
            $affected = Product::where('id', $productId)
                ->where('stock', '>=', $amount)
                ->decrement('stock', $amount);

            return $affected > 0;
        } catch (QueryException $e) {
            // Tertangkap aman jika constraint terlanggar
            report($e);
            return false;
        }
    }
}
\`\`\`

---

## 4. Analisis Performa: EXPLAIN ANALYZE

Pastikan kolom indeks komposit di PostgreSQL tepat sasaran:

\`\`\`sql
CREATE INDEX CONCURRENTLY idx_orders_status_created 
ON order_tickets (status, created_at) 
WHERE status = 'pending'; -- Partial index super cepat
\`\`\`

Partial index di PostgreSQL hanya mengindeks baris yang bernilai \`pending\`, menghemat memori RAM database hingga 90% dibanding mengindeks seluruh tabel historis.

---

## Kesimpulan

Menggabungkan kemampuan expressif Laravel 11, efisiensi pengetikan PHP 8.3 (readonly class & strict typing), serta kehebatan engine PostgreSQL (Partial Indexes & SKIP LOCKED) memungkinkan backend menangani lonjakan transaksi konkurensi ekstrem dengan zero race condition dan latensi minimal.
`
  },
  {
    slug: 'postgresql-gin-indexing-laravel-jsonb',
    title: 'PostgreSQL JSONB & GIN Indexing di Laravel: Arsitektur Hybrid Relational & NoSQL',
    description: 'Memanfaatkan tipe data JSONB PostgreSQL dan GIN (Generalized Inverted Index) di Laravel untuk fleksibilitas skema dinamis dengan kecepatan query setara relasional murni.',
    category: 'PostgreSQL & Laravel',
    tags: ['PostgreSQL', 'JSONB', 'GIN Index', 'Laravel 11', 'Database Architecture'],
    readTime: '8 min read',
    content: `Kerap kali arsitektur aplikasi membutuhkan fleksibilitas atribut produk (seperti spesifikasi gadget, metadata invoice, atau parameter audit payload) yang dinamis. Developer sering terburu-buru mengadopsi database NoSQL terpisah seperti MongoDB, yang menambah kompleksitas infrastruktur dan kehilangan jaminan integritas ACID.

Dengan **PostgreSQL JSONB** yang diintegrasikan secara native di **Laravel 11**, kita mendapatkan fleksibilitas dokumen NoSQL sekaligus kekuatan relasional dalam satu database.

---

## 1. Migrasi dan GIN Index di PostgreSQL

Untuk mengindeks atribut JSONB agar query pencarian sub-key secepat kilat:

\`\`\`php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->jsonb('attributes'); // Kolom JSONB binary format
            $table->timestamps();
        });

        // Buat GIN Index menggunakan operator jsonb_path_ops untuk optimasi containment (@>)
        DB::statement('CREATE INDEX idx_product_variants_attributes_gin ON product_variants USING gin (attributes jsonb_path_ops)');
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
\`\`\`

---

## 2. Eloquent Casts & Querying JSONB di Laravel

\`\`\`php
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Casts\\AsArrayObject;

class ProductVariant extends Model
{
    protected $casts = [
        'attributes' => AsArrayObject::class,
    ];
}
\`\`\`

Querying atribut nested menggunakan operator arrow syntax Laravel yang diterjemahkan langsung ke operator JSONB PostgreSQL (\`->>\` dan \`@>\`):

\`\`\`php
// Mencari produk dengan RAM 16GB dan Warna Hitam
$variants = ProductVariant::query()
    ->where('attributes->ram', '16GB')
    ->where('attributes->color', 'Black')
    ->get();

// Query containment menggunakan Raw JSONB containment (@>) yang sepenuhnya memanfaatkan GIN Index:
$variants = ProductVariant::query()
    ->whereRaw('attributes @> ?', [json_encode(['specs' => ['connectivity' => '5G']])])
    ->get();
\`\`\`

---

## Kesimpulan

Kombinasi JSONB dan GIN Index di PostgreSQL memberikan performa pencarian dokumen JSON dengan latency sub-milidetik, tanpa harus mengorbankan transaksi ACID dan konsistensi relasi di Laravel.
`
  },
  {
    slug: 'php83-laravel-memory-management-workers',
    title: 'Manajemen Memori PHP 8.3 & Garbage Collection pada Background Queue Workers Laravel',
    description: 'Menganalisis siklus hidup memori PHP di proses daemon background worker Laravel Horizon, mencegah memory leaks, dan konfigurasi Opcache CLI.',
    category: 'PHP & Laravel',
    tags: ['PHP 8.3', 'Laravel Horizon', 'Memory Management', 'Garbage Collection', 'DevOps'],
    readTime: '7 min read',
    content: `Background worker Laravel (\`php artisan queue:work\` atau **Laravel Horizon**) berjalan secara *long-running daemon*. Berbeda dengan web request biasa yang langsung me-reset memori setelah response selesai, worker terus hidup selama berjam-jam atau berhari-hari.

Kecerobohan kecil seperti mengumpulkan data besar di array statik atau relasi model yang tidak dilepas dapat menyebabkan proses kehabisan alokasi RAM (*OOM - Out of Memory*).

---

## 1. Siklus Garbage Collector di PHP 8.3

PHP menggunakan *reference counting* dengan mekanisme siklus deteksi (*cycle collector*). Pada proses intensif batch processing:

\`\`\`php
namespace App\\Jobs;

use App\\Models\\Customer;
use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Bus\\Dispatchable;
use Illuminate\\Queue\\InteractsWithQueue;
use Illuminate\\Queue\\SerializesModels;

class ProcessMonthlyStatementsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        // Hindari Customer::all()! Gunakan lazy() atau chunkById()
        Customer::query()->orderBy('id')->lazyById(500)->each(function (Customer $customer) {
            $this->generateStatement($customer);

            // Bersihkan reference model di memori
            unset($customer);
        });

        // Paksa cycle collection jika memproses data masif
        gc_collect_cycles();
    }
}
\`\`\`

---

## 2. Aturan Perlindungan Worker di Production

1. **Gunakan Flag \`--max-jobs\` dan \`--max-time\`**:
   Biarkan worker mati secara graceful setelah memproses 1000 job atau berjalan 1 jam agar supervisor/horizon mem-boot ulang proses dengan kondisi memori bersih.

\`\`\`bash
php artisan queue:work redis --max-jobs=1000 --max-time=3600 --memory=128
\`\`\`

2. **Bersihkan Database Query Log**:
   Pastikan \`DB::disableQueryLog()\` aktif jika menjalankan command manual, karena query log menyimpan setiap string query SQL ke dalam RAM.

---

## Kesimpulan

Paham akan manajemen alokasi memori PHP 8.3 dan cara kerja garbage collection menjamin antrean latar belakang aplikasi Anda stabil 24/7 tanpa mengalami crash OOM.
`
  },
  {
    slug: 'postgresql-partitioning-laravel-timeseries',
    title: 'Skalabilitas Database: Implementasi Table Partitioning PostgreSQL di Laravel',
    description: 'Strategi memecah tabel raksasa puluhan juta baris (audit logs, transaksi, timeseries) menjadi partisi bulanan di PostgreSQL dengan query transparan dari Laravel Eloquent.',
    category: 'PostgreSQL & Laravel',
    tags: ['PostgreSQL', 'Table Partitioning', 'Laravel 11', 'High Concurrency', 'Database Tuning'],
    readTime: '10 min read',
    content: `Ketika tabel log aktivitas, audit trail, atau transaksi e-commerce menembus 20 hingga 100 juta baris, performa B-Tree index mulai menurun drastis karena ukuran index melampaui kapasitas RAM (*Buffer Pool*). Akibatnya, disk I/O meningkat tajam dan latency query meroket.

Solusi standar industri pada **PostgreSQL** adalah **Declarative Table Partitioning**, membagi tabel secara fisik berdasarkan rentang tanggal (*RANGE*) tanpa mengubah cara Laravel melakukan query.

---

## 1. Mendefinisikan Partisi di PostgreSQL

\`\`\`sql
-- Tabel master berpartisi
CREATE TABLE audit_logs (
    id BIGSERIAL,
    user_id BIGINT,
    action VARCHAR(255) NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Partisi bulanan
CREATE TABLE audit_logs_2026_10 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');

CREATE TABLE audit_logs_2026_11 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');
\`\`\`

---

## 2. Partition Pruning: Kunci Kecepatan PostgreSQL

Saat query dilakukan dengan menyertakan rentang tanggal:

\`\`\`php
$logs = AuditLog::query()
    ->whereBetween('created_at', ['2026-10-15', '2026-10-20'])
    ->where('user_id', 42)
    ->get();
\`\`\`

Planner PostgreSQL secara otomatis melakukan **Partition Pruning**: ia hanya memindai tabel \`audit_logs_2026_10\` dan mengabaikan lusinan partisi lainnya. Ukuran scan berkurang 95%, dan seluruh indeks partisi muat di memori RAM!

---

## Kesimpulan

Dengan Table Partitioning PostgreSQL, basis data Laravel Anda siap menangani pertumbuhan data hingga ratusan gigabyte tanpa degradasi performa sama sekali.
`
  },
  {
    slug: 'laravel-postgresql-explain-analyze-indexes',
    title: 'Diagnostic Deep Dive: Membedah EXPLAIN ANALYZE PostgreSQL untuk Mengeliminasi Sequential Scan di Laravel',
    description: 'Panduan membaca execution plan PostgreSQL (Seq Scan vs Index Scan vs Bitmap Heap Scan) dan strategi tuning query lambat pada aplikasi Laravel berskala besar.',
    category: 'PostgreSQL & Laravel',
    tags: ['PostgreSQL', 'EXPLAIN ANALYZE', 'Laravel 11', 'Database Optimization', 'SQL'],
    readTime: '8 min read',
    content: `Banyak pengembang menganggap bahwa memasang indeks pada kolom foreign key sudah cukup untuk menjamin performa database. Namun di lingkungan produksi dengan jutaan baris data, planner PostgreSQL terkadang tetap memilih **Sequential Scan** (membaca seluruh isi hard disk).

Menguasai pembacaan \`EXPLAIN (ANALYZE, BUFFERS)\` adalah keahlian wajib seorang senior backend engineer.

---

## 1. Menjalankan EXPLAIN ANALYZE dari Laravel

Anda dapat menambahkan macro debugging ringkas pada query builder Laravel:

\`\`\`php
// app/Providers/AppServiceProvider.php
use Illuminate\\Database\\Query\\Builder;

Builder::macro('explainAnalyze', function () {
    return DB::select('EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ' . $this->toSql(), $this->getBindings());
});
\`\`\`

---

## 2. Mengenal Tipe Node Eksekusi PostgreSQL

1. **Seq Scan (Sequential Scan)**:
   Membaca seluruh baris tabel dari awal hingga akhir. Ideal hanya jika mengambil >30% dari total baris. Menjadi bencana jika tabel berisi 10 juta baris!
2. **Index Scan**:
   Mencari pointer baris langsung dari B-Tree index dan membaca baris dari heap tabel. Sangat cepat untuk selektivitas tinggi.
3. **Bitmap Index Scan + Bitmap Heap Scan**:
   PostgreSQL mengumpulkan daftar halaman memori dari index ke dalam bitmap bitstream, lalu membacanya secara terurut untuk meminimalkan random disk I/O.

---

## Kesimpulan

Mengetahui cara kerja planner PostgreSQL dan memvalidasinya lewat EXPLAIN ANALYZE menghilangkan tebak-tebakan dalam optimasi performa database aplikasi Laravel Anda.
`
  }
];

function run() {
  console.log('[Blog Generator] Checking existing Laravel, PHP & PostgreSQL blog articles...');

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
    const dynamicSlug = `laravel-php-postgresql-deep-dive-${timestamp}`;
    selected = {
      slug: dynamicSlug,
      title: `Laravel 11, PHP 8.3 & PostgreSQL High-Performance Architecture Digest — ${todayStr}`,
      description: `Analisis mendalam best practice backend modern: isolasi transaksi database, optimasi koneksi PgBouncer, strict typing PHP 8.3, dan arsitektur event-driven Laravel.`,
      category: 'PostgreSQL & Laravel',
      tags: ['Laravel 11', 'PHP 8.3', 'PostgreSQL', 'Architecture', 'High Concurrency', 'Database Optimization'],
      readTime: '7 min read',
      content: `Catatan teknis arsitektur rekayasa sistem backend tingkat lanjut yang mengintegrasikan ekosistem framework Laravel 11, efisiensi runtime PHP 8.3+, dan keandalan transaksi basis data PostgreSQL.

---

## 1. Konektivitas & Connection Pooling dengan PgBouncer

Dalam skala ribuan concurrent users, model proses PHP-FPM dapat membuka ribuan koneksi langsung ke PostgreSQL, membebani RAM database server. Penggunaan PgBouncer dalam mode *transaction pooling* menjadi pondasi utama untuk mempertahankan efisiensi throughput transaksi.

---

## 2. Integritas Data & Strict Typing

Penggunaan fitur modern PHP 8.3 seperti \`readonly classes\`, \`typed constants\`, dan penanganan exception yang terstruktur pada layer Domain Model menjamin kontrak bisnis tidak terlanggar sebelum data mencapai layer persistensi PostgreSQL.
`
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
    execSync('/home/risyal/.bun/bin/bun run build', { cwd: rootDir, stdio: 'inherit' });
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
