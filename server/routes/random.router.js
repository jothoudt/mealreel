const { default: axios } = require('axios');
const express = require('express');
const detailsRouter = express.Router();

require('dotenv').config();

//get recipes from 3rd party api
detailsRouter.get('/', (req, res)=>{
  let recipeId=req.params
  console.log(recipeId);

  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {from: '2', size: '40', tags: 'dinner'},
    headers: {
      'x-rapidapi-key': RapidAPI,
      'x-rapidapi-host': 'tasty.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data.results);
  }).catch((err)=>{
    res.sendStatus(500)
  

})
})
module.exports= detailsRouter;