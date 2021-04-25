import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './RandomRecipe.css';

function RandomRecipe(){

const dispatch=useDispatch();
const random=useSelector((store)=>store.random);
let randomIndex=''

const nextRecipe=()=>{
    randomIndex= Math.floor((Math.random() * 25) + 1);
    console.log('try different recipe', randomIndex)
    return randomIndex;
}

//function to call to 3rd party api for recipe
const getRandomRecipe=()=>{
    dispatch({type:'FETCH_RANDOM'});
    randomIndex= Math.floor((Math.random() * 25) + 1);
    console.log(randomIndex)
}

useEffect(()=>
  getRandomRecipe(),[]
)

const getRandom=()=>{
    let randomDisplay=''
    if(!random){
        randomDisplay=
        <>
         <h3>Loading</h3>
        </>
    }
    else{
        let randomRecipeDetails= '/recipedetails/' + random[Number(randomIndex)].id
        randomDisplay=
        <>
        <p>{random[Number(randomIndex)].name}</p>
          <div>
            <Link to={randomRecipeDetails}>
          <img src={random[Number(randomIndex)].thumbnail_url} height="250" width="180"></img>
          </Link>
          </div>
        </>
    }
    return randomDisplay;
}


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
              <button onClick={nextRecipe}>Try Again</button>
          </div>
        </div>
    )
}

export default RandomRecipe;