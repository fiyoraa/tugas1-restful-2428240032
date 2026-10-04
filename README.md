# Tugas 1 paw restful api stok darah

- Nama: Muhammad Luthfi Hilmy
- NIM: 2428240032
- Kelas: SI5B
- Nomor topik: 7
- Topik: PMI Stok Darah
- Resource: `/blood-stocks`

## run local

```bash
npm install
npm run dev
```

server berjalan di  `http://localhost:3000`.

## endpoint

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| GET | `/` | Informasi API |
| GET | `/blood-stocks` | mengambil seluruh stok darah |
| GET | `/blood-stocks/:id` | mengambil stok berdasarkan id |
| POST | `/blood-stocks` | menambah stok darah |
| PUT | `/blood-stocks/:id` | mengganti seluruh data stok |
| DELETE | `/blood-stocks/:id` | menghapus stok berdasarkan id |
| GET | `/blood-stocks?golonganDarah=O` | filter berdasarkan golongan darah |

Body `POST` dan `PUT` wajib berupa JSON dengan field:

```json
{
  "golonganDarah": "O",
  "rhesus": "+",
  "jumlahKantong": 42,
  "lokasi": "UDD PMI Kota Palembang",
  "tanggalUpdate": "2026-09-28"
}
```

Data awal berjumlah 18 record dan disimpan dalam array di memori. Data akan kembali ke data awal ketika server dijalankan ulang.

## Skenario Pengujian

| No | Method | Endpoint | Status yang Diharapkan |
| --- | --- | --- | --- |
| 1 | GET | `/blood-stocks` | 200 |
| 2 | GET | `/blood-stocks/1` | 200 |
| 3 | GET | `/blood-stocks/99` | 404 |
| 4 | GET | `/blood-stocks?golonganDarah=O` | 200 |
| 5 | POST | `/blood-stocks` dengan body lengkap | 201 |
| 6 | POST | `/blood-stocks` dengan field kosong | 400 |
| 7 | PUT | `/blood-stocks/1` dengan body lengkap | 200 |
| 8 | PUT | `/blood-stocks/99` | 404 |
| 9 | DELETE | `/blood-stocks/1` | 200 |
| 10 | DELETE | `/blood-stocks/99` | 404 |
