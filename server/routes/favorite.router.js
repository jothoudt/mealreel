const { default: axios } = require('axios');
const express = require('express');
const favoriteRouter = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  const encryptLib = require('../modules/encryption');
  const pool = require('../modules/pool');
  const userStrategy = require('../strategies/user.strategy');

require('dotenv').config();

favoriteRouter.get('/:id', (req,res)=>{
    console.log(req.params);
    const getFavoriteQuery=`SELECT * FROM "favorites" WHERE "user_id"=$1;`;
    pool.query(getFavoriteQuery, [req.params.id]).then(result =>{res.send(result.rows);}).catch(err=>{res.sendStatus(500)})
})

favoriteRouter.post('/', (req, res)=>{
    console.log(req.body)
    const saveQuery= `INSERT INTO "favorites" ("recipe_id", "recipe_img", "recipe_name", "user_id") VALUES ($1, $2, $3, $4)`
    pool.query(saveQuery, [req.body.recipe_id, req.body.img_url, req.body.recipe_name, req.body.user_id]).then(()=>res.sendStatus(201))
    .catch((err)=>{
        console.log('favorite fail', err)
        res.sendStatus(500);
    })
})

module.exports= favoriteRouter;