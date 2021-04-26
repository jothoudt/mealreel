import React, {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


function UserRecipeDetails(){
    const id=useParams();
    const dispatch=useDispatch();

    const user=useSelector(store=>store.user);
    const recipe=useSelector(store=>store.singleRecipe)

    useEffect(()=>{
        dispatch({type:'FETCH_THIS_RECIPE', payload: id});
    },[])

    const recipeEdit=()=>{
        let editDisplay=''
        if(!recipe){
            editDisplay=<></>;
        }   
        else{
            if(recipe[0].user_id===user.id){
                let editRecipeLink = '/usereditrecipe/' + recipe[0].id;
                editDisplay=
                <>
                <Link to={editRecipeLink}>
                <button>Edit Recipe</button>
                </Link>
                </>
            }
            else{
                editDisplay=<></>
            }
            return editDisplay
        }
        return editDisplay;
     }

    const recipeDisplay=()=>{
        let userRecipeDisplay=''
        if(!recipe){
            userRecipeDisplay=
            <div>
                <h3>Loading</h3>
            </div>
        }
        else{
            userRecipeDisplay=
            <div>
                <div>
                    <h1><strong>{recipe[0].name}</strong></h1>
                </div>
                <div>
                    <img src={recipe[0].img_url}></img>
                </div>
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
        }
        return userRecipeDisplay
    }
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