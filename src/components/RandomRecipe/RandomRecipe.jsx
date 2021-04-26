import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './RandomRecipe.css';

function RandomRecipe(){

//define useDispatch and useSelector
const dispatch=useDispatch();
const random=useSelector((store)=>store.random);
let [randomIndex, setRandomIndex]=useState('');

//function to create new random

//function to call to 3rd party api for recipe
const getRandomRecipe=()=>{
    dispatch({type:'FETCH_RANDOM'});
    let randomNumber= Math.floor((Math.random() * 40));
    setRandomIndex(randomNumber)
}//end getRandomRecipe

//dispatch on Load
useEffect(()=>
  getRandomRecipe(),[]
)//end useEffect

//conditional Rendering
const getRandom=()=>{
    let randomDisplay=''
    if(random.length=== 0){
        randomDisplay=
        <>
         <h3>Loading</h3>
        </>
    }//end if
    else{
        let randomRecipeDetails= '/recipedetails/' + random[randomIndex].id
        randomDisplay=
        <>
        <p>{random[randomIndex].name}</p>
          <div>
            <Link to={randomRecipeDetails}>
          <img src={random[randomIndex].thumbnail_url} height="250" width="180"></img>
          </Link>
          </div>
        </>
    }//end else
    return randomDisplay;
}
//end getRandom

    return(
        
        <div className="recipe-random">
          <div>
            <h1>Random Recipe</h1>
          </div>
          <div className="random-recipe-section">
              <h5>hi</h5>
              {getRandom()}
              {/* {<img src=""} */}
          </div>
          <div>
              <button onClick={getRandomRecipe}>Try Again</button>
          </div>
        </div>
    )
}

export default RandomRecipe;