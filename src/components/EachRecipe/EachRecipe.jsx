import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

//returns each item from the search
function EachRecipe(props){

  //define link
  let recipedetails= '/recipedetails/' + props.recipe.id;

    return(
        <>
        <div key={props.id}>
          <p>{props.recipe.name}</p>
          <div>
          <Link to={recipedetails} params={props.recipe.id}>
          <img src={props.recipe.thumbnail_url} height="250" width="180"></img>
          </Link>
          </div>
        </div>
        </>
    )//end return
}//end EachRecipe

export default EachRecipe;