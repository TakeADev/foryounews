const express = require('express'),
    router = express.Router(),
    middleware = require('../middleware/middleware'),
    utils = require('../utils/utils')

//When new search query is posted, updates pageNumber to 1
router.post('/', middleware.searchMiddleware, (req,res) => {
    utils.pageNumber = 1
    req.session.searchTerm = req.body.search
    res.redirect('/search')
  })
  
  //Renders search page template 
  router.get("/", middleware.searchMiddleware, (req, res) => {
    res.render('search.ejs', {article: utils.articles, totalResults: utils.totalResults, searchTerm: req.session.searchTerm, pageNumber: utils.pageNumber, numofPages: utils.numofPages})
  })
  
  //Adds 1 to pageNumber counter
  router.get("/nextpage", (req, res) => {
    if(utils.pageNumber < utils.numofPages){
      utils.pageNumber++; 
    }
    res.redirect('/search')
  })
  
  //Subtracts 1 from pageNumber counter
  router.get('/previouspage', (req, res) => {
    if(utils.pageNumber > 1){
      utils.pageNumber--
    }
    res.redirect('/search')
  })

  module.exports = router