import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* searchSaga(){
    yield takeEvery('FETCH_SEARCH', fetchSearch)
}

function* fetchSearch(action){
    try{
        console.log('in fetch search')
        const response=yield axios.get('/api/search', { params: { search: action.payload } })
        yield put ({type:'SET_SEARCH', payload:response.data}); 
        }
    catch(error){ console.log('get results error', error);
    }
}

export default searchSaga;