import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './UserAddRecipe.css';

function UserAddRecipe(){

  //define dispatch and history
  const dispatch=useDispatch();
  const history=useHistory();

  //select reducer from store
  const user= useSelector((store) => store.user);

  //define useState to set the properties of the recipe
  let [recipeName, setRecipeName]=useState('');
  let [recipeCredit, setRecipeCredit]=useState('');
  let [cookTime, setCookTime]=useState('');
  let [servings, setServings]=useState('');
  let [imageUrl, setImageUrl]=useState('');
  let [ingredients, setIngredients]=useState('');
  let [instructions, setInstructions]=useState('');

  //function to submit recipe to database
  const submitRecipe=()=>{
    //object to send to the database
    let newRecipe={
      name: recipeName,
      img_url: imageUrl,
      credit: recipeCredit,
      cookTime: cookTime,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions,
      user_id: user.id
    }//end newRecipe object
    //dispatch the recipe to the database
    dispatch({type: 'ADD_USER_RECIPE', payload:newRecipe});
    //direct user back to userrecipes
    history.push('/userrecipes')
  }
  //end submitRecipe
    return(
        <div className='add-form'>
          <form>
            <div>
              <h1><span className="recipe-title">Add Recipe</span></h1>
            </div>
            <div>
              <p><span className="recipe-title">Please fill in details below</span></p>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Name: </span></label><input type="text" placeholder="Recipe Name" onChange={(event)=>setRecipeName(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Image: </span></label><input type="text" placeholder="Image URL" onChange={(event)=>setImageUrl(event.target.value)} required ></input>
            </div>
            <div>
              <label><span className="recipe-title">Recipe Author: </span></label><input type="text" placeholder="Recipe Author" onChange={(event)=>setRecipeCredit(event.target.value)} required ></input>
            </div>
            <div>
              <label><span className="recipe-title">Cook Time(Number of Minutes): </span></label><input type="number" onChange={(event)=>setCookTime(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Number of Servings: </span></label><input type="number" onChange={(event)=>setServings(event.target.value)} required></input>
            </div>
            <div>
              <label><span className="recipe-title">Ingredients</span></label><textarea type="paragraph_text" cols="50" rows="10" placeholder="Ingredients" onChange={(event)=>setIngredients(event.target.value)} required />
            </div>
            <div>
              <label><span className="recipe-title">Instructions</span></label><textarea type="paragraph_text" cols="50" rows="10" plaeholder="Instructions" onChange={(event)=>setInstructions(event.target.value)} required />
            </div>
            <div>
              <Button style={{backgroundColor:"#0F4C75", color: "white"}} onClick={submitRecipe}>Submit Recipe</Button>
            </div>
          </form>
        </div>
    )
}

export default UserAddRecipe;