const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);
const morgan = require('morgan');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();


if(!config.get('jwtPrivateKey')){
    console.error('!FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}



mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true})
    .then(()=> console.log('connected to database'))
    .catch(err => console.log(err));

// enable req.body json parse 
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth)


app.get('/', (req, res) => {
    res.send('WELCOME TO VIDLY : The Video Rental App');
});


const port  = process.env.PORT || 4000;
app.listen(port, ()=> { console.log(`App is listening on port : ${port}`) });