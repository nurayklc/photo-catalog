const express = require('express');
const mongoose = require('mongoose')
const ejs = require('ejs');
const Photo = require('./models/Photo')

const app = express();

// Connect Db
mongoose.connect('mongodb://localhost/photo-catalog')

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})) // urlden gelen dataları alır.
app.use(express.json()) // dataları json yapısına çevirir.

// ROUTERING
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/addPhoto', (req, res) => {
  res.render('addPhoto');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
