import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
//components I added
import RandomRecipe from '../RandomRecipe/RandomRecipe';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import SearchRecipe from '../SearchRecipe/SearchRecipe';
import UserRecipes from '../UserRecipes/UserRecipes';
import UserAddRecipe from '../UserAddRecipe/UserAddRecipe';
import UserRecipeDetails from '../UserRecipeDetails/UserRecipeDetails';
import UserEditRecipe from '../UserEditRecipe/UserEditRecipe';


import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/searchrecipe" >
              <SearchRecipe />
            </ProtectedRoute>
          
            <ProtectedRoute exact path="/randomrecipe">
              <RandomRecipe />
            </ProtectedRoute>

            <ProtectedRoute exact path="/recipedetails/:id">
              <RecipeDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path="/userrecipes">
              <UserRecipes />
            </ProtectedRoute>

            <ProtectedRoute exact path="/useraddrecipe">
              <UserAddRecipe />
            </ProtectedRoute>

            <ProtectedRoute exact path="/usereditrecipe/:id">
              <UserEditRecipe />
            </ProtectedRoute>

            <ProtectedRoute exact path="/userrecipedetails/:id">
              <UserRecipeDetails />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
