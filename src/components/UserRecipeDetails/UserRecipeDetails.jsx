import React, {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


function UserRecipeDetails(){
    //define useParams and useDispatch
    const id=useParams();
    const dispatch=useDispatch();
    //select reducers from the store
    const user=useSelector(store=>store.user);
    const recipe=useSelector(store=>store.singleRecipe)
    //dispatch on Load
    useEffect(()=>{
        dispatch({type:'FETCH_THIS_RECIPE', payload: id});
    },[])//end useEffect

    //function that first waits for the reducer to be set. Then if the recipe belongs to the user, an edit button will be conditionally rendered
    const recipeEdit=()=>{
        let editDisplay=''
        if(!recipe){
            editDisplay=<></>;
        }//end if   
        else{
            if(recipe[0].user_id===user.id){
                let editRecipeLink = '/usereditrecipe/' + recipe[0].id;
                editDisplay=
                <>
                <Link to={editRecipeLink}>
                <button>Edit Recipe</button>
                </Link>
                </>
            }//end if
            else{
                editDisplay=<></>
            }//end else
            return editDisplay
        }//end else
        return editDisplay;
     }
     //end recipeEdit

     //function that waits until reducer is set, then conditionally renders the recipe details
    const recipeDisplay=()=>{
        let userRecipeDisplay=''
        if(!recipe){
            userRecipeDisplay=
            <div>
                <h3>Loading</h3>
            </div>
        }//end if
        else{
            const saveRecipe=()=>{
                //recipe to save
                let savedRecipe={
                  user_id: user.id,
                  recipe_id: recipe[0].id,
                  img_url: recipe[0].img_url,
                  recipe_name: recipe[0].name
                }//end saveRecipe object
                console.log(savedRecipe);
                //dispatch to save the recipe
                dispatch({type: 'ADD_SAVE', payload:savedRecipe})
            }//end save Recipe
            //function to favorite a recipe
        const favoriteRecipe=()=>{
            let favoriteRecipe={
                user_id: user.id,
                recipe_id: recipe[0].id,
                img_url: recipe[0].img_url,
                recipe_name: recipe[0].name
              }//end favoriteRecipe object
              console.log(favoriteRecipe); 
              dispatch({type: 'ADD_FAVORITE', payload:favoriteRecipe})
        }//end favoriteRecipe
            userRecipeDisplay=
            <div>
                <div>
                    <h1><strong>{recipe[0].name}</strong></h1>
                </div>
                <div>
                    <img src={recipe[0].img_url}></img>
                </div>
                <button onClick={saveRecipe}>Save Recipe</button> <button onClick={favoriteRecipe}>Add to Favorites</button>
                <div>
                    <p><strong>Credit to: </strong>{recipe[0].credit}</p>
                    <p><strong>Cook Time: </strong>{recipe[0].cook_time} </p>
                    <p><strong>Servings: </strong>{recipe[0].servings}</p>
                    <h2><strong>Ingredients</strong></h2>
                    <div>
                        <p>{recipe[0].ingredients}</p>
                    </div>
                    <h2><strong>Instructions</strong></h2>
                    <div>
                      <p>{recipe[0].instructions}</p>
                    </div>
                </div>
            </div>
        }//end else
        return userRecipeDisplay
    }
    //end recipeDisplay
    return(
        <>
        <div>
            <div>
                {recipeEdit()}
                {recipeDisplay()}
            </div>
        </div>
        </>
    )
}

export default UserRecipeDetails;