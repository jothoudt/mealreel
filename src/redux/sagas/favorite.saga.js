import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* favoriteSaga(){
    yield takeEvery('ADD_FAVORITE', addFavorite)
    yield takeEvery('FETCH_FAVORITE', getFavorite)
    yield takeEvery('DELETE_FAVORITE', deleteFavorite)
}//end favoriteSaga

//function for user to add a recipe to their favorites
function* addFavorite(action){
    console.log('add Favorite', action.payload);
    try{
        console.log('add to favorite')
        const favoriteThisRecipe=yield axios.post('/api/favorite/', action.payload);
        }
    catch(error){ console.log('add to favorite error', error);
    }
}//end addFavorite

//function for user to get their favorite recipes from the database
function* getFavorite(action){
    console.log(action.payload)
    try{
        const response=yield axios.get('api/favorite/' + action.payload)
        yield put({type: 'SET_FAVORITE', payload:response.data})
    }
    catch(error){
        console.log('get favorites error', error)
    }
}//end getFavorite

//function for user to delete a recipe from their favorites list
function* deleteFavorite(action){
    console.log(action.payload)
    try{
        const response=yield axios.delete('/api/favorite/' + action.payload.id, {data: action.payload})
    }
    catch(error){
        console.log('delete favorite error', error);
    }
}//end deleteFavorite

export default favoriteSaga;