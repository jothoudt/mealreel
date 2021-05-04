const { default: axios } = require('axios');
const express = require('express');
const searchRouter = express.Router();

require('dotenv').config();

//get search query results from 3rd party api
searchRouter.get('/', (req, res) =>{

  console.log(process.env.RapidAPI)
    let param=req.query["search"];
    let headers= {
      'x-rapidapi-key': `${process.env.Application_Key}`,
      'x-rapidapi-host': 'tasty.p.rapidapi.com'
    }
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {from: '0', size: '12', tags: 'dinner', q:param},
        headers:headers
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        res.send(response.data.results);
      }).catch((err)=>{
        res.sendStatus(500)
      

})
});



module.exports= searchRouter;