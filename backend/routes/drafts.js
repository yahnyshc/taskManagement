const express = require('express');

const router = express.Router();

// GET all drafts
router.get('/', (req, res) => {
    res.json({message: 'GET drafts'})
});

// GET a single draft
router.get('/:id', (req, res) => {
    res.json({message: 'GET single drafts'})
});

// POST a new draft
router.post('/', (req, res) => {
    res.json({message: 'POST a new draft'})
});

// DELETE a draft
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a draft'})
});

// UPDATE a draft
router.patch('/:id', (req, res) => {
    res.json({message: 'UPDATE a draft'})
});


module.exports = router;