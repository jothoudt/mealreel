import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

function UserAddRecipe(){

  const dispatch=useDispatch();
  const history=useHistory();

  const user= useSelector((store) => store.user);

  let [recipeName, setRecipeName]=useState('');
  let [recipeCredit, setRecipeCredit]=useState('');
  let [cookTime, setCookTime]=useState('');
  let [servings, setServings]=useState('');
  let [imageUrl, setImageUrl]=useState('');
  let [ingredients, setIngredients]=useState('');
  let [instructions, setInstructions]=useState('');

  const submitRecipe=()=>{
    let newRecipe={
      name: recipeName,
      img_url: imageUrl,
      credit: recipeCredit,
      cookTime: cookTime,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions,
      user_id: user.id
    }
    dispatch({type: 'ADD_USER_RECIPE', payload:newRecipe});
    history.push('/userrecipes')
  }

    return(
        <div className='add-form'>
          <form>
            <div>
              <h1>Add Recipe</h1>
            </div>
            <div>
              <p>Please fill in details below</p>
            </div>
            <div>
              <label>Recipe Name: </label><input type="text" placeholder="Recipe Name" onChange={(event)=>setRecipeName(event.target.value)} required></input>
            </div>
            <div>
              <label>Recipe Image: </label><input type="text" placeholder="Image URL" onChange={(event)=>setImageUrl(event.target.value)} required ></input>
            </div>
            <div>
              <label>Recipe Author: </label><input type="text" placeholder="Recipe Author" onChange={(event)=>setRecipeCredit(event.target.value)} required ></input>
            </div>
            <div>
              <label>Cook Time: </label><input type="number" onChange={(event)=>setCookTime(event.target.value)} required></input>
            </div>
            <div>
              <label>Number of Servings: </label><input type="number" onChange={(event)=>setServings(event.target.value)} required></input>
            </div>
            <div>
              <label>Ingredients</label><textarea type="paragraph_text" cols="50" rows="10" placeholder="Ingredients" onChange={(event)=>setIngredients(event.target.value)} required />
            </div>
            <div>
              <label>Instructions</label><textarea type="paragraph_text" cols="50" rows="10" plaeholder="Instructions" onChange={(event)=>setInstructions(event.target.value)} required />
            </div>
            <div>
              <button onClick={submitRecipe}>Submit Recipe</button>
            </div>
          </form>
        </div>
    )
}

export default UserAddRecipe;