import {useDispatch,useSelector} from 'react-redux'
import React, {useState} from 'react'
import EachRecipe from '../EachRecipe/EachRecipe'
function SearchRecipes(){
    const dispatch=useDispatch();

    let [search, setSearch]=useState('');

    const searchItems=useSelector((store) => {
        return store.search
      })

      const handleSearch=()=>{
          console.log('in search', event.target.value)
        setSearch(event.target.value);
    }

    let fetchRecipes=()=>{
        dispatch(dispatch({type: 'FETCH_SEARCH', payload:search}))
    }

    

    return(
        <>
        <input type="text" placeholder="Search For Recipes" onChange={handleSearch}></input>
        <button onClick={fetchRecipes}>Search</button>
        {searchItems.map((item, id) =>  {
                    return (<EachRecipe recipe={item} key={id} />);
                    // <div key={id}>
                    // <p>{item.name}</p>
                    // <p key={id}><img src={item.thumbnail_url} height="250" width="180"></img></p>
                    // </div>
                    // )
                    }
    )}
    </>
    )}

export default SearchRecipes;