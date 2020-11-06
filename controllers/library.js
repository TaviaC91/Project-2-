///////////////////DEPENENCIES//////////////

const express = require('express')
const books = express.Router()

///////////MODELS ///////////////

const Books = require('../models/library')

///////JSON ROUTE /////////////////////

books.get('/json', async (req, res) => {
    try {
      const books = await Books.find()
      res.send(books)
    } catch (err) {
      res.send(err.message)
    }
  })

  //////////////////////////ROUTES/////////////////////////////////


////// INDEX ROUTE////////////////
  books.get('/', async (req, res) => {
    try {
      const books = await Books.find()
      res.render('../views/index.ejs', { books })
    } catch (err) {
      res.send(err.message)
    }
  })
  
  
  /////////NEW ROUTE ////////////

  books.get('/new', (req, res) => {
    res.render('../views/new.ejs')
  })
  
  //////// SHOW ROUTE //////////////

books.get('/:id', async (req, res) => {
    try {
      const book = await Books.findById(req.params.id)
      res.render('../views/show.ejs', { book: book })
    } catch (err) {
      res.send('That isn\'t a valid id! <a href="/book">Go back</a>')
    }
  })
  
  ////// CREATE ROUTE//////////////

books.post('/', async (req, res) => {
    try {
      const book = await Books.create(req.body)
      res.redirect('/library/' + book.id)
    } catch (err) {
      res.send(err.message)
    }
  })
 
  /////// EDIT ROUTE ////////////

books.get('/:id/edit', async (req, res) => {
    try {
      const book = await Books.findById(req.params.id)
      res.render('../views/edit.ejs', { book: book })
    } catch (err) {
      res.send(err.message)
    }
  })
  
  //////UPDATE ROUTE/////////////////

books.put('/:id', async (req, res) => {
    try {
      const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.redirect('/library/' + book.id)
    } catch (err) {
      res.send(err.message)
    }
  })
  
  
  //////DELETE ROUTE////////////////
  
books.delete('/:id', async (req, res) => {
    try {
      await Books.findByIdAndRemove(req.params.id)
      res.redirect('/library')
    } catch (err) {
      res.send(err.message)
    }
  })

  module.exports = books
  
  