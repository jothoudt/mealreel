const { default: axios } = require('axios');
const express = require('express');
const detailsRouter = express.Router();

require('dotenv').config();

//get recipe details from 3rd party api
detailsRouter.get('/:id', (req, res)=>{
  let recipeId=req.params
  console.log(recipeId);

const option = {
  method: 'GET',
  url: RapidAPI,
  params: {id: recipeId.id},
  headers: {
    'x-rapidapi-key':'c508c19c3bmsh5d065d441287af7p1aa3fajsn132790e1a658',
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