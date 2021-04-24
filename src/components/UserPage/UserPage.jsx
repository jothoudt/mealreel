import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const saved = useSelector((store)=> store.save);
  const favorite =useSelector((store)=> store.favorite);

  const dispatch=useDispatch()

  const onLoad=()=>{
    dispatch({type:'FETCH_SAVE', payload: user.id});
    dispatch({type:'FETCH_FAVORITE', payload:user.id});
  }

  useEffect(()=>
    onLoad()
  ,[]);

  const getSavedRecipes=()=>{
    let savedDisplay=''
    if(!saved){
      savedDisplay= <> </>;
    }
    else{
      savedDisplay= saved.map((recipe, index)=>{
        let saveLink = '/recipedetails/' + recipe.recipe_id;
        return(
          <div className="recipe-card" key={index}>
            <h4>{recipe.recipe_name}</h4>
            <Link to={saveLink}>
            <img src={recipe.recipe_img} height="150" width="150"></img>
            </Link>
            <div>
              <button>Remove</button>
            </div>
          </div>
        )
      })
    }
    return savedDisplay;
  }

  const getFavoriteRecipes=()=>{
    let favoriteDisplay=''
    if(!favorite){
      favoriteDisplay= <> </>;
    }
    else{
      
      favoriteDisplay= favorite.map((recipe, index)=>{
        let favoriteLink = '/recipedetails/' + recipe.recipe_id;
        return(
          <div className="recipe-card" key={index}>
            <h4>{recipe.recipe_name}</h4>
            <Link to={favoriteLink}>
              <img src={recipe.recipe_img} height="150" width="150"></img>
            </Link>
            <div>
              <button>Remove</button>
            </div>
          </div>
        )
      })
    }
    return favoriteDisplay;
  }

  return (
    <div className="container">
      <div className="welcome-message">
        <h1>{user.username}'s Profile</h1>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      <div className="favorite-recipes">
        <h2>Your favorite recipes</h2>
        {getFavoriteRecipes()}
      </div>
      <div className="to-try">
        <h2>Recipes you have saved that you would like to try:</h2>
        {getSavedRecipes()}
      </div>
      <div className="find-new-recipes">
        <div className="search-recipes">
          <h3>Search for recipe by name</h3>
          <Link to ="/searchrecipe">
            <button>Search</button>
          </Link>
        </div>
        <div className="random-recipe">
          <Link to="/randomrecipe">
            <button> Random Recipe</button>
          </Link>
        </div>
        </div>
      <div>
        <LogOutButton className="btn" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
