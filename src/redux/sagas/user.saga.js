import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// used to update user info.
function* updateUser(action) {
  try {
    const firstname = action.payload.firstname;
    const lastname = action.payload.lastname;
    const password = action.payload.password;
    yield axios.put(`/api/user/edit`, {firstname, lastname, password, bio});
    yield put({type: 'FETCH_USER'});
  } catch (err) {
    console.log('Error updating user', err);
  }
}

function* updateBio(action) {
  try {
    const bio = action.payload;
    yield axios.put(`/api/user/bio`, {bio});
    yield put({type: 'FETCH_USER'});
  } catch (err) {
    console.log('Erro updating user bio', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('EDIT_USER', updateUser);
  yield takeLatest('EDIT_BIO', updateBio);
}

export default userSaga;
