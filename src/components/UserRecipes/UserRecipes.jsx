import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import './UserRecipes.css'
import { checkPropTypes } from 'prop-types';

const theme = createMuiTheme({
  button: {
    "&:hover": {
      backgroundColor: '#BBE1FA',
    }
  },  
  typography: {
      fontFamily: [
        'Gochi Hand', 
        'cursive', 
        'sans-serif'
      ].join(','),
    },});

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
                    // <div key={index}>
                    //   <div>
                    //     <p>{recipe.name}</p>
                    //   </div>
                    //   <Link to={userRecipeLink}>
                    //     <img src={recipe.img_url}></img>
                    //   </Link>
                    // </div>
                    <div key={recipe.id}>
                    <Grid item xs={12} spacing={6} key={index}>
                      <Card style={{height:'480px', width: '300px', margin: '25px', backgroundColor:'#F7FBFC'}}>
                        <CardContent style={{padding:'10px'}}>
                          <CardMedia
                            image={recipe.img_url} 
                            title={recipe.name} style={{height:'300px', width:'100%', alignContent:'center'}}/>
                          <Typography gutterBottom variant="h5" component="h2" style={{padding:'3px'}}>
                          {recipe.name} 
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link to={userRecipeLink}>
                            <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
                          </Link>
                        </CardActions>   
                      </Card>
                    </Grid>
                    </div>
                )
            })}
            </>
        }//end else
        return recipeDisplay;
    }
    //end getAllRecipes

    return(
        <ThemeProvider theme={theme}>
          <h1>User Recipes</h1>
          <div className="add-a-recipe">
            <Link to="/useraddrecipe">
              <Button style={{backgroundColor:"#3282B8", color: "white", fontSize: "22px"}} >Add A Recipe</Button>
            </Link>
          <div className='grid-recipes'>
          <Grid container spacing={1}>
            {getAllRecipes()}
          </Grid>
          </div>
          </div>
        </ThemeProvider>
    )
}
//end User Recipes
export default UserRecipes;