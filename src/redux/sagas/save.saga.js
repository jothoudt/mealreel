import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* saveSaga(){
    yield takeEvery('ADD_SAVE', addSave)
    yield takeEvery('FETCH_SAVE', getSave)
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

function* getSave(action){
    console.log(action.payload)
    try{
        const response=yield axios.get('api/save/' + action.payload)
        yield put({type: 'SET_SAVE', payload:response.data})
    }
    catch(error){
        console.log('get saved error', error)
    }
}
export default saveSaga;