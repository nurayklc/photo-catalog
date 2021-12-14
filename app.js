const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

// Connect Db
mongoose.connect('mongodb://localhost/photo-catalog');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // urlden gelen dataları alır.
app.use(express.json()); // dataları json yapısına çevirir.
app.use(fileUpload());

// ROUTERING
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/photo/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/addPhoto', (req, res) => {
  res.render('addPhoto');
});

app.post('/photos', async (req, res) => {
  //await Photo.create(req.body)
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
  });
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
