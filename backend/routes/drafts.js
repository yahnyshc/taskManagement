const express = require('express');
const Drafts = require('../models/draftModel'); 

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
router.post('/', async (req, res) => {
    const {title, issue, content } = req.body;

    try{
        const draft = await Drafts.create({title, issue, content});
        res.status(200).json(draft);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
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