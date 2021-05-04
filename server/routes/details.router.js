const { default: axios } = require('axios');
const express = require('express');
const detailsRouter = express.Router();

require('dotenv').config();

//get recipe details from 3rd party api
detailsRouter.get('/:id', (req, res)=>{
  let recipeId=req.params
  console.log(process.env.Application_Key);
  let headers= {
    'x-rapidapi-key': `${process.env.Application_Key}`,
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
  console.log('------------------------------------------------sending', headers)
const option = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/detail',
  params: {id: recipeId.id},
  headers: headers

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
