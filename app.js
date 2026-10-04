const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let bloodStocks = [
  {
    id: 1,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 42,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-28',
  },
  {
    id: 2,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 28,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-28',
  },
  {
    id: 3,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 12,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-27',
  },
  {
    id: 4,
    golonganDarah: 'AB',
    rhesus: '+',
    jumlahKantong: 16,
    lokasi: 'UDD PMI Kabupaten Banyuasin',
    tanggalUpdate: '2026-09-26',
  },
  {
    id: 5,
    golonganDarah: 'O',
    rhesus: '-',
    jumlahKantong: 9,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-25',
  },
  {
    id: 6,
    golonganDarah: 'A',
    rhesus: '-',
    jumlahKantong: 21,
    lokasi: 'UDD PMI Kabupaten Ogan Ilir',
    tanggalUpdate: '2026-09-24',
  },
  {
    id: 7,
    golonganDarah: 'B',
    rhesus: '+',
    jumlahKantong: 34,
    lokasi: 'UDD PMI Kota Prabumulih',
    tanggalUpdate: '2026-09-23',
  },
  {
    id: 8,
    golonganDarah: 'AB',
    rhesus: '-',
    jumlahKantong: 7,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-22',
  },
  {
    id: 9,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 38,
    lokasi: 'UDD PMI Kabupaten Musi Banyuasin',
    tanggalUpdate: '2026-09-21',
  },
  {
    id: 10,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 25,
    lokasi: 'UDD PMI Kota Lubuklinggau',
    tanggalUpdate: '2026-09-20',
  },
  {
    id: 11,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 14,
    lokasi: 'UDD PMI Kabupaten Muara Enim',
    tanggalUpdate: '2026-09-19',
  },
  {
    id: 12,
    golonganDarah: 'O',
    rhesus: '-',
    jumlahKantong: 19,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-18',
  },
  {
    id: 13,
    golonganDarah: 'AB',
    rhesus: '+',
    jumlahKantong: 11,
    lokasi: 'UDD PMI Kabupaten Ogan Komering Ilir',
    tanggalUpdate: '2026-09-17',
  },
  {
    id: 14,
    golonganDarah: 'A',
    rhesus: '-',
    jumlahKantong: 18,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-16',
  },
  {
    id: 15,
    golonganDarah: 'B',
    rhesus: '+',
    jumlahKantong: 30,
    lokasi: 'UDD PMI Kabupaten Banyuasin',
    tanggalUpdate: '2026-09-15',
  },
  {
    id: 16,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 47,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-14',
  },
  {
    id: 17,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 23,
    lokasi: 'UDD PMI Kabupaten Lahat',
    tanggalUpdate: '2026-09-13',
  },
  {
    id: 18,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 10,
    lokasi: 'UDD PMI Kota Pagar Alam',
    tanggalUpdate: '2026-09-12',
  },
];
let nextId = 19;

const requiredFields = [
  'golonganDarah',
  'rhesus',
  'jumlahKantong',
  'lokasi',
  'tanggalUpdate',
];

function responseError(res, message, statusCode) {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data: null,
  });
}

function responseSuccess(res, message, data, statusCode = 200) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

function validateBloodStock(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Body request harus berupa object JSON';
  }

  for (const field of requiredFields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      (typeof body[field] === 'string' && body[field].trim() === '')
    ) {
      return `Field ${field} wajib diisi`;
    }
  }

  if (!['A', 'B', 'AB', 'O'].includes(body.golonganDarah)) {
    return 'golonganDarah harus A, B, AB, atau O';
  }

  if (!['+', '-'].includes(body.rhesus)) {
    return 'rhesus harus + atau -';
  }

  if (
    typeof body.jumlahKantong !== 'number' ||
    !Number.isFinite(body.jumlahKantong)
  ) {
    return 'jumlahKantong harus berupa number';
  }

  if (typeof body.lokasi !== 'string') {
    return 'lokasi harus berupa string';
  }

  if (
    typeof body.tanggalUpdate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.tanggalUpdate)
  ) {
    return 'tanggalUpdate harus berformat YYYY-MM-DD';
  }

  return null;
}

function getId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

app.get('/', (req, res) => {
  res.json({
    nama: 'Muhammad Luthfi Hilmy',
    nim: '2428240032',
    topik: 7,
    resource: 'Stok Darah PMI',
    endpoints: [
      'GET /blood-stocks',
      'GET /blood-stocks/:id',
      'POST /blood-stocks',
      'PUT /blood-stocks/:id',
      'DELETE /blood-stocks/:id',
      'GET /blood-stocks?golonganDarah=O',
    ],
  });
});


app.get('/blood-stocks', (req, res) => {
  const { golonganDarah } = req.query;
  const result = golonganDarah
    ? bloodStocks.filter((stock) => stock.golonganDarah === golonganDarah)
    : bloodStocks;

  res.json(result);
});


app.get('/blood-stocks/:id', (req, res) => {
  const id = getId(req);
  const stock = id === null ? null : bloodStocks.find((item) => item.id === id);

  if (!stock) {
    return responseError(res, `Data dengan id ${req.params.id} tidak ditemukan`, 404);
  }

  res.json(stock);
});

app.post('/blood-stocks', (req, res) => {
  const validationMessage = validateBloodStock(req.body);
  if (validationMessage) {
    return responseError(res, validationMessage, 400);
  }

  const newStock = {
    id: nextId++,
    golonganDarah: req.body.golonganDarah,
    rhesus: req.body.rhesus,
    jumlahKantong: req.body.jumlahKantong,
    lokasi: req.body.lokasi,
    tanggalUpdate: req.body.tanggalUpdate,
  };
  bloodStocks.push(newStock);

  responseSuccess(res, 'Data stok darah berhasil ditambahkan', newStock, 201);
});

app.put('/blood-stocks/:id', (req, res) => {
  const id = getId(req);
  const index = id === null
    ? -1
    : bloodStocks.findIndex((item) => item.id === id);

  if (index === -1) {
    return responseError(res, `Data dengan id ${req.params.id} tidak ditemukan`, 404);
  }

  const validationMessage = validateBloodStock(req.body);
  if (validationMessage) {
    return responseError(res, validationMessage, 400);
  }

  const updatedStock = {
    id,
    golonganDarah: req.body.golonganDarah,
    rhesus: req.body.rhesus,
    jumlahKantong: req.body.jumlahKantong,
    lokasi: req.body.lokasi,
    tanggalUpdate: req.body.tanggalUpdate,
  };
  bloodStocks[index] = updatedStock;

  responseSuccess(res, 'Data stok darah berhasil diubah', updatedStock);
});

app.delete('/blood-stocks/:id', (req, res) => {
  const id = getId(req);
  const index = id === null
    ? -1
    : bloodStocks.findIndex((item) => item.id === id);

  if (index === -1) {
    return responseError(res, `Data dengan id ${req.params.id} tidak ditemukan`, 404);
  }

  bloodStocks.splice(index, 1);
  responseSuccess(res, `Data stok darah dengan id ${id} berhasil dihapus`, null);
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return responseError(res, 'Format JSON tidak valid', 400);
  }

  next(err);
});

app.use((req, res) => {
  responseError(res, 'Endpoint tidak ditemukan', 404);
});

app.use((err, req, res, next) => {
  console.error(err);
  responseError(res, 'Terjadi kesalahan pada server', 500);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
