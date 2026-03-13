# Limitasi Backend API

Dokumen ini merangkum keterbatasan dan kendala yang ditemukan pada Backend API beserta solusi sementara (workaround) yang diterapkan di sisi frontend.

---

## 1. Fitur Banner
- Hanya endpoint **Create** yang berfungsi dengan baik.
- Endpoint **Read** tidak berfungsi.
- Endpoint **Edit** dan **Delete** tidak dapat diuji.
- **Workaround:** Fallback ke mock data lokal.

---

## 2. Fitur Variant Produk
- Fitur variant tersedia, namun **tidak memiliki manajemen stok per variant**.
- Saat produk dengan variant ditambahkan ke keranjang, **data variant tidak ikut tersimpan**.

---

## 3. Fitur Stok
- Implementasi fitur stok **tidak sesuai dengan spesifikasi Figma**.
- **Workaround:** Frontend mengubah pendekatan menjadi fitur **stock log** sebagai pengganti.

---

## 4. Fitur Diskon Langsung pada Produk
- **Tidak tersedia** fitur direct discount pada produk.
- Akibatnya, tampilan harga sebelum dan sesudah diskon tidak dapat ditampilkan.

---

## 5. Fitur Review & Jumlah Sales
- Fitur review **tidak berfungsi** karena order yang sudah berstatus *delivered* tidak dapat disubmit ulasan.
- Berdampak pada **jumlah sales yang selalu bernilai 0**.

---

## 6. Fitur Best Selling
- Endpoint best selling **mengalami error**.
- **Workaround:** Fallback ke endpoint **get all product** sebagai pengganti.

---

## 7. Fitur Rekomendasi & Category Banner
- Fitur Rekomendasi dan Category Banner **belum terimplementasi** di sisi backend.
- **Workaround:**
  - Tampilan mengikuti desain Figma secara statis.
  - Category banner mengambil **produk pertama** sebagai gambar.
  - Tagline bersifat **hardcoded**.

---

## 8. CORS (Cross-Origin Resource Sharing)
- Terjadi error CORS meskipun konfigurasi environment variable sudah diatur.
- **Workaround:** Menggunakan fitur **Vercel Rewrites** sebagai proxy untuk mengatasi masalah CORS.

---

## 9. Mixed Content (HTTP vs HTTPS)
- API menggunakan protokol **HTTP**, sehingga seluruh URL gambar mengalami error *Mixed Content* saat diakses dari halaman HTTPS.
- **Workaround:** Menggunakan fitur **Vercel Rewrites** sebagai proxy untuk meneruskan request gambar.

---

## 10. Fitur Auto Refresh Token
- Fitur auto refresh token **belum terimplementasi**.
- Masa berlaku (expiry) auth token menggunakan hitungan jam yang di-*hardcode*, sehingga sesi berakhir sebelum proses logout otomatis sempat terjadi.

---

## 11. Keamanan Penyimpanan Token
- Token autentikasi masih **dikirim sebagai bagian dari response body**, bukan melalui `Set-Cookie` header.
- Akibatnya, token disimpan di **localStorage** yang rentan terhadap serangan XSS dan tidak memenuhi standar keamanan yang direkomendasikan.

---

> **Catatan:** Seluruh workaround di atas bersifat sementara dan sebaiknya ditangani dari sisi backend untuk memastikan keamanan, konsistensi data, dan pengalaman pengguna yang optimal.
