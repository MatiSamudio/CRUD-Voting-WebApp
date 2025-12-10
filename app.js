// app.js

const express = require('express');
const path = require('path');

// Importa la conexión para que se inicialice la DB y las tablas
const db = require('./src/db/connection');


// 2. Crear la aplicación Express
const app = express();

// 3. Definir el puerto donde va a escuchar el servidor
const PORT = 3000;

// 4. Middleware básico para parsear cuerpos de formularios y JSON (se explicará más adelante)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 5. Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// 6. Ruta de salud básica para comprobar que el servidor funciona
app.get('/health', (req, res) => {
  res.send('OK');
});

// 7. Levantar el servidor y empezar a escuchar
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
