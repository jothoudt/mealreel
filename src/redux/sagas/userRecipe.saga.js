import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userRecipeSaga(){
    yield takeEvery('ADD_USER_RECIPE', addRecipe)
}

function* addRecipe(action){
    try{
        console.log('in add user recipe')
        const response=yield axios.post('/api/userrecipes/', action.payload)
        }
    catch(error){ console.log('get results error', error);
    }
}

export default userRecipeSaga;