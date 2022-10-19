import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to send a get request to the server and put the response data
// into the fountain reducer.
function* fetchFountains() {
    try {
        // store the response as a variable.
        const response = yield axios.get('/api/fountain');
        // put the response data into the fountain reducer.
        yield put({type: 'SET_FOUNTAINS', payload: response.data});
    } catch (err) {
        console.log(`error in fetch fountains`, err);
    }
}

// saga to fetch fountain with specific id
function* fetchFountain(action) {
    try {
        // get the fountain id from the payload.
        const ftnId = action.payload.ftnId;
        // store response as a variable.
        const response = yield axios.get(`/api/fountain/${ftnId}`);
        yield put({type: 'SET_FOUNTAIN', payload: response.data});
    } catch (err) {
        console.log(`error in getting fountant w/ id: `, err);
    }
}

function* fountainSaga() {
    yield takeLatest('GET_FOUNTAINS', fetchFountains);
    yield takeLatest('GET_FOUNTAIN', fetchFountain);
}

export default fountainSaga;