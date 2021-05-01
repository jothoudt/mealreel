import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import './RecipeDetails.css'

function RecipeDetails(){

//define useParams and useDispatch
const id =useParams();
const dispatch=useDispatch();

//select recipe details from the store
const detail=useSelector(store=>store.details);
const user=useSelector(store=>store.user);

//to fetch details on load
useEffect(()=>{
    dispatch ({type: 'FETCH_DETAILS', payload: id});
},[])

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
            if(detail.renditions.length===0){
                videoDisplay=<></>
            }//end if
            else{
                videoDisplay= <iframe src={detail.renditions[0].url} height="720" width="720" className="video-frame"></iframe>
            }//end else
            return videoDisplay
         }//end getVideo
        
        let ingredients= detail.sections[0].components;
         display=
         <>
        <Button style={{backgroundColor:"#3282B8", margin: "30px"}} onClick={saveRecipe}>Save Recipe</Button> <Button style={{backgroundColor:"#3282B8", margin: "30px"}} onClick={favoriteRecipe}>Add to Favorites</Button>
        <div>
        <h1><span className="recipe-title">{detail.name} </span> </h1>
        </div>
        <div >
        <img src={detail.thumbnail_url} height="400px" width= "400px" className="large-image"></img>
        </div>
        <div>
        <ul  className="credit-ul" ><strong>Credit to:</strong>
        {detail.credits.map((credit, index)=>{
            return(
                <>
                <li key={index}>{credit.name}</li>
                </>
            )
        })}
        </ul>
        </div>
        <div className="recipe-title">
        <p>{detail.description}</p>
        </div>
        <div className="prep-time-servings">
        <div>
        <p><strong>Prep Time:  </strong> {detail.prep_time_minutes}</p>
        </div>
        <div>
        <p><strong>Cook Time: </strong> {detail.cook_time_minutes}</p>
        </div>
        <div>
        <p><strong>Total Time:  </strong> {detail.total_time_minutes}</p>
        </div>
        <div>
        <p><strong>Number of Servings:  </strong>{detail.num_servings}</p>
        </div>
        </div>
        <div>
        <ul className="nutrition-list"><h3><strong>Nutrition</strong></h3>
            <li><strong>Calories</strong>: {detail.nutrition.calories}</li>
            <li><strong>Carbohydrates</strong>: {detail.nutrition.carbohydrates}</li>
            <li><strong>Fat</strong>: {detail.nutrition.fat}</li>
            <li><strong>Fiber</strong>: {detail.nutrition.fiber}</li>
            <li><strong>Protein</strong>: {detail.nutrition.protein}</li>
            <li><strong>Sugar</strong>: {detail.nutrition.sugar}</li>
        </ul>
        </div>
        <div>
        <ul className="ingredients-list"><h3><strong>Ingredients</strong></h3>
            {ingredients.map((ingredient, index)=>{
                return(
                    <>
                    <li key={index}>{ingredient.raw_text}</li>
                    </>
                )
            })}
        </ul>
        </div>
        <div>
        <h3><span className="recipe-title">Instructions</span></h3>
        </div>
        <div className="instruction-table">
        {detail.instructions.map((instruction, index)=>{
            return(
                <>
                  <p key={index}>{instruction.display_text}</p>
                </>
            )
        })}
        </div>
        {/* <iframe src={detail.renditions[0].url} height="720" width="720"></iframe> */}
        {getVideo()}
        </>
    }
    return display;
}

    return(
        <div className="recipe-details-page">
        {getDetail()}
        {/* {getVideo()} */}
        </div>
    )//end return
}//end RecipeDetails

export default RecipeDetails;