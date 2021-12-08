const express = require('express');
const ejs = require('ejs');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

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

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
