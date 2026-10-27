---
title: "PostgreSQL JSONB & GIN Indexing di Laravel: Arsitektur Hybrid Relational & NoSQL"
description: "Memanfaatkan tipe data JSONB PostgreSQL dan GIN (Generalized Inverted Index) di Laravel untuk fleksibilitas skema dinamis dengan kecepatan query setara relasional murni."
pubDate: 2026-10-27
category: "PostgreSQL & Laravel"
tags: ["PostgreSQL","JSONB","GIN Index","Laravel 11","Database Architecture"]
author: "Risyal Febrianto"
readTime: "8 min read"
featured: false
---

Kerap kali arsitektur aplikasi membutuhkan fleksibilitas atribut produk (seperti spesifikasi gadget, metadata invoice, atau parameter audit payload) yang dinamis. Developer sering terburu-buru mengadopsi database NoSQL terpisah seperti MongoDB, yang menambah kompleksitas infrastruktur dan kehilangan jaminan integritas ACID.

Dengan **PostgreSQL JSONB** yang diintegrasikan secara native di **Laravel 11**, kita mendapatkan fleksibilitas dokumen NoSQL sekaligus kekuatan relasional dalam satu database.

---

## 1. Migrasi dan GIN Index di PostgreSQL

Untuk mengindeks atribut JSONB agar query pencarian sub-key secepat kilat:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

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
```

---

## 2. Eloquent Casts & Querying JSONB di Laravel

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class ProductVariant extends Model
{
    protected $casts = [
        'attributes' => AsArrayObject::class,
    ];
}
```

Querying atribut nested menggunakan operator arrow syntax Laravel yang diterjemahkan langsung ke operator JSONB PostgreSQL (`->>` dan `@>`):

```php
// Mencari produk dengan RAM 16GB dan Warna Hitam
$variants = ProductVariant::query()
    ->where('attributes->ram', '16GB')
    ->where('attributes->color', 'Black')
    ->get();

// Query containment menggunakan Raw JSONB containment (@>) yang sepenuhnya memanfaatkan GIN Index:
$variants = ProductVariant::query()
    ->whereRaw('attributes @> ?', [json_encode(['specs' => ['connectivity' => '5G']])])
    ->get();
```

---

## Kesimpulan

Kombinasi JSONB dan GIN Index di PostgreSQL memberikan performa pencarian dokumen JSON dengan latency sub-milidetik, tanpa harus mengorbankan transaksi ACID dan konsistensi relasi di Laravel.
