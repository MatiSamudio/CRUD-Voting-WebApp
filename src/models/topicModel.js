// src/models/topicModel.js

const db = require('../db/connection');

// Helper opcional para timestamp actual en formato SQLite
function now() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// Obtiene todos los temas ordenados por votos (desc) y luego por fecha de creación (desc)
function getAllTopics() {
  const stmt = db.prepare(`
    SELECT id, title, description, votes, created_at, updated_at
    FROM topics
    ORDER BY votes DESC, created_at DESC
  `);

  const topics = stmt.all(); // devuelve array de filas
  return topics;
}

// Obtiene un único tema por id
function getTopicById(id) {
  const stmt = db.prepare(`
    SELECT id, title, description, votes, created_at, updated_at
    FROM topics
    WHERE id = @id
  `);

  const topic = stmt.get({ id }); // devuelve objeto o undefined
  return topic || null; // normalizamos a null si no existe
}

// Crea un nuevo tema y devuelve el objeto creado
function createTopic({ title, description }) {
  const stmt = db.prepare(`
    INSERT INTO topics (title, description, votes, created_at, updated_at)
    VALUES (@title, @description, 0, @created_at, @updated_at)
  `);

  const timestamp = now();

  const result = stmt.run({
    title,
    description: description || null,
    created_at: timestamp,
    updated_at: timestamp,
  });

  const insertedId = result.lastInsertRowid;

  // Devolvemos el tema recién creado leyendo de la DB
  return getTopicById(insertedId);
}

// Actualiza un tema existente y devuelve el tema actualizado (o null si no existe)
function updateTopic(id, { title, description }) {
  const stmt = db.prepare(`
    UPDATE topics
    SET title = @title,
        description = @description,
        updated_at = @updated_at
    WHERE id = @id
  `);

  const result = stmt.run({
    id,
    title,
    description: description || null,
    updated_at: now(),
  });

  if (result.changes === 0) {
    // No se actualizó ninguna fila -> id no existe
    return null;
  }

  return getTopicById(id);
}

// Elimina un tema. Devuelve true si se eliminó, false si no existía.
function deleteTopic(id) {
  const stmt = db.prepare(`
    DELETE FROM topics
    WHERE id = @id
  `);

  const result = stmt.run({ id });
  return result.changes > 0;
}

// Incrementa el contador de votos de un tema y devuelve el tema actualizado (o null)
function voteTopic(id) {
  const stmt = db.prepare(`
    UPDATE topics
    SET votes = votes + 1,
        updated_at = @updated_at
    WHERE id = @id
  `);

  const result = stmt.run({
    id,
    updated_at: now(),
  });

  if (result.changes === 0) {
    return null;
  }

  return getTopicById(id);
}

module.exports = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  voteTopic,
};
