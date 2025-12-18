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

// Links dentro de un topic
router.post('/:id/links', page.createLinkFromForm);
router.post('/:id/links/:linkId/vote', page.voteLinkFromForm);
router.post('/:id/links/:linkId/delete', page.deleteLinkFromForm);

router.get('/:id/links/:linkId/edit', page.editLinkPage);
router.post('/:id/links/:linkId/edit', page.updateLinkFromForm);


module.exports = router;
