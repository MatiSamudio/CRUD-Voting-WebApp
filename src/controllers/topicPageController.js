const topicModel = require('../models/topicModel');

function indexPage(req, res) {
  const topics = topicModel.getAllTopics();
  res.render('topics/index', { topics });
}

function newPage(req, res) {
  res.render('topics/new');
}

function createFromForm(req, res) {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).send('Title is required');
  }

  topicModel.createTopic({
    title: title.trim(),
    description: description ? description.trim() : null,
  });

  res.redirect('/topics');
}

function showPage(req, res) {
  const id = Number(req.params.id);
  const topic = topicModel.getTopicById(id);

  if (!topic) return res.status(404).send('Topic not found');

  res.render('topics/show', { topic });
}

function editPage(req, res) {
  const id = Number(req.params.id);
  const topic = topicModel.getTopicById(id);

  if (!topic) return res.status(404).send('Topic not found');

  res.render('topics/edit', { topic });
}

function updateFromForm(req, res) {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).send('Title is required');
  }

  const updated = topicModel.updateTopic(id, {
    title: title.trim(),
    description: description ? description.trim() : null,
  });

  if (!updated) return res.status(404).send('Topic not found');

  res.redirect(`/topics/${id}`);
}

function deleteFromForm(req, res) {
  const id = Number(req.params.id);

  const ok = topicModel.deleteTopic(id);
  if (!ok) return res.status(404).send('Topic not found');

  res.redirect('/topics');
}

function voteFromForm(req, res) {
  const id = Number(req.params.id);

  const voted = topicModel.voteTopic(id);
  if (!voted) return res.status(404).send('Topic not found');

  res.redirect('/topics');
}

module.exports = {
  indexPage,
  newPage,
  createFromForm,
  showPage,
  editPage,
  updateFromForm,
  deleteFromForm,
  voteFromForm,
};
