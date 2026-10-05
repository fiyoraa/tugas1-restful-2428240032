# tugas 1 restful api paw stok darah pmi

- nama: muhammad luthfi hilmy
- nim: 2428240032
- kelas: si5b
- nomor topik: 7
- topik: pmi stok darah
- resource: `/blood-stocks`
- repository: https://github.com/fiyoraa/tugas1-restful-2428240032
- deployment vercel: https://tugas1-restful-2428240032.vercel.app/

## run local

```bash
npm install
npm run dev
```

server berjalan (local) di `http://localhost:3000`.

akses api online di (vercel):

`https://tugas1-restful-2428240032.vercel.app/`

## endpoint

| method | endpoint | keterangan |
| --- | --- | --- |
| get | `/` | informasi api |
| get | `/blood-stocks` | mengambil seluruh stok darah |
| get | `/blood-stocks/:id` | mengambil stok berdasarkan id |
| post | `/blood-stocks` | menambah stok darah |
| put | `/blood-stocks/:id` | mengganti seluruh data stok |
| delete | `/blood-stocks/:id` | menghapus stok berdasarkan id |
| get | `/blood-stocks?golonganDarah=O` | filter berdasarkan golongan darah |

body `post` dan `put` wajib berupa json dengan field:

```json
{
  "golonganDarah": "O",
  "rhesus": "+",
  "jumlahKantong": 42,
  "lokasi": "udd pmi kota palembang",
  "tanggalUpdate": "2026-09-28"
}
```

respon `post`, `put`, dan `delete` menggunakan format:

```json
{
  "status": "success",
  "message": "pesan hasil operasi",
  "data": {}
}
```

respon error menggunakan format:

```json
{
  "status": "error",
  "message": "pesan kesalahan",
  "data": null
}
```

data awal berjumlah 18 record dan disimpan dalam array. data akan kembali ke data awal ketika server dijalankan ulang

## pengujian api

pengujian dapat dilakukan menggunakan browser untuk endpoint `get`, atau menggunakan postman dan thunder client untuk seluruh method

| no. | method | endpoint atau skenario | status |
| --- | --- | --- | --- |
| 1 | get | `/blood-stocks` | 200 |
| 2 | get | `/blood-stocks/1` | 200 |
| 3 | get | `/blood-stocks/99` | 404 |
| 4 | get | `/blood-stocks?golonganDarah=O` | 200 |
| 5 | post | `/blood-stocks` dengan body lengkap | 201 |
| 6 | post | `/blood-stocks` dengan field wajib kosong | 400 |
| 7 | put | `/blood-stocks/1` dengan body lengkap | 200 |
| 8 | put | `/blood-stocks/99` | 404 |
| 9 | delete | `/blood-stocks/1` | 200 |
| 10 | delete | `/blood-stocks/99` | 404 |

file pengujian postman tersedia pada file `2428240032_Postman.json`
file postman tersebut menggunakan url vercel sebagai `baseurl` dan berisi 10 skenario pengujian pada tabel di atas


