---
title: "Laravel Pennant: Manajemen Feature Flags & Trunk-Based Development"
description: "Implementasikan continuous deployment dengan aman menggunakan feature flags di Laravel. Rilis fitur secara inkremental ke sebagian pengguna terpilih."
pubDate: 2026-10-08
category: "Laravel"
tags: ["Laravel Pennant","Feature Flags","CI/CD","Architecture","Clean Code"]
author: "Risyal Febrianto"
readTime: "6 min read"
featured: false
---

Dalam tim engineering modern, melakukan merge ke branch main tanpa merilis fitur ke publik adalah kunci dari **Trunk-Based Development**. **Laravel Pennant** menyediakan solusi first-party yang elegan untuk mengelola feature flags dan A/B testing.

---

## 1. Setup Laravel Pennant

```bash
composer require laravel/pennant
php artisan vendor:publish --provider="Laravel\Pennant\PennantServiceProvider"
php artisan migrate
```

---

## 2. Mendefinisikan Feature Flag

Anda dapat mendefinisikan flag di `AppServiceProvider` atau dedicated `FeatureServiceProvider`:

```php
namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;

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
```

---

## 3. Mengecek Feature di Controller & Blade

### Di Controller:
```php
use Laravel\Pennant\Feature;

public function checkout(Request $request)
{
    if (Feature::active('new-checkout-v2')) {
        return view('checkout.v2');
    }

    return view('checkout.legacy');
}
```

### Di Blade View:
```blade
@feature('ai-assistant')
    <button class="btn-ai-assist">Tanya AI Assistant</button>
@else
    <button class="btn-standard">Bantuan Standar</button>
@endfeature
```

---

## Kesimpulan

Feature flags memisahkan antara proses deployment kode dan aktivasi fitur bisnis. Ini meminimalkan risiko bug kritis dan mempercepat siklus delivery software Anda.
