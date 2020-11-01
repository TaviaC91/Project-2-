//Dependencies//////

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

//Port/////

const PORT = process.env.PORT || 3000;


///Database//////

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + `Project2`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on('open', () => {});


//Middleware////

app.use(express.static("public"));


app.use(express.urlencoded({
    extended: false
})); 
app.use(express.json()); 

app.use(methodOverride('_method')); 


const Books = require("./models/library.js")



/////// Routes/////


////// Index Route///// 

app.get("/library", (req, res) => {
    Books.find({}, (error, allBooks) => {
        console.log(allBooks)
        res.render("index.ejs", {
            books: allBooks
        })
    })
})


///New Route////

app.get("/library/new", (req, res) => {
    res.render("new.ejs")
})

/// Show Route/////
app.get("/library/:id", (req, res) => {
    Books.findById(req.params.id, (error, foundBook) => {
        res.render("show.ejs", {
            book: foundBook
        })
    })
})

/// Edit Route////

app.get("/library/:id/edit", (req, res) => {
    Books.findById(req.params.id, (error, foundBooks) => {
        if (error) {
            console.log(error)
        }
        console.log(foundBooks)
        res.render("edit.ejs", {
            books: foundBooks
        })
    })
})

//Create Route////

app.post("/library", (req, res) => {
    // console.log(req.body)
    Books.create(req.body, (error, createdBook) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect("/library")
        }
    })
})

////Update Route//

app.put("/library/:id", (req, res) => {
    Books.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedModel) => {
        console.log(req.body)
        if (error) {
            console.log(error)
        }
        res.redirect("/library")
    })
})


//Delete Route ////

app.delete("/library/:id", (req, res) => {
    Books.findByIdAndRemove(req.params.id, {
        userFindAndModify: false
    }, (error, data) => {
        res.redirect("/library")
    })
})




//localhost:3000/////

app.get("/", (req, res) => {
    res.send('Hello World!');
});



//Listener Port////////

app.listen(PORT, () => console.log('Listening on port:', PORT));