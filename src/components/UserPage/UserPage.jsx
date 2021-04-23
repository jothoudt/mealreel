import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <div className="welcome-message">
        <h1>{user.username}'s Profile</h1>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
      </div>
      <div className="favorite-recipes">
        <h2>Your favorite recipes</h2>
      </div>
      <div className="to-try">
        <h2>Recipes you have saved that you would like to try:</h2>
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
