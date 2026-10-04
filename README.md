# Tugas 1 RESTful API — Stok Darah PMI

## Identitas

- Nama: Muhammad Luthfi Hilmy
- NIM: 2428240032
- Kelas: SI5B
- Nomor topik: 7
- Topik: PMI Stok Darah
- Resource: `/blood-stocks`

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Server berjalan pada `http://localhost:3000`.

## Endpoint

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| GET | `/` | Informasi API |
| GET | `/blood-stocks` | Mengambil seluruh stok darah |
| GET | `/blood-stocks/:id` | Mengambil stok berdasarkan id |
| POST | `/blood-stocks` | Menambah stok darah |
| PUT | `/blood-stocks/:id` | Mengganti seluruh data stok |
| DELETE | `/blood-stocks/:id` | Menghapus stok berdasarkan id |
| GET | `/blood-stocks?golonganDarah=O` | Filter berdasarkan golongan darah |

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
