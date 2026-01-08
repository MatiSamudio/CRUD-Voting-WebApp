const express = require('express');
const topicModel = require('../../models/topicModel');
const linkModel = require('../../models/linkModel');

const router = express.Router();

/*
  Endpoint para votar tema 
  POST /api/topics/:id/vote
*/
router.post('/topics/:id/vote', (req, res) => {
  const id = Number(req.params.id);

  const topic = topicModel.voteTopic(id);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json({
    id: topic.id,
    votes: topic.votes,
  });
});

/*
  Endpoint para votar link dentro de un tema
  POST /api/topics/:topicId/links/:linkId/vote
*/
router.post('/topics/:topicId/links/:linkId/vote', (req, res) => {
  const topicId = Number(req.params.topicId);
  const linkId = Number(req.params.linkId);

  const link = linkModel.getLinkById(linkId);
  if (!link) {
    return res.status(404).json({ error: 'Link not found' });
  }

  if (link.topic_id !== topicId) {
    return res.status(400).json({ error: 'Invalid link/topic relation' });
  }

  const updated = linkModel.voteLink(linkId);

  res.json({
    linkId: updated.id,
    votes: updated.votes,
  });
});

module.exports = router;
