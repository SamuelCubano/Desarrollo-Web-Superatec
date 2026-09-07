const express = require('express');
const app = express();
const puerto = 3000;

// Esta línea es la magia que busca automáticamente el index.html dentro de la carpeta "public"
app.use(express.static('public'));

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});