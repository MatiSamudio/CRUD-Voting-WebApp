const express = require('express');
const path = require('path');

// Inicializa SQLite (crea DB/tablas si faltan)
require('./src/db/connection');

const topicPageRoutes = require('./src/routes/topicPageRoutes');
// Si querés mantener API, la montás aparte:
// const topicApiRoutes = require('./src/routes/topicRoutes');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS: motor + carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/health', (req, res) => res.send('OK'));

// WEB (HTML)
app.use('/topics', topicPageRoutes);

// API (JSON) opcional, en otra ruta para no chocar
// app.use('/api/topics', topicApiRoutes);

app.get('/', (req, res) => res.redirect('/topics'));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
