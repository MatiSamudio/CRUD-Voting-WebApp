const topicModel = require('../models/topicModel');
const linkModel = require('../models/linkModel')

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

  const links = linkModel.getLinksByTopicId(id);

  res.render('topics/show', { topic, links });
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


function createLinkFromForm(req, res) {
  const topicId = Number(req.params.id);
  const { title, url } = req.body;

  const topic = topicModel.getTopicById(topicId);
  if (!topic) return res.status(404).send('Topic not found');

  if (!title || title.trim() === '') {
    return res.status(400).send('Link title is required');
  }
  if (!url || url.trim() === '') {
    return res.status(400).send('Link url is required');
  }

  linkModel.addLink(topicId, {
    title: title.trim(),
    url: url.trim(),
  });

  res.redirect(`/topics/${topicId}`);
}

function voteLinkFromForm(req, res) {
  const topicId = Number(req.params.id);
  const linkId = Number(req.params.linkId);

  const link = linkModel.getLinkById(linkId);
  if (!link) return res.status(404).send('Link not found');

  // Seguridad lógica: evitar votar links que no pertenecen a ese topic
  if (link.topic_id !== topicId) {
    return res.status(400).send('Link does not belong to this topic');
  }

  linkModel.voteLink(linkId);
  res.redirect(`/topics/${topicId}`);
}

function deleteLinkFromForm(req, res) {
  const topicId = Number(req.params.id);
  const linkId = Number(req.params.linkId);

  const link = linkModel.getLinkById(linkId);
  if (!link) return res.status(404).send('Link not found');

  if (link.topic_id !== topicId) {
    return res.status(400).send('Link does not belong to this topic');
  }

  linkModel.deleteLink(linkId);
  res.redirect(`/topics/${topicId}`);
}

function editLinkPage(req, res) {
  const topicId = Number(req.params.id);
  const linkId = Number(req.params.linkId);

  const topic = topicModel.getTopicById(topicId);
  if (!topic) return res.status(404).send('Topic not found');

  const link = linkModel.getLinkById(linkId);
  if (!link) return res.status(404).send('Link not found');

  if (link.topic_id !== topicId) {
    return res.status(400).send('Link does not belong to this topic');
  }

  res.render('topics/link_edit', { topic, link });
}

function updateLinkFromForm(req, res) {
  const topicId = Number(req.params.id);
  const linkId = Number(req.params.linkId);
  const { title, url } = req.body;

  const link = linkModel.getLinkById(linkId);
  if (!link) return res.status(404).send('Link not found');

  if (link.topic_id !== topicId) {
    return res.status(400).send('Link does not belong to this topic');
  }

  if (!title || title.trim() === '') {
    return res.status(400).send('Link title is required');
  }
  if (!url || url.trim() === '') {
    return res.status(400).send('Link url is required');
  }

  linkModel.updateLink(linkId, {
    title: title.trim(),
    url: url.trim(),
  });

  res.redirect(`/topics/${topicId}`);
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
    createLinkFromForm,
    voteLinkFromForm,
    deleteLinkFromForm,
    editLinkPage,
    updateLinkFromForm,
};
