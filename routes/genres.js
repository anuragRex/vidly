const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const router = express.Router();


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    }
}));


/* const genres = [
    {id : 1, genre : 'Horror'},
    {id : 2, genre : 'Romance'},
    {id : 3, genre : 'Comedy'},
    {id : 4, genre : 'Tragedy'},
    {id : 5, genre : 'Drama'},
    {id : 6, genre : 'Action'},
    {id : 7, genre : 'Sci-Fi'},
];
*/

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with the given id was not found');
    res.send(genre);
});

router.post('/', (req, res) => {
    // validate input
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id : genres.length + 1,
        genre : req.body.genre
    }

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    // Look up the genre
    // If does not exit, return 404
    const genre = genres.find(el => el.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('genre with the given id was not found');

    // validate input
    // If invalid, return 400 - Bad Request
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Update genre
    genre.genre = req.body.genre;
    // return updated genre
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Look up the genre
    // If does not exit, return 404
    const index = genres.findIndex(el => el.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).send('genre with the given id was not found');

    // Delete the genre
    // Return the deleted genre
    res.send(genres.splice(index, 1));
})

function validateGenre(genre){
    const schema = {
        genre : Joi.string().min(4).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;