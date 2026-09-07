const express = require('express');
const app = express();
const puerto = 3000;

// Definir una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola desde mi servidor con Express y Node.js!');
});

// Poner el servidor a escuchar peticiones
app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});