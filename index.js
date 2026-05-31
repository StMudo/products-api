const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Nasi Goreng', price: 15000, stock: 50, category: 'Makanan' },
  { id: 2, name: 'Es Teh Manis', price: 5000, stock: 100, category: 'Minuman' },
  { id: 3, name: 'Pulpen', price: 3000, stock: 200, category: 'Alat Tulis' },
];
let nextId = 4;

app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, stock, category } = req.body;

  if (!name || price === undefined || stock === undefined || !category) {
    return res.status(400).json({
      success: false,
      message: 'Field name, price, stock, dan category wajib diisi.',
    });
  }

  const newProduct = { id: nextId++, name, price, stock, category };
  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: 'Produk berhasil ditambahkan.',
    data: newProduct,
  });
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { price, stock } = req.body;

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Produk dengan ID ${id} tidak ditemukan.`,
    });
  }

  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json({
    success: true,
    message: 'Produk berhasil diupdate.',
    data: product,
  });
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Produk dengan ID ${id} tidak ditemukan.`,
    });
  }

  const deleted = products.splice(index, 1)[0];
  res.json({
    success: true,
    message: 'Produk berhasil dihapus.',
    data: deleted,
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
