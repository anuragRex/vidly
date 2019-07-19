const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true})
    .then(()=> console.log('connected to database'))
    .catch(err => console.log(err));

// enable req.body json parse 
app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
    res.send('WELCOME TO VIDLY : The Video Rental App');
});


const port  = process.env.PORT || 4000;
app.listen(port, ()=> { console.log(`App is listening on port : ${port}`) });