// src/models/linkModel.js

const db = require('../db/connection');

function now() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// Devuelve todos los links de un tema, ordenados por votos desc y fecha desc
function getLinksByTopicId(topicId) {
  const stmt = db.prepare(`
    SELECT id, topic_id, title, url, votes, created_at, updated_at
    FROM links
    WHERE topic_id = @topicId
    ORDER BY votes DESC, created_at DESC
  `);

  const links = stmt.all({ topicId });
  return links;
}

// Crea un link dentro de un tema y devuelve el link creado
function addLink(topicId, { title, url }) {
  const stmt = db.prepare(`
    INSERT INTO links (topic_id, title, url, votes, created_at, updated_at)
    VALUES (@topicId, @title, @url, 0, @created_at, @updated_at)
  `);

  const timestamp = now();

  const result = stmt.run({
    topicId,
    title,
    url,
    created_at: timestamp,
    updated_at: timestamp,
  });

  const insertedId = result.lastInsertRowid;

  return getLinkById(insertedId);
}

// Obtiene un link por id
function getLinkById(id) {
  const stmt = db.prepare(`
    SELECT id, topic_id, title, url, votes, created_at, updated_at
    FROM links
    WHERE id = @id
  `);

  const link = stmt.get({ id });
  return link || null;
}

// Actualiza un link y devuelve el link actualizado o null
function updateLink(id, { title, url }) {
  const stmt = db.prepare(`
    UPDATE links
    SET title = @title,
        url = @url,
        updated_at = @updated_at
    WHERE id = @id
  `);

  const result = stmt.run({
    id,
    title,
    url,
    updated_at: now(),
  });

  if (result.changes === 0) {
    return null;
  }

  return getLinkById(id);
}

// Elimina un link. Devuelve true si se eliminó, false si no.
function deleteLink(id) {
  const stmt = db.prepare(`
    DELETE FROM links
    WHERE id = @id
  `);

  const result = stmt.run({ id });
  return result.changes > 0;
}

// Incrementa votos de un link y devuelve el link actualizado o null
function voteLink(id) {
  const stmt = db.prepare(`
    UPDATE links
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

  return getLinkById(id);
}

module.exports = {
  getLinksByTopicId,
  addLink,
  getLinkById,
  updateLink,
  deleteLink,
  voteLink,
};
