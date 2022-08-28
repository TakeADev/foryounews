const express = require('express'),
    router = express.Router(),
    middleware = require('../middleware/middleware'),
    utils = require('../utils/utils'),
    session = require('express-session')

    //Sends request to API, renders index template
    router.get("/", middleware.categoryMiddleware, (req, res) => {
        res.render("index.ejs", { article: utils.articles });
      });

module.exports = router