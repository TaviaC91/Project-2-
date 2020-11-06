///// DEPENCIES ///////////

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

/////////PORT //////////////////

const PORT = process.env.PORT || 3000;

////////////////DATABASE////////////////////////

const MongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Project2';

///////////////MONGO CONNECTION//////////////////

mongoose.connect(MongoURI ,  { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('MongoDB connection established:', MongoURI)
  );

//////////////ERROR//////////////////SUCCESS////////////////////////

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


/////////////CONTROLLERS//////////////////////////

const libraryController = require('./controllers/library')


/////////////////////////MIDDLEWARE/////////////////////////


////////////PUBLIC FOLDER ////////////////////

app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////////////////METHOD OVERRIDE///////////////////

app.use(methodOverride('_method'));

app.use('/library', libraryController)

///////LOCAL HOST 3000///////////

app.get('/' , (req, res) => {
  res.redirect('/library');
});


////////PORT///////////LISTENER/////////////

app.listen(PORT, () => console.log( 'Listening on port:', PORT));