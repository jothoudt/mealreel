import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Button from '@material-ui/core/Button';

function UserEditRecipe(){

  //define useParams, useDispatch, useHistory
  const id=useParams();
  const dispatch=useDispatch();
  const history=useHistory();

  //get reducers needed from the store
  const user= useSelector((store) => store.user);
  const recipe=useSelector((store)=> store.singleRecipe)

  //define useState for each property of the recipe with prepopulated text from the database
  let [recipeName, setRecipeName]=useState(recipe[0].name);
  let [recipeCredit, setRecipeCredit]=useState(recipe[0].credit);
  let [cookTime, setCookTime]=useState(recipe[0].cook_time);
  let [servings, setServings]=useState(recipe[0].servings);
  let [imageUrl, setImageUrl]=useState(recipe[0].img_url);
  let [ingredients, setIngredients]=useState(recipe[0].ingredients);
  let [instructions, setInstructions]=useState(recipe[0].instructions);

  //function to dispatch edited recipe
  const editRecipe=()=>{
    console.log(id)
    //object sent to update the database
    let editRecipe={
      name: recipeName,
      img_url: imageUrl,
      credit: recipeCredit,
      cook_time: cookTime,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions,
      user_id: user.id,
      id: recipe[0].id
    }//end object
    //dispatch to update recipe
    dispatch({type: 'EDIT_USER_RECIPE', payload:editRecipe});
    //directs the user back to user recipes
    history.push('/userrecipes')
  }
  //end editRecipe

  //dispatch for the recipes details on load
  useEffect(()=>{
    dispatch({type:'FETCH_THIS_RECIPE', payload: id});
},[])

    return(
        <div className="add-form">
         <form>
            <div>
              <h1><span className="recipe-title">Add Recipe</span></h1>
            </div>
            <div>
              <p><span className="recipe-title">Please fill in details below</span></p>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Name: </span></label><input type="text" defaultValue={recipe[0].name}  onChange={(event)=>setRecipeName(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Image: </span></label><input type="text" defaultValue={recipe[0].img_url} onChange={(event)=>setImageUrl(event.target.value)} required ></input>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Author: </span></label><input type="text" defaultValue={recipe[0].credit} onChange={(event)=>setRecipeCredit(event.target.value)} required ></input>
            </div>
            <div>
              <label><span className="recipe-title">Cook Time: </span></label><input type="number" defaultValue={recipe[0].cook_time} onChange={(event)=>setCookTime(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Number of Servings: </span></label><input type="number" defaultValue={recipe[0].servings} onChange={(event)=>setServings(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Ingredients</span></label><textarea type="paragraph_text" cols="50" rows="10" defaultValue={recipe[0].ingredients} onChange={(event)=>setIngredients(event.target.value)} required />
            </div>
            <div>
              <label><span className="recipe-title">Instructions</span></label><textarea type="paragraph_text" cols="50" rows="10" defaultValue={recipe[0].instructions} onChange={(event)=>setInstructions(event.target.value)} required />
            </div>
            <div>
              <Button style={{backgroundColor:"#3282B8", color: "white"}} type="button" onClick={editRecipe}>Submit Edited Recipe</Button>
            </div>
          </form>
        </div>
    )
}

export default UserEditRecipe;