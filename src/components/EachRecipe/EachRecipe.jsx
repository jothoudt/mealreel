import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    Width: 250,
  },
  media: {
    height: 0,
  },
});

//returns each item from the search
function EachRecipe(props){
  const classes= useStyles;

  //define link
  let recipedetails= '/recipedetails/' + props.recipe.id;

    return(
        <div key={props.id}>
        <Grid item xs={12} spacing={6} key={props.id}>
        <Card style={{height:'450px', width: '300px', margin: '25px', backgroundColor:'#F7FBFC'}}>
        {/* <CardActionArea> */}
          <CardContent style={{padding:'10px'}}>
          <CardMedia
          image={props.recipe.thumbnail_url} 
          // height="250" width="180"
          title={props.recipe.name} style={{height:'300px', width:'100%', alignContent:'center'}}/>
          <Typography gutterBottom variant="h5" component="h2" style={{padding:'5px'}}>
          {props.recipe.name} 
          </Typography>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Link to={recipedetails} params={props.recipe.id}>
              <Button style={{backgroundColor:"#3282B8", color: "white"}}>See Recipe Details</Button>
            </Link>
          </CardActions>   
        </Card>
        </Grid>
        </div>
    )//end return
}//end EachRecipe

export default EachRecipe;