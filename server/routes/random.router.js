const { default: axios } = require('axios');
const express = require('express');
const detailsRouter = express.Router();

require('dotenv').config();

detailsRouter.get('/:id', (req, res)=>{
  let recipeId=req.params
  console.log(recipeId);

const option = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/detail',
  params: {id: recipeId.id},
  headers: {
    'x-rapidapi-key': RapidAPI,
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

axios.request(option).then(function (response) {
	console.log(response.data);
  res.send(response.data);
}).catch(function (error) {
	console.error(error);
  res.sendStatus(500);
});
})

module.exports= detailsRouter;