const express = require('express');
const { Genre, validateGenre } = require('../models/genre');
const router = express.Router();


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('genre with the given id was not found');
    res.send(genre);
});

router.post('/', async(req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name : req.body.name });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    // Look up the genre, If does not exit, return 404
    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('genre with the given id was not found');

    // validate input, If invalid, return 400 - Bad Request
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Update genre
    genre.name = req.body.name;
    genre = await genre.save();

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('genre with the given id was not found');
    res.send(genre);
})

module.exports = router;