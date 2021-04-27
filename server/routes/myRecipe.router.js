const { default: axios } = require('axios');
const express = require('express');
const myRecipeRouter = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  const encryptLib = require('../modules/encryption');
  const pool = require('../modules/pool');
  const userStrategy = require('../strategies/user.strategy');

  //for user to get all the recipes they have added
  myRecipeRouter.get('/:id', (req, res)=>{
    const fetchmyRecipesQuery=`SELECT * FROM "user_recipes" WHERE "user_id"= $1;`;
    pool.query(fetchmyRecipesQuery, [req.params.id]).then(result=>{res.send(result.rows)})
      .catch((err)=>{
        console.log(err)
        res.sendStatus(500)});
  })

  module.exports= myRecipeRouter;