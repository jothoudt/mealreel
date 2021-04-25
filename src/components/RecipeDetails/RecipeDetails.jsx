import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';


function RecipeDetails(){

//define useParams and useDispatch
const id =useParams();
const dispatch=useDispatch();

//to fetch details on load
useEffect(()=>{
    dispatch ({type: 'FETCH_DETAILS', payload: id});
},[])

//select recipe details from the store
const detail=useSelector(store=>store.details);
const user=useSelector(store=>store.user);

//conditionally render recipe details to avoid timing errors
const getDetail=()=>{
    
    let display=''
    //if reducer isn't set a loading message will display
    if(!detail){
        display=
        <>
        <h3>loading</h3>
        </>
    }//end if 
    //otherwise display recipe properties
    else{
        //function to save a recipe
        const saveRecipe=()=>{
            //recipe to save
            let savedRecipe={
              user_id: user.id,
              recipe_id: detail.id,
              img_url: detail.thumbnail_url,
              recipe_name: detail.name
            }//end saveRecipe object
            console.log(savedRecipe);
            //dispatch to save the recipe
            dispatch({type: 'ADD_SAVE', payload:savedRecipe})
        }//end save Recipe
        //function to favorite a recipe
        const favoriteRecipe=()=>{
            let favoriteRecipe={
                user_id: user.id,
                recipe_id: detail.id,
                img_url: detail.thumbnail_url,
                recipe_name: detail.name
              }//end favoriteRecipe object
              console.log(favoriteRecipe); 
              dispatch({type: 'ADD_FAVORITE', payload:favoriteRecipe})
        }//end favoriteRecipe
        //function to display video if available or not
        const getVideo=()=>{
            let videoDisplay=''
            if(detail.renditions[0].url){
                videoDisplay=<iframe src={detail.renditions[0].url} height="720" width="720"></iframe>
            }//end if
            else{
                videoDisplay= <></>
            }//end else
            return videoDisplay
         }//end getVideo
        
        let ingredients= detail.sections[0].components;
         display=
         <>
        <button onClick={saveRecipe}>Save Recipe</button> <button onClick={favoriteRecipe}>Add to Favorites</button>
        <h1>{detail.name}</h1>
        <img src={detail.thumbnail_url} height="400px" width= "400px"></img>
        <ul><strong>Credit to:</strong>
        {detail.credits.map((credit, index)=>{
            return(
                <>
                <li key={index}>{credit.name}</li>
                </>
            )
        })}
        </ul>
        <p>{detail.description}</p>
        <p><strong>Prep Time:</strong>{detail.prep_time_minutes}</p>
        <p><strong>Cook Time: {detail.cook_time_minutes}</strong></p>
        <p><strong>Total Time:</strong>{detail.total_time_minutes}</p>
        <p><strong>Number of Servings</strong>{detail.num_servings}</p>
        <ul><h3><strong>Nutrition</strong></h3>
            <li><strong>Calories</strong>: {detail.nutrition.calories}</li>
            <li><strong>Carbohydrates</strong>: {detail.nutrition.carbohydrates}</li>
            <li><strong>Fat</strong>: {detail.nutrition.fat}</li>
            <li><strong>Fiber</strong>: {detail.nutrition.fiber}</li>
            <li><strong>Protein</strong>: {detail.nutrition.protein}</li>
            <li><strong>Sugar</strong>: {detail.nutrition.sugar}</li>
        </ul>

        <ul><h3><strong>Ingredients</strong></h3>
            {ingredients.map((ingredient, index)=>{
                return(
                    <>
                    <li key={index}>{ingredient.raw_text}</li>
                    </>
                )
            })}
        </ul>
        <h3>Instructions</h3>
        {detail.instructions.map((instruction, index)=>{
            return(
                <>
                  <p key={index}>{instruction.display_text}</p>
                </>
            )
        })}
        {/* <iframe src={detail.renditions[0].url} height="720" width="720"></iframe> */}
        {getVideo()}
        </>
    }
    return display;
}

    return(
        <>
        {getDetail()}
        {/* {getVideo()} */}
        </>
    )//end return
}//end RecipeDetails

export default RecipeDetails;