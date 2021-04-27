import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* singleRecipeSaga(){
    yield takeEvery('FETCH_THIS_RECIPE', fetchUserRecipe)
}//end singleRecipeSaga

//gets user recipe details from the database
function* fetchUserRecipe(action){
    let id=action.payload.id;
    console.log(id)
    try{
        console.log('in fetch user recipe')
        const response=yield axios.get('/api/userrecipes/' + id);
        yield put ({type:'SET_USER_RECIPE', payload:response.data}); 
        }
    catch(error){ console.log('get results error', error);
    }
}//end fetchUserRecipe

export default singleRecipeSaga;