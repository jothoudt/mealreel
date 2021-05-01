import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './RandomRecipe.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
      fontSize:30,
      fontFamily: [
        'Gochi Hand', 
        'cursive', 
        'sans-serif'
      ].join(','),
    },});

function RandomRecipe(){

//define useDispatch and useSelector
const dispatch=useDispatch();
const random=useSelector((store)=>store.random);
let [randomIndex, setRandomIndex]=useState('');

//function to create new random

//function to call to 3rd party api for recipe
const getRandomRecipe=()=>{
    dispatch({type:'FETCH_RANDOM'});
    let randomNumber= Math.floor((Math.random() * 40));
    setRandomIndex(randomNumber)
}//end getRandomRecipe

//dispatch on Load
useEffect(()=>
  getRandomRecipe(),[]
)//end useEffect

//conditional Rendering
const getRandom=()=>{
    //variable to be returned
    let randomDisplay=''
    //if array empty display loading
    if(random.length=== 0 || !random){
        randomDisplay=
        <>
         <h3>Loading</h3>
        </>
    }//end if
    //else  display a random recipe
    else{
        let randomRecipeDetails= '/recipedetails/' + random[randomIndex].id
        randomDisplay=
        // <>
        // <p>{random[randomIndex].name}</p>
        //   <div>
        //     <Link to={randomRecipeDetails}>
        //   <img src={random[randomIndex].thumbnail_url} height="250" width="180"></img>
        //   </Link>
        //   </div>
        // </>
        <Card style={{height:'500px', width: '300px', margin: '25px', backgroundColor:'#F7FBFC'}}>
        {/* <CardActionArea> */}
          <CardContent style={{padding:'10px'}}>
          <CardMedia
          image={random[randomIndex].thumbnail_url}
          // height="250" width="180"
          title={random[randomIndex].name} style={{height:'300px', width:'100%', alignContent:'center'}}/>
          <Typography gutterBottom variant="h5" component="h2" style={{padding:'5px'}}>
          {random[randomIndex].name}
          </Typography>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Link to={randomRecipeDetails}>
              <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
            </Link>
          </CardActions>   
        </Card>
    }//end else
    return randomDisplay;
}
//end getRandom

    return(
        
        <div className="recipe-random">
          <div>
            <h1>Random Recipe</h1>
          </div>
              {getRandom()}
          <div>
              <Button style={{backgroundColor:"#3282B8", color: "white"}} onClick={getRandomRecipe}>Try Again</Button>
          </div>
        </div>
    )
}
//end getRandom
export default RandomRecipe;