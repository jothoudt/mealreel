const { default: axios } = require('axios');
const express = require('express');
const userRecipeRouter = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  const encryptLib = require('../modules/encryption');
  const pool = require('../modules/pool');
  const userStrategy = require('../strategies/user.strategy');

  userRecipeRouter.get('/', (req, res)=>{
    const fetchAllQuery=`SELECT * FROM "user_recipes";`;
    pool.query(fetchAllQuery).then(result=>{res.send(result.rows)})
      .catch((err)=>{
        console.log(err)
        res.sendStatus(500)});
  })

  userRecipeRouter.get('/:id', (req, res)=>{
    let recipeId=req.params.id
    console.log(recipeId)
    const fetchSingleRecipe=`SELECT * FROM "user_recipes" WHERE "id"=$1;`
    pool.query(fetchSingleRecipe, [recipeId]).then(result=>{res.send(result.rows)})
      .catch((err)=>{
        res.sendStatus(500);
      })

  })

  userRecipeRouter.post('/', (req, res)=>{
    console.log(req.body)
    const addRecipeQuery= `INSERT INTO "user_recipes" ("name", "img_url", "credit", "cook_time", "servings", "ingredients", "instructions", "user_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    pool.query(addRecipeQuery, [req.body.name, req.body.img_url, req.body.credit, req.body.cookTime, req.body.servings, req.body.ingredients, req.body.instructions, req.body.user_id]).then(()=>res.sendStatus(201))
    .catch((err)=>{
        console.log('add user recipe fail', err)
        res.sendStatus(500);
    })
})

module.exports=userRecipeRouter;