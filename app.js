const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const photo = {
        id : 1,
        name : "Photo Name",
        description : "Photo description"
    }
  res.send(photo);
  res.end()
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu port ${port} da çalışıyor.`);
});
