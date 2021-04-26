import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* myRecipesSaga(){
    yield takeEvery('FETCH_MY_RECIPES', fetchMyRecipes)
}

function* fetchMyRecipes(action){
    try{
        console.log('in fetch myRecipes')
        const response=yield axios.get('/api/myrecipes/' + action.payload)
        yield put ({type:'SET_MY_RECIPES', payload:response.data}); 
        }
    catch(error){ console.log('get results error', error);
    }
}

export default myRecipesSaga;