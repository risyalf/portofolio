---
title: "Laravel Reverb: First-Party WebSockets Berkecepatan Tinggi untuk Aplikasi Real-Time"
description: "Membangun sistem interaktif real-time seperti chat, live notifications, dan data streams menggunakan Laravel Reverb tanpa ketergantungan Pusher berbayar."
pubDate: 2026-03-28
category: "Laravel"
tags: ["Laravel", "WebSockets", "Reverb", "Realtime", "Vue", "React"]
author: "Risyal Febrianto"
readTime: "6 min read"
featured: false
---

Selama bertahun-tahun, developer Laravel yang ingin membangun fitur real-time dihadapkan pada dua pilihan: menggunakan layanan hosted berbayar seperti **Pusher** (yang biayanya melonjak seiring kenaikan traffic), atau memelihara Node.js socket server terpisah via **Laravel Echo Server** / **Soketi**.

**Laravel Reverb** hadir sebagai game changer: server WebSocket native berbasis PHP asynchronous (didukung oleh Swoole / ReactPHP / workerman engine) yang terintegrasi 100% dengan ekosistem Laravel.

---

## 1. Mengapa Laravel Reverb Begitu Cepat?

Reverb dibangun di atas event loop asynchronous non-blocking. Dalam satu proses server sederhana, Reverb mampu menangani puluhan ribu koneksi WebSocket bersamaan (*concurrent connections*) dengan penggunaan memori yang sangat rendah.

Instalasinya sangat ringkas:

```bash
composer require laravel/reverb
php artisan reverb:install
```

Perintah di atas secara otomatis menyiapkan konfigurasi di `config/reverb.php`, memperbarui file environment `.env`, dan mengonfigurasi broadcast driver.

---

## 2. Mengirim Event Real-Time dari Backend

Membuat event yang otomatis disiarkan ke client sangat sederhana berkat interface `ShouldBroadcast`:

```php
namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Order $order) {}

    /**
     * Tentukan channel siaran.
     */
    public function broadcastOn(): array
    {
        return [
            new Channel("orders.{$this->order->id}"),
        ];
    }

    /**
     * Data yang dikirim ke front-end payload.
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->order->id,
            'status' => $this->order->status,
            'updated_at' => $this->order->updated_at->toIso8601String(),
        ];
    }
}
```

Ketika status pesanan berubah, kita hanya perlu memanggil:

```php
broadcast(new OrderStatusUpdated($order));
```

---

## 3. Mendengarkan Event di Sisi Frontend (React / Vue)

Di sisi client, kita menghubungkan Laravel Echo dengan Reverb WebSocket credentials:

```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
});

// Subscribe ke channel
window.Echo.channel(`orders.${orderId}`)
  .listen('OrderStatusUpdated', (event: { status: string; updated_at: string }) => {
    console.log('Update status pesanan:', event.status);
    updateOrderBadge(event.status);
  });
```

---

## 4. Scaling di Server Produksi

Untuk menjalankan Reverb di server produksi Linux (Ubuntu/Debian), gunakan **Supervisor** agar daemon tetap hidup jika terjadi restart:

```ini
[program:laravel-reverb]
process_name=%(program_name)s
command=php /var/www/my-app/artisan reverb:start --port=8080 --hostname=0.0.0.0
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/www/my-app/storage/logs/reverb.log
```

Kemudian arahkan reverse proxy Nginx untuk meng-upgrade koneksi HTTP ke WebSocket (`Upgrade: websocket`).

---

## Kesimpulan

Dengan hadirnya Laravel Reverb, hambatan biaya dan kompleksitas arsitektur real-time di PHP telah runtuh. Anda tidak lagi memerlukan layanan pihak ketiga untuk membangun fitur kolaboratif modern!
