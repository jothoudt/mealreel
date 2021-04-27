import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function UserRecipes(){
    //define dispatch useSelector
    const dispatch=useDispatch();
    const recipes=useSelector(store=>store.userRecipe);

    //dispatch on load
    useEffect(()=>{
        dispatch({type:'FETCH_ALL_USER_RECIPES'});
    },[])//end useEffect

    //function to conditally render recipe details
    const getAllRecipes=()=>{
        //variable to return for display
        let recipeDisplay=''
        //if recipe reducer hasn't been set yet, display loading
        if(!recipes){
            recipeDisplay=
            <>
            <h2>Loading</h2>
            </>
        }//end if
        //else displays the recipes when the reducer is set
        else{
            recipeDisplay=
            <>
            {recipes.map((recipe, index)=>{
                let userRecipeLink= '/userrecipedetails/' + recipe.id
                return(
                    <div key={index}>
                      <div>
                        <p>{recipe.name}</p>
                      </div>
                      <Link to={userRecipeLink}>
                        <img src={recipe.img_url}></img>
                      </Link>
                    </div>
                )
            })}
            </>
        }//end else
        return recipeDisplay;
    }
    //end getAllRecipes

    return(
        <>
        <h1>User Recipes</h1>
        <div className="add-a-recipe">
            <Link to="/useraddrecipe">
              <button>Add A Recipe</button>
            </Link>
        <div>
            {getAllRecipes()}
        </div>
        </div>
        </>
    )
}
//end User Recipes
export default UserRecipes;