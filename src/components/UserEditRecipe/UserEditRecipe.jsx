import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

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
        <div>
         <form>
            <div>
              <h1>Add Recipe</h1>
            </div>
            <div>
              <p>Please fill in details below</p>
            </div>
            <div>
              <label>Recipe Name: </label><input type="text" defaultValue={recipe[0].name}  onChange={(event)=>setRecipeName(event.target.value)} required></input>
            </div>
            <div>
              <label>Recipe Image: </label><input type="text" defaultValue={recipe[0].img_url} onChange={(event)=>setImageUrl(event.target.value)} required ></input>
            </div>
            <div>
              <label>Recipe Author: </label><input type="text" defaultValue={recipe[0].credit} onChange={(event)=>setRecipeCredit(event.target.value)} required ></input>
            </div>
            <div>
              <label>Cook Time: </label><input type="number" defaultValue={recipe[0].cook_time} onChange={(event)=>setCookTime(event.target.value)} required></input>
            </div>
            <div>
              <label>Number of Servings: </label><input type="number" defaultValue={recipe[0].servings} onChange={(event)=>setServings(event.target.value)} required></input>
            </div>
            <div>
              <label>Ingredients</label><textarea type="paragraph_text" cols="50" rows="10" defaultValue={recipe[0].ingredients} onChange={(event)=>setIngredients(event.target.value)} required />
            </div>
            <div>
              <label>Instructions</label><textarea type="paragraph_text" cols="50" rows="10" defaultValue={recipe[0].instructions} onChange={(event)=>setInstructions(event.target.value)} required />
            </div>
            <div>
              <button type="button" onClick={editRecipe}>Submit Edited Recipe</button>
            </div>
          </form>
        </div>
    )
}

export default UserEditRecipe;