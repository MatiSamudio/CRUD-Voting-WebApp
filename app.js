const express = require('express');
const path = require('path');

// Inicializa SQLite (crea DB/tablas si faltan)
require('./src/db/connection');

const topicPageRoutes = require('./src/routes/topicPageRoutes');

const voteApiRoutes = require('./src/routes/api/voteRoutes');

const topicApiRoutes = require('./src/routes/topicRoutes');

// la app se crea y se define el puerto
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS: motor + carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/health', (req, res) => res.send('OK'));

// WEB (HTML) se monta el router
app.use('/topics', topicPageRoutes);

app.use('/api', voteApiRoutes);

app.use('/api/topics', topicApiRoutes);

// entra a / y manda a /topics (asi define la 'home')
app.get('/', (req, res) => res.redirect('/topics'));

// arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
