const express = require('express');
const path = require('path');
require('./src/db/connection');

const topicRoutes = require('./src/routes/topicRoutes');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.send('OK'));

app.use('/topics', topicRoutes);

app.get('/', (req, res) => {
  res.redirect('/topics');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
