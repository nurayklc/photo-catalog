const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const fs = require('fs');
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
app.use(methodOverride('_method',{
  methods:['POST', 'GET']
}));

// ROUTERING
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
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
app.get('/photo/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
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

app.put('/photo/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photo/${req.params.id}`);
});

app.delete('/photo/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname +'/public'+photo.image
  fs.unlinkSync(deletedImage)
  await Photo.findByIdAndDelete(req.params.id)
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
