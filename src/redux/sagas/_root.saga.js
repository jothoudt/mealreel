import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import detailsSaga from './details.saga';
import saveSaga from './save.saga';
import favoriteSaga from './favorite.saga';
import randomSaga from './random.saga';
import userRecipeSaga from './userRecipe.saga';
import singleRecipeSaga from './singleRecipe.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    searchSaga(),//search results
    detailsSaga(),//recipe details
    saveSaga(),//recipes saved by user
    favoriteSaga(),//recipes favorited by user
    randomSaga(),//returns recipes to select random
    userRecipeSaga(),//for user recipes
    singleRecipeSaga(),//for user recipe details
  ]);
}
