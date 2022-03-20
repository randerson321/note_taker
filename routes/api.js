const api = require("express").Router();
const {v4: uuidv4} = require('uuid');
const { readFromFile, readAndAppend, readAndDelete } = require("../helpers/fsUtils");

api.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
});

api.post('/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

api.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);

    if (noteId){
        readAndDelete(noteId, './db/db.json');

        const response = {
            status: 'note deleted',
            body: noteId,
        };

        res.json(response)
    } else {
        res.json('Error deleting note');
    }
});

module.exports = api;