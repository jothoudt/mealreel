import {useDispatch,useSelector} from 'react-redux'
import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import EachRecipe from '../EachRecipe/EachRecipe';
import Grid from '@material-ui/core/Grid'



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
        <>
        <input type="text" placeholder="Search For Recipes" onChange={handleSearch}></input>
        <Button style={{backgroundColor:"#769FCD"}} onClick={fetchRecipes}>Search</Button>
        <Grid container spacing={1}>
        {searchItems.map((item, id) =>  {
                    return (<EachRecipe recipe={item} key={id} />);
                    }
    )}
        </Grid>
    </>
    )}

export default SearchRecipes;