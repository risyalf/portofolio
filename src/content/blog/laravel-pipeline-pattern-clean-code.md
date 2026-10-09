---
title: "Laravel Pipeline Pattern: Menyusun Alur Bisnis Kompleks dengan Clean Architecture"
description: "Gunakan Illuminate Pipeline untuk mengisolasi tahapan filter, validasi transaksi e-commerce, dan proses multistep menjadi class-class kecil yang mudah diuji."
pubDate: 2026-10-09
category: "Laravel"
tags: ["Laravel","Design Patterns","Pipeline","Refactoring","Clean Code"]
author: "Risyal Febrianto"
readTime: "8 min read"
featured: false
---

Pernahkah Anda menemukan Controller atau Action class yang memiliki panjang lebih dari 400 baris, penuh dengan `if-else` bertingkat untuk menghitung diskon pesanan, ongkos kirim, pajak, dan voucher?

**Laravel Pipeline Pattern** (komponen internal yang sama yang mendasari Middleware Laravel) adalah solusi arsitektural terbaik untuk memecah proses tersebut.

---

## 1. Konsep Pipeline

Sebuah input data (disebut *passable*) dilewatkan secara berurutan melalui serangkaian pipa (*pipes*). Setiap pipa melakukan satu tugas spesifik dan meneruskannya ke pipa berikutnya:

```
Order Data -> [Cek Stok] -> [Hitung Diskon] -> [Terapkan Pajak] -> [Validasi Ongkir] -> Hasil Akhir
```

---

## 2. Membuat Pipe Classes

Setiap pipe class hanya butuh mengimplementasikan satu method `handle($order, Closure $next)`:

```php
namespace App\Pipelines\Order;

use Closure;
use App\DTOs\OrderCalculation;

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
```

```php
namespace App\Pipelines\Order;

use Closure;
use App\DTOs\OrderCalculation;

class CalculateTax
{
    public function handle(OrderCalculation $order, Closure $next)
    {
        $taxableAmount = max(0, $order->subtotal - $order->discountAmount);
        $order->taxAmount = $taxableAmount * 0.11; // PPN 11%

        return $next($order);
    }
}
```

---

## 3. Menjalankan Pipeline

```php
namespace App\Services;

use Illuminate\Support\Facades\Pipeline;
use App\DTOs\OrderCalculation;
use App\Pipelines\Order\ApplyCouponDiscount;
use App\Pipelines\Order\CalculateTax;
use App\Pipelines\Order\ApplyShippingFee;

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
```

---

## Kesimpulan

Dengan Pipeline Pattern, kode Anda sepenuhnya mematuhi prinsip **Single Responsibility Principle (SRP)** dan **Open/Closed Principle (OCP)**: menambahkan aturan perhitungan baru tidak akan merusak aturan sebelumnya!
