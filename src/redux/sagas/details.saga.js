import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* detailsSaga(){
    yield takeEvery('FETCH_DETAILS', fetchDetails)
}//end detailsSaga

//function to get a recipes details from 3rd party api
function* fetchDetails(action){
    let id=action.payload.id;
    try{
        console.log('in fetch details', id)
        const response=yield axios.get('/api/details/' + id);
        yield put ({type:'SET_DETAILS', payload:response.data}); 
        }
    catch(error){ console.log('get results error', error);
    }
}

export default detailsSaga;