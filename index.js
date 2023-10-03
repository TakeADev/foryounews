require('dotenv').config()
const { get } = require("express/lib/response");

const express = require("express"),
  bodyParser = require("body-parser"),
  res = require("express/lib/response"),
  NewsAPI = require("newsapi"),
  axios = require("axios"),
  session = require('express-session'),
  uid = require('uid-safe'),
  middleware = require("./middleware/middleware"),
  utils = require('./utils/utils'),
  port = process.env.PORT

const app = express();
const newsapi = new NewsAPI(utils.apiKey);

//Setup
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  "/icons",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free")
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

//Requiring Routes
const indexRoutes = require('./routes/index'),
      categoryRoutes = require('./routes/category'),
      searchRoutes = require('./routes/search')

//Routes
app.use('/', indexRoutes)
app.use('/category', categoryRoutes)
app.use('/search', searchRoutes)

//Server start
app.listen(port, function () {
  console.log("Server is listening on port" + port);
});
