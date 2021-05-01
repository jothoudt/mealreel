import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './UserPage.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Gochi Hand', 
      'cursive', 
      'sans-serif'
    ].join(','),
  },});

function UserPage() {
  // select reducers used 
  const user = useSelector((store) => store.user);
  const saved = useSelector((store)=> store.save);
  const favorite =useSelector((store)=> store.favorite);
  const myRecipes=useSelector((store)=>store.myRecipes)

  //define dispatch
  const dispatch=useDispatch()

  //function that will be used to call all of the dispatches on load
  const onLoad=()=>{
    dispatch({type:'FETCH_SAVE', payload: user.id});
    dispatch({type:'FETCH_FAVORITE', payload:user.id});
    dispatch({type:'FETCH_MY_RECIPES', payload:user.id});
  }
  //dispatches on load
  useEffect(()=>
    onLoad()
  ,[]);

  //conditional rendering of save recipes
  const getSavedRecipes=()=>{
    //variable that will be returned
    let savedDisplay=''
    //if reducer is not set or empty return nothing
    if(!saved){
      savedDisplay= <> </>;
    }
    //else display the imformation from the reducer
    else{
      //map through the saved recipes reducer
      savedDisplay= saved.map((recipe, index)=>{
        let saveLink=''
        //conditional link used to navigate to recipe details
        if(recipe.recipe_id >= 1000){
        saveLink = '/recipedetails/' + recipe.recipe_id;
      }
      else{
        saveLink='/userrecipedetails/' + recipe.recipe_id
      }
        //function that deletes saved recipe
        const deleteSave=()=>{
          //parameters to send in dispatch
          let params={
            id: user.id,
            recipe_id:recipe.recipe_id
          }
          dispatch({type:'DELETE_SAVE', payload: params});
          dispatch({type:'FETCH_SAVE', payload: user.id})
        }
        return(
          
          // <div className="recipe-card" key={index}>
          //   <div className="recipe-card-details">
          //   <h4>{recipe.recipe_name}</h4>
          //   <Link to={saveLink}>
          //   <img src={recipe.recipe_img} height="150" width="150"></img>
          //   </Link>
          //   <div>
          //     <Button style={{backgroundColor:"#769FCD"}} onClick={deleteSave}>Remove</Button>
          //   </div>
          //   </div>
          // </div>
          <div className="recipe-card" key={index}>
          <Card style={{height:'325px', width: '300px', margin: '5px', backgroundColor:'#F7FBFC'}}>
          {/* <CardActionArea> */}
            <CardContent style={{padding:'10px'}}>
            <CardMedia
            image={recipe.recipe_img} 
            // height="250" width="180"
            title={recipe.recipe_name} style={{height:'200px', width:'100%', alignContent:'center'}}/>
            <Typography gutterBottom variant="h5" component="h2" style={{padding:'5px'}}>
            {recipe.recipe_name}
            </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              <Link to={saveLink}>
                <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
              </Link>
              <Button style={{backgroundColor:"#3282B8", color: "white"}} onClick={deleteSave}>Remove</Button>
            </CardActions>   
          </Card>
          </div>
        )
      })
    }
    return savedDisplay;
  }
  //end get savedRecipes
  //function to get the users favorite recipes
  const getFavoriteRecipes=()=>{
    //variable that will be returned
    let favoriteDisplay=''
    //if reducer not set or array is empty display nothing
    if(!favorite){
      favoriteDisplay= <> </>;
    }
    //else display users favorite recipes
    else{
      //map through favorite recipes array
      let favoriteLink ='';
      favoriteDisplay= favorite.map((recipe, index)=>{
        ///conditional to decide if it is targeting user recipes or 3rd party api party
        //all 3rd party apis have an id of 1000 or greater
        if(recipe.recipe_id >= 1000){
        favoriteLink = '/recipedetails/' + recipe.recipe_id;
        }
        else{
        favoriteLink= '/userrecipedetails/' + recipe.recipe_id;
        }
        //function to delete favorite recipe
        const deleteFavorite=()=>{
          let params={
            id: user.id,
            recipe_id:recipe.recipe_id
          }
          dispatch({type:'DELETE_FAVORITE', payload: params});
          dispatch({type:'FETCH_FAVORITE', payload: user.id})
        }
        return(
          // <div className="recipe-card" key={index}>
          //   <h4>{recipe.recipe_name}</h4>
          //   <Link to={favoriteLink}>
          //     <img src={recipe.recipe_img} height="150" width="150"></img>
          //   </Link>
          //   <div>
          //     <Button style={{backgroundColor:"#769FCD"}} onClick={deleteFavorite}>Remove</Button>
          //   </div>
          // </div>
          // <div className="recipe-card" key={index}>
          <div className="recipe-card" key={index}>
          <Card style={{height:'325px', width: '300px', margin: '5px', backgroundColor:'#F7FBFC'}}>
          {/* <CardActionArea> */}
            <CardContent style={{padding:'10px'}}>
            <CardMedia
            image={recipe.recipe_img} 
            // height="250" width="180"
            title={recipe.recipe_name} style={{height:'200px', width:'100%', alignContent:'center'}}/>
            <Typography gutterBottom variant="h5" component="h2" style={{padding:'5px'}}>
            {recipe.recipe_name}
            </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              <Link to={favoriteLink}>
                <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
              </Link>
              <Button style={{backgroundColor:"#3282B8", color: "white"}} onClick={deleteFavorite}>Remove</Button>
            </CardActions>   
          </Card>
          </div>
        )
      })
    }
    return favoriteDisplay;
  }
//end getFavoriteRecipes
//function to get recipes the user has shared
  const getMyRecipes=()=>{
    //variable to be returned
    let myRecipesDisplay='';
    //if reducer not set or array empty display nothing
    if(!myRecipes){
      myRecipesDisplay= <> </>;
    }
    //else display recipes
    else{
      //map through my recipes
      myRecipesDisplay= myRecipes.map((recipe, index)=>{
        let saveLink = '/userrecipedetails/' + recipe.id;
        //function for user to delete their own recipe
        const deleteMyRecipes=()=>{
          console.log('delete my recipe')
          }
        return(
          // <div className="recipe-card" key={index}>
          //   <h4>{recipe.name}</h4>
          //   <Link to={saveLink}>
          //   <img src={recipe.img_url} height="150" width="150"></img>
          //   </Link>
          //   <div>
          //     <Button style={{backgroundColor:"#769FCD"}} onClick={deleteMyRecipes}>Remove</Button>
          //   </div>
          // </div>
          <div className="recipe-card" key={index}>
          <Card style={{height:'325px', width: '300px', margin: '5px', backgroundColor:'#F7FBFC'}}>
          {/* <CardActionArea> */}
            <CardContent style={{padding:'10px'}}>
            <CardMedia
            image={recipe.img_url}
            // height="250" width="180"
            title={recipe.name} style={{height:'200px', width:'100%', alignContent:'center'}}/>
            <Typography gutterBottom variant="h5" component="h2" style={{padding:'5px'}}>
            {recipe.name}
            </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <CardActions>
              <Link to={saveLink}>
                <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
              </Link>
              <Button style={{backgroundColor:"#3282B8", color: "white"}} onClick={deleteMyRecipes}>Remove</Button>
            </CardActions>   
          </Card>
          </div>
        )
      })
    }
    return myRecipesDisplay;
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <div className="welcome-message">
        <h1>{user.username}'s Profile</h1>
        <h2>Welcome, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
      </div>
      <div className="favorite-recipes">
      <h2>Your favorite recipes</h2>
      <div className="recipe-carousel">
        {getFavoriteRecipes()}
      </div>
      </div>
      <div className="to-try">
      <h2>Recipes you have saved that you would like to try:</h2>
      <div className="recipe-carousel">
        {getSavedRecipes()}
        </div>
      </div>
      <div>
      <h2>Recipes you have shared:</h2>
      <div className="recipe-carousel">
        {getMyRecipes()}
      </div>
      </div>
      <div className="find-new">
        <h2><strong>Find New Recipes</strong></h2>
        </div>
      <div className="find-new-recipes-container">
        <div className="search-recipes">
          <h3>Traditional Search</h3>
          <p>Enter keywords in search to find recipes</p>
          <Link to ="/searchrecipe">
            <Button style={{backgroundColor:"#3282B8", color: "white"}}>Search</Button>
          </Link>
        </div>
        <div className="random-recipe">
          <h3>Try Something New</h3>
          <p>Click for a Random Recipe</p>
          <Link to="/randomrecipe">
            <Button style={{backgroundColor:"#3282B8", color: "white"}}> Random Recipe</Button>
          </Link>
        </div>
        <div className="user-recipes">
          <h3>User Recipes</h3>
          <p>Recipes Other Users Have Shared</p>
          <Link to="/userrecipes">
            <Button style={{backgroundColor:"#3282B8", color: "white"}} variant="outlined" variant="contained">User Recipes</Button>
          </Link>
        </div>
        </div>
      <div>
        <LogOutButton className="btn" />
      </div>
    </div>
    </ThemeProvider>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
