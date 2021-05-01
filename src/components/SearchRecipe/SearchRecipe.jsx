import {useDispatch,useSelector} from 'react-redux'
import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import EachRecipe from '../EachRecipe/EachRecipe';
import Grid from '@material-ui/core/Grid'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './SearchRecipe.css'

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Gochi Hand', 
        'cursive', 
        'sans-serif'
      ].join(','),
    },});

function SearchRecipes(){
    //define dispatch
    const dispatch=useDispatch();

    //useState to capture search tex
    let [search, setSearch]=useState('');
    
    //select items from reducer store
    const searchItems=useSelector((store) => {
        return store.search
      })

      //function to capture property of search
      const handleSearch=()=>{
          console.log('in search', event.target.value)
        setSearch(event.target.value);
    }

    //function to dispatch to get items from the search
    let fetchRecipes=()=>{
        dispatch(dispatch({type: 'FETCH_SEARCH', payload:search}))
    }

    

    return(
        <ThemeProvider theme={theme}>
          <div className="search-area">
            <input type="text" placeholder="Search For Recipes" onChange={handleSearch} className="search-input"></input>
            <Button style={{backgroundColor:"#3282B8", color: "white"}} onClick={fetchRecipes}>Search</Button>
          </div>
          <div className='grid-recipes'>
          <Grid container spacing={1}>
            {searchItems.map((item, id) =>  {
                    return (<EachRecipe recipe={item} key={id} />);
                    }
            )}
          </Grid>
          </div>
        </ThemeProvider>
    )}

export default SearchRecipes;