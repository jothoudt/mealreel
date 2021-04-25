import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';

function UserAddRecipe(){

  const dispatch=useDispatch();

  const user= useSelector((store) => store.user);

  let [recipeName, setRecipeName]=useState('');
  let [recipeCredit, setRecipeCredit]=useState('');
  let [imageUrl, setImageUrl]=useState('');
  let [ingredients, setIngredients]=useState('');
  let [instructions, setInstructions]=useState('');

  const submitRecipe=()=>{
    newRecipe={
      name: recipeName,
      img_url: imageUrl,
      credit: recipeCredit,
      ingredients: ingredients,
      instructions: instructions,
      user_id: user.id
    }
    dispatch({type: 'ADD_USER_RECIPE', payload:newRecipe});
  }

    return(
        <div className='add-form'>
          <form>
            <h1>Add Recipe</h1>
          <p>Please fill in details below</p>
          <label>Recipe Name: </label><input type="text" placeholder="Recipe Name" onChange={(event)=>setRecipeName(event.target.value)} required></input>
          <label>Recipe Image: </label><input type="text" placeholder="Image URL" onChange={(event)=>setImageUrl(event.target.value)} required ></input>
          <label>Recipe Author: </label><input type="text" placeholder="Recipe Author" onChange={(event)=>setRecipeCredit(event.target.value)} required ></input>
          <label>Ingredients</label><input type="paragraph_text" cols="50" rows="10" placeholder="Ingredients" onChange={(event)=>setIngredients(event.target.value)} required></input>
          <label>Instructions</label><input type="paragraph_text" cols="50" rows="10" plaeholder="Instructions" onChange={(event)=>setInstructions(event.target.value)} required></input>
          <button onClick={submitRecipe}>Submit Recipe</button>
          </form>
        </div>
    )
}

export default UserAddRecipe;