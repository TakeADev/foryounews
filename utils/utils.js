const axios = require('axios'),
      session = require('express-session')
const res = require('express/lib/response');

const utilObj = {}

utilObj.whatpage = 1;
utilObj.articles = [];
utilObj.reqUrl = ''
utilObj.totalResults = 1
utilObj.searchTerm = undefined
utilObj.pageNumber = 1
utilObj.numofPages = 4
utilObj.apiKey = process.env.API_KEY
//Sends request to API
utilObj.getArticles = async function() {
    try {
      const response = await axios.get(
        utilObj.reqUrl
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
  
//Takes API Request and adds articles to an array
utilObj.articlesToArray = async function(arts){
    utilObj.articles = []
      try {
        //Clears articles in array
        utilObj.articles = []
        //Sends request to API
        arts = await utilObj.getArticles();
        //if request comes back with articles, updates totalResults
        if (arts.totalResults != null){
          utilObj.totalResults = arts.totalResults
        }
        //for every article, push to array
          for (let i = 0; i < arts.articles.length; i++) {
            if(arts.articles[i].url != null){
              //if no image, insert placeholder image
              if(arts.articles[i].urlToImage == null){
              arts.articles[i].urlToImage = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
              utilObj.articles.push(arts.articles[i]);
          } else {
              utilObj.articles.push(arts.articles[i]);
          }
          }
            }
          
      } catch (err) {
        console.error(err)
      }
    }
  
module.exports = utilObj