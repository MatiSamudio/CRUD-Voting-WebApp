// src/controllers/topicController.js

const topicModel = require('../models/topicModel');

// GET /topics
function listTopics(req, res) {
  const topics = topicModel.getAllTopics();
  res.json({ topics });
}

// GET /topics/:id
function showTopic(req, res) {
  const id = Number(req.params.id);

  const topic = topicModel.getTopicById(id);

  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json({ topic });
}

// POST /topics
function createTopic(req, res) {
  const { title, description } = req.body;

  // Validación mínima
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const topic = topicModel.createTopic({
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : null,
  });

  res.status(201).json({ topic });
}

// PUT /topics/:id
function updateTopic(req, res) {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updated = topicModel.updateTopic(id, {
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : null,
  });

  if (!updated) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json({ topic: updated });
}

// DELETE /topics/:id
function deleteTopic(req, res) {
  const id = Number(req.params.id);

  const ok = topicModel.deleteTopic(id);

  if (!ok) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  // 204 = No Content: éxito, pero no devolvemos body
  res.status(204).send();
}

// POST /topics/:id/vote
function voteTopic(req, res) {
  const id = Number(req.params.id);

  const voted = topicModel.voteTopic(id);

  if (!voted) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json({ topic: voted });
}

module.exports = {
  listTopics,
  showTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  voteTopic,
};
