const Drafts = require('../models/draftModel'); 
const mongoose = require('mongoose');

const addHeadersToRes = async (res) => {

    return res
}

// get all drafts
const getDrafts = async (req, res) => {
    const user_id = req.user._id
    
    const drafts = await Drafts.find( { user_id } ).sort({ updatedAt: -1 });
    
    // send drafts
    addHeadersToRes(res).status(200).json(drafts);
}

// get a single draft
const getDraft = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return addHeadersToRes(res).status(404).json({error: "No such draft"});
    }
     
    const draft = await Drafts.findById(id);

    if ( ! draft ){
        return addHeadersToRes(res).status(400).json({error: 'No such draft'});
    }
 
    addHeadersToRes(res).status(200).json(draft);
}

// create a new draft
const createDraft = async (req, res) => {
    const { title, issue, content } = req.body;

    // add draft to db
    try{
        const user_id = req.user._id
        const draft = await Drafts.create({title, issue, content, user_id});
        addHeadersToRes(res).status(200).json(draft);
    } catch(error) {
        addHeadersToRes(res).status(400).json({error: error.message})
    }
}

// delete a draft
const deleteDraft = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return addHeadersToRes(res).status(404).json({error: "No such draft"});
    }

    const draft = await Drafts.findOneAndDelete({_id: id});

    if ( ! draft ){
        return addHeadersToRes(res).status(400).json({error: 'No such draft'});
    }

    addHeadersToRes(res).status(200).json(draft);
}

// update a draft
const updateDraft = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return addHeadersToRes(res).status(404).json({error: "No such draft"});
    }

    const draft = await Drafts.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if ( ! draft ){
        return addHeadersToRes(res).status(400).json({error: 'No such draft'});
    }

    addHeadersToRes(res).status(200).json(draft);
}

module.exports = { getDrafts, getDraft, createDraft, deleteDraft, updateDraft };

