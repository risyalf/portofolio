---
title: "Advanced Eloquent: Subquery Selects, Window Functions, dan Virtual Columns"
description: "Optimasi query database Laravel dari 50 query menjadi 1 query tunggal berkecepatan tinggi menggunakan addSelect subqueries dan raw expressions."
pubDate: 2026-10-10
category: "Laravel"
tags: ["Laravel","Eloquent","Database","MySQL","PostgreSQL","Performance"]
author: "Risyal Febrianto"
readTime: "9 min read"
featured: false
---

N+1 query problem adalah penyakit paling jamak di aplikasi Laravel. Seringkali developer tergoda melakukan iterasi koleksi di PHP untuk mengambil data relasi terakhir, yang berujung pada konsumsi memori tinggi dan response time yang lambat.

Mari kita pelajari cara menggunakan **Subquery Selects** di Eloquent untuk menyelesaikan masalah ini langsung di level database engine.

---

## 1. Mengambil Nilai Terakhir Tanpa N+1

Bayangkan kita ingin menampilkan daftar postingan blog beserta komentar terakhir yang masuk dan nama penulis komentar tersebut:

### Pendekatan Lambat (N+1 Query):
```php
// Membaca ribuan komentar ke memory hanya untuk ambil satu per post
$posts = Post::with('comments')->get();
```

### Pendekatan Cepat (Subquery Select):
```php
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
```

Database akan mengeksekusinya dalam **1 query tunggal**, dan nilai `$post->latest_comment_body` langsung tersedia di model tanpa overhead relasi berat!

---

## 2. Dynamic Order by Subquery

Anda juga bisa melakukan sorting berdasarkan nilai agregat relasi:

```php
$destinations = Destination::orderByDesc(
    Flight::select('arrived_at')
        ->whereColumn('destination_id', 'destinations.id')
        ->latest()
        ->take(1)
)->get();
```

---

## Kesimpulan

Memahami kekuatan subquery di Eloquent mengubah Anda dari sekadar pengguna ORM dasar menjadi engineer yang mampu mengoptimasi performa backend pada skala database jutaan baris.
