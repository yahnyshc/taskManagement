const express = require('express');

const  { getDrafts, getDraft, createDraft, deleteDraft, updateDraft } = require('../controllers/draftController');
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

// GET all drafts
router.get('/', getDrafts);

// GET a single draft
router.get('/:id', getDraft);

// POST a new draft
router.post('/', createDraft);

// DELETE a draft
router.delete('/:id', deleteDraft);

// UPDATE a draft
router.patch('/:id', updateDraft);

module.exports = router;