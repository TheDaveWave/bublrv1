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
        const ftnId = action.payload;
        // store response as a variable.
        const response = yield axios.get(`/api/fountain/${ftnId}`);
        yield put({type: 'SET_FOUNTAIN', payload: response.data});
    } catch (err) {
        console.log(`error in getting fountant w/ id: ${ftnId}`, err);
    }
}

// saga to fetch all the comments for the fountain with given id.
function* fetchFtnComments(action) {
    try {
        // get the fountain id from the payload.
        const ftnId = action.payload;
        // store response as a variable.
        const response = yield axios.get(`/api/comment/ftn/${ftnId}`);
        yield put({type: 'SET_COMMENTS', payload: response.data});
    } catch (err) {
        console.log(`Error getting comments for fountain w/ id: ${ftnId}`, err);
    }
}

// saga to fetch all the replies for a comment given the comment id.
function* fetchCommentReplies(action) {
    try {
        // const commentId = action.payload;
        // const response = yield axios.get(`/api/comment/reply/${commentId}`);
        const response = yield axios.get(`/api/comment/reply`);
        yield put({type: 'SET_REPLIES', payload: response.data});
    } catch (err) {
        console.log(`error in getting replies for comments`, err);
    }
}

function* fountainSaga() {
    yield takeLatest('GET_FOUNTAINS', fetchFountains);
    yield takeLatest('GET_FOUNTAIN', fetchFountain);
    yield takeLatest('GET_COMMENTS', fetchFtnComments);
    yield takeLatest('GET_REPLIES', fetchCommentReplies);
}

export default fountainSaga;