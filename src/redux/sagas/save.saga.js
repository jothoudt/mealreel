import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* saveSaga(){
    yield takeEvery('ADD_SAVE', addSave)
    yield takeEvery('FETCH_SAVE', getSave)
    yield takeEvery('DELETE_SAVE', deleteSave)
}//end saveSaga

//for user to add recipe to their saved list
function* addSave(action){
    console.log(action.payload);
    try{
        console.log('add to save')
        const saveThisRecipe=yield axios.post('/api/save/', action.payload);
        }
    catch(error){ console.log('add to save error', error);
    }
}//end addSave

//for user to get their saved recipes from the database
function* getSave(action){
    console.log(action.payload)
    try{
        const response=yield axios.get('/api/save/' + action.payload)
        yield put({type: 'SET_SAVE', payload:response.data})
    }
    catch(error){
        console.log('get saved error', error)
    }
}//end getSave

//for user to delete saved recipe from their list
function* deleteSave(action){
    console.log(action.payload)
    try{
        const response=yield axios.delete('/api/save/' + action.payload.id, {data: action.payload})
    }
    catch(error){
        console.log('delete save error', error);
    }
}//end deleteSave

export default saveSaga;