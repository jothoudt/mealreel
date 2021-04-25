import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userRecipeSaga(){
    yield takeEvery('ADD_USER_RECIPE', addRecipe);
    yield takeEvery('FETCH_ALL_USER_RECIPES', fetchAllRecipes);
}

function* addRecipe(action){
    try{
        console.log('in add user recipe')
        const response=yield axios.post('/api/userrecipes/', action.payload)
        }
    catch(error){ console.log('get results error', error);
    }
}

function* fetchAllRecipes(){
    try{
        const allresponse=yield axios.get('/api/userrecipes/');
        yield put({type:'SET_USER_RECIPES', payload:allresponse.data});
    }
    catch(error){console.log('get user recipes', error);}
}

export default userRecipeSaga;