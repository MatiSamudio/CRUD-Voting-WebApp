const path = require('path');
const Database = require('better-sqlite3');

// Construimos la ruta al archivo de base de datos
const dbPath = path.join(__dirname, '..', '..', 'db', 'database.sqlite');

//  Abrimos / creamos la base de datos
//  Si el archivo no existe, better-sqlite3 crea.
const db = new Database(dbPath);

//  Aseguramos que las claves foráneas están activadas
db.pragma('foreign_keys = ON');

//  Creamos las tablas si no existen (misma estructura que schema.sql)
db.exec(`
  CREATE TABLE IF NOT EXISTS topics (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT,
    votes       INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS links (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id    INTEGER NOT NULL,
    title       TEXT    NOT NULL,
    url         TEXT    NOT NULL,
    votes       INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
  );
`);

//  Exportamos la instancia de base de datos para usar en los modelos
module.exports = db;
