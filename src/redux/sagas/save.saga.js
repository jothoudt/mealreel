import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* saveSaga(){
    yield takeEvery('ADD_SAVE', addSave)
}

function* addSave(action){
    console.log(action.payload);
    try{
        console.log('add to save')
        const saveThisRecipe=yield axios.post('/api/save/', action.payload);
        }
    catch(error){ console.log('add to save error', error);
    }
}

export default saveSaga;