const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

// Connect Db
mongoose.connect('mongodb+srv://nuray:UYAaWLrr3%23%237$te@cluster0.mxvqu.mongodb.net/photo-catalog?retryWrites=true&w=majority')
.then(() =>{
  console.log('DB Connected!')
})
// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // urlden gelen dataları alır.
app.use(express.json()); // dataları json yapısına çevirir.
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTERING
app.get('/', photoController.getAllPhotos);
app.get('/photo/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photo/:id', photoController.updatePhoto);
app.delete('/photo/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/addPhoto', pageController.getAddPage);
app.get('/photo/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
