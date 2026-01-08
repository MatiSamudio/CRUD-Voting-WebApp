const express = require('express');
const topicController = require('../controllers/topicController');

const router = express.Router();

// Listar temas
router.get('/', topicController.listTopics);

// Ver un tema
router.get('/:id', topicController.showTopic);

// Crear tema
router.post('/', topicController.createTopic);

// Actualizar tema
router.put('/:id', topicController.updateTopic);

// Eliminar tema
router.delete('/:id', topicController.deleteTopic);

// Votar tema
// router.post('/:id/vote', topicController.voteTopic);

module.exports = router;
