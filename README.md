# RESTful API Mahasiswa - Tugas 3

Project ini menghubungkan API Tugas 1/Kuis 1 dengan MongoDB menggunakan
Express.js dan Mongoose.

## Fitur Tugas 3

- Schema `Mahasiswa` dengan embedded document `alamat`.
- Reference `Mahasiswa.prodiId` ke schema `Prodi`.
- Filtering: `kota` dan `prodi`.
- Pagination: `page` dan `limit`.
- Sorting: `sort=nama`, `sort=-nama`, atau `sort=-createdAt`.
- Projection: `fields=nama,nim,alamat,prodiId`.
- `populate()` pada detail mahasiswa dan daftar saat `prodiId` dipilih.

## Menjalankan

1. Pastikan MongoDB lokal aktif atau gunakan MongoDB Atlas.
2. Salin `.env.example` menjadi `.env`.
3. Isi `API_KEY` dan `DB_URI`.
4. Instal dependensi:

   ```bash
   npm install
   ```

5. Isi data contoh:

   ```bash
   npm run seed
   ```

6. Jalankan server:

   ```bash
   npm run dev
   ```

## Contoh endpoint query

```text
GET /mahasiswa?kota=Palembang&prodi=SI&page=1&limit=5&sort=-nama&fields=nama,nim,alamat,prodiId
```

Collection dan environment Postman untuk bukti pengujian tersedia pada:

- `PAWII_RESTful_API.postman_collection.json`
- `PAWII_Development.postman_environment.json`
- `PAWII_Production.postman_environment.json`
