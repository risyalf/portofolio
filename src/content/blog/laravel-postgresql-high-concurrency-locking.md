---
title: "Optimasi Konkurensi Tinggi: Laravel 11, PHP 8.3 & PostgreSQL Row-Level Locking (SKIP LOCKED)"
description: "Mencegah race condition, double-spending, dan deadlock pada transaksi inventaris & finansial menggunakan SELECT FOR UPDATE SKIP LOCKED di Laravel & PostgreSQL."
pubDate: 2026-10-27
category: "PostgreSQL & Laravel"
tags: ["Laravel 11","PHP 8.3","PostgreSQL","Concurrency","Database Locking","Clean Architecture"]
author: "Risyal Febrianto"
readTime: "9 min read"
featured: false
---

Dalam sistem transaksi finansial dan manajemen inventaris e-commerce dengan lalu lintas tinggi, masalah paling umum yang dihadapi backend engineer adalah **race condition**. Dua request yang tiba di milidetik yang sama dapat membaca stok yang sama, memvalidasinya, lalu sama-sama mengurangi saldo atau kuota, berujung pada *overselling* atau *double-spending*.

Kombinasi **Laravel 11**, **PHP 8.3**, dan fitur native **PostgreSQL row-level locking** (`SELECT FOR UPDATE SKIP LOCKED`) memberikan solusi performa tinggi tanpa perlu distributed lock Redis yang rumit.

---

## 1. Masalah dengan Locking Konvensional

Pendekatan umum biasanya mengandalkan transaction biasa atau `lockForUpdate()`:

```php
// Pendekatan standar: Rentan antrean bottleneck dan Deadlock
DB::transaction(function () use ($productId, $quantity) {
    $product = Product::where('id', $productId)->lockForUpdate()->first();

    if ($product->stock >= $quantity) {
        $product->decrement('stock', $quantity);
        return true;
    }

    throw new InsufficientStockException();
});
```

Ketika 500 worker memproses antrean pesanan untuk item populer secara bersamaan, 499 worker akan terblokir menunggu lock dirilis. Ini menyebabkan lonjakan koneksi database (*connection pool exhaustion*) dan latency meroket.

---

## 2. Solusi Elegan: PostgreSQL SKIP LOCKED

PostgreSQL menyediakan modifier `SKIP LOCKED`. Alih-alih menunggu baris yang terkunci, database akan langsung melewati baris yang sedang diproses transaksi lain dan mengambil baris berikutnya yang bebas:

```sql
SELECT * FROM job_tickets 
WHERE status = 'pending' 
ORDER BY priority DESC 
LIMIT 1 
FOR UPDATE SKIP LOCKED;
```

### Implementasi di Laravel 11:

```php
namespace App\Services;

use App\Models\OrderTicket;
use Illuminate\Support\Facades\DB;

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
```

Dengan `lock('FOR UPDATE SKIP LOCKED')`, 50 worker paralel dapat mengambil 50 tiket berbeda secara instan dalam 1 query tanpa ada satupun yang tertahan atau mengalami deadlock.

---

## 3. Atomic Decrement dengan PostgreSQL Check Constraint

Untuk perlindungan lapis baja di tingkat basis data, jangan hanya mengandalkan validasi di layer PHP:

```sql
-- Migration PostgreSQL: Pasang check constraint
ALTER TABLE products ADD CONSTRAINT check_stock_non_negative CHECK (stock >= 0);
```

Di layer PHP 8.3 / Laravel:

```php
namespace App\Actions;

use App\Models\Product;
use Illuminate\Database\QueryException;

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
```

---

## 4. Analisis Performa: EXPLAIN ANALYZE

Pastikan kolom indeks komposit di PostgreSQL tepat sasaran:

```sql
CREATE INDEX CONCURRENTLY idx_orders_status_created 
ON order_tickets (status, created_at) 
WHERE status = 'pending'; -- Partial index super cepat
```

Partial index di PostgreSQL hanya mengindeks baris yang bernilai `pending`, menghemat memori RAM database hingga 90% dibanding mengindeks seluruh tabel historis.

---

## Kesimpulan

Menggabungkan kemampuan expressif Laravel 11, efisiensi pengetikan PHP 8.3 (readonly class & strict typing), serta kehebatan engine PostgreSQL (Partial Indexes & SKIP LOCKED) memungkinkan backend menangani lonjakan transaksi konkurensi ekstrem dengan zero race condition dan latensi minimal.
