import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userRecipeSaga(){
    yield takeEvery('ADD_USER_RECIPE', addRecipe);
    yield takeEvery('FETCH_ALL_USER_RECIPES', fetchAllRecipes);
    yield takeEvery('EDIT_USER_RECIPE', editRecipe);
}//end userRecipeSaga

//for user to add a recipe to the database
function* addRecipe(action){
    try{
        console.log('in add user recipe')
        const response=yield axios.post('/api/userrecipes/', action.payload)
        }
    catch(error){ console.log('get results error', error);
    }
}//end addRecipe

//for user to get all of their recipes
function* fetchAllRecipes(){
    try{
        const allresponse=yield axios.get('/api/userrecipes/');
        yield put({type:'SET_USER_RECIPES', payload:allresponse.data});
    }
    catch(error){console.log('get user recipes', error);}
}//end fetchAllRecipes

//for user to edit their recipe
function* editRecipe(action){
    console.log('in edit recipe');
    try{
        const editresponse=yield axios.put('/api/userrecipes/', action.payload);
    }
    catch(error){
        console.log('edit recipe error', error);
    }
}//end editRecipe

export default userRecipeSaga;