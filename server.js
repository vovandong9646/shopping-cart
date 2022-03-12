const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://vandong:vandong@cluster0.faejl.mongodb.net/react-shopping-cart-db?retryWrites=true&w=majority',
  )
  .then((res) => console.log('connect mongoose successfully'))
  .catch((error) => console.log(error));

const Product = mongoose.model(
  'Products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  }),
);

app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const savedProduct = await new Product(req.body).save();
  res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`serve at port ${port}`));
