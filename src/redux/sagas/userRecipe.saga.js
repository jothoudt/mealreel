import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userRecipeSaga(){
    yield takeEvery('ADD_NEW_RECIPE', addRecipe)
}

function* addRecipe(action){
    try{
        console.log('in fetch search')
        const response=yield axios.post('/api/userrecipes', action.payload)
        }
    catch(error){ console.log('get results error', error);
    }
}

export default userRecipeSaga;