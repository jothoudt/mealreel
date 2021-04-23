const { default: axios } = require('axios');
const express = require('express');
const searchRouter = express.Router();

require('dotenv').config();

searchRouter.get('/', (req, res) =>{

    let param=req.query["search"];
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {from: '0', size: '2', tags: 'dinner', q:param},
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
});



module.exports= searchRouter;