import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* randomSaga(){
    yield takeEvery('FETCH_RANDOM', fetchRandom)
}

function* fetchRandom(action){
    try{
        console.log('in fetch random')
        const response=yield axios.get('/api/random/')
        yield put ({type:'SET_RANDOM', payload:response.data}); 
        }
    catch(error){ console.log('get random error', error);
    }
}

export default randomSaga;