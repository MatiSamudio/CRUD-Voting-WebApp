const express = require('express');
const page = require('../controllers/topicPageController');

const router = express.Router();

router.get('/', page.indexPage);
router.get('/new', page.newPage);
router.get('/:id', page.showPage);
router.get('/:id/edit', page.editPage);

router.post('/', page.createFromForm);
router.post('/:id/edit', page.updateFromForm);
router.post('/:id/delete', page.deleteFromForm);
router.post('/:id/vote', page.voteFromForm);

module.exports = router;
