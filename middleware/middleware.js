const utils = require('../utils/utils.js')
const middlewareObj = {}
const session = require('express-session')

//Sends request to API
middlewareObj.categoryMiddleware = async function (req, res, next) {
  //If on category route, include it in search query
    if (req.params.category !== undefined){
        utils.whatPage = '&category=' + req.params.category
        utils.reqUrl = "https://newsapi.org/v2/top-headlines?country=us&pageSize=21" + '&category='+ req.params.category + '&apiKey=' + utils.apiKey
        //pushes articles to an array
        await utils.articlesToArray();
        next();
      } 
      //Else send request for all top articles
      else {
        utils.whatpage = undefined;
        utils.reqUrl = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=21&apiKey=' + utils.apiKey
        //pushes articles to an array
        await utils.articlesToArray();
        next();
      }
}

//Includes search query to API request
middlewareObj.searchMiddleware = async (req, res, next) => {
  let searchTerm = req.session.searchTerm
    //If no search term, update searchTerm with search term
    if(searchTerm == undefined){
      searchTerm = req.body.search
    } 
    //If provided search term has changed and is not undefined, update searchTerm
    else if(searchTerm != req.body.search && req.body.search != undefined){
      searchTerm = req.body.search
    }
    //Updates request URL 
    utils.reqUrl = "https://newsapi.org/v2/everything?pageSize=21&q=" + searchTerm + '&page=' + utils.pageNumber + '&apiKey=' + utils.apiKey
    await utils.articlesToArray();
    next();
  }
  

module.exports = middlewareObj
