import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function UserRecipes(){

    const dispatch=useDispatch();
    const recipes=useSelector(store=>store.userRecipe);

    useEffect(()=>{
        dispatch({type:'FETCH_ALL_USER_RECIPES'});
    })

    const getAllRecipes=()=>{
        let recipeDisplay=''
        if(!recipes){
            recipeDisplay=
            <>
            <h2>Loading</h2>
            </>
        }
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
        }
        return recipeDisplay;
    }

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

export default UserRecipes;