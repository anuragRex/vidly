const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

// GET ROUTES
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('Movie with the given id was not found');
    res.send(movie);
});

// POST ROUTE
router.post('/', async(req, res) => {
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Finding Genre of the movie
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid Genre ID');

    const movie = new Movie({ 
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);
});


// PUT ROUTE
router.put('/:id', async (req, res) => {
    // validate the user Input
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Genre exists
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    // Update Movie
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        { 
          title: req.body.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
});


module.exports = router;