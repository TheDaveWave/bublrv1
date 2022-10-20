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
        // console.log(ftnId);
        // store response as a variable.
        const response = yield axios.get(`/api/comment/ftn/${ftnId}`);
        yield put({type: 'SET_COMMENTS', payload: response.data});
    } catch (err) {
        console.log(`Error getting comments for fountain w/ id: ${ftnId}`, err);
    }
}

// saga to add a comment to a fountain.
function* addComment(action) {
    try {
        const ftnId = action.payload.ftnId;
        yield axios.post(`/api/comment/${ftnId}`, {body: action.payload.body});
        yield put({type: 'GET_COMMENTS', payload: ftnId});
    } catch (err) {
        console.log(`error in adding comment`, err);
    }
}

// saga to delete a comment
function* deleteComment(action) {
    try {
        const ftnId = action.payload.ftnId;
        const commentId = action.payload.commentId;
        yield axios.delete(`/api/comment/${commentId}`);
        yield put({type: 'GET_COMMENTS', payload: ftnId});
    } catch (err) {
        console.log('Error deleting comment from fountain', err);
    }
}

// saga to update comment body.
function* updateComment(action) {
    try {
        const ftnId = action.payload.ftnId;
        const commentId = action.payload.commentId;
        const newBody = action.payload.body;
        yield axios.put(`/api/comment/${commentId}`, {newBody});
        // refresh comments.
        yield put({type: 'GET_COMMENTS', payload: ftnId});
    } catch (err) {
        console.log('Error updating comment', err);
    }
}

// saga to fetch all the replies for each comment.
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

// /api/comment/reply/:commentId
// saga to add a reply to a comment given a comment id.
function* addReply(action) {
    try {
        // setup comment id from the payload.
        const commentId = action.payload.commentId;
        yield axios.post(`/api/comment/reply/${commentId}`, {body: action.payload.body});
        // after adding, retrieve updated list of replies.
        yield put({type: 'GET_REPLIES'});
    } catch (err) {
        console.log('Error adding reply to comment', err);
    }
}

// saga to delete a reply given the reply id.
// /api/comment/reply/:replyId
function* deleteReply(action) {
    try {
        // set replyId to action.payload.
        const replyId = action.payload;
        yield axios.delete(`/api/comment/reply/${replyId}`);
        // refresh replies.
        yield put({type: 'GET_REPLIES'});
    } catch (err) {
        console.log('Error deleting reply with id', err);
    }
}

// saga to update reply body.
function* updateReply(action) {
    try {
        const replyId = action.payload.replyId;
        const newBody = action.payload.newBody;
        yield axios.put(`/api/comment/reply/${replyId}`, {newBody});
        // refresh replies.
        yield put({type: 'GET_REPLIES'});
    } catch (err) {
        console.log('Error updating reply with id', err);
    }
}

function* fountainSaga() {
    yield takeLatest('GET_FOUNTAINS', fetchFountains);
    yield takeLatest('GET_FOUNTAIN', fetchFountain);
    yield takeLatest('GET_COMMENTS', fetchFtnComments);
    // sagas that manipulate comment entities.
    yield takeLatest('GET_REPLIES', fetchCommentReplies);
    yield takeLatest('ADD_COMMENT', addComment);
    yield takeLatest('DELETE_COMMENT', deleteComment);
    yield takeLatest('UPDATE_COMMENT', updateComment);
    // sagas that manipulate reply entities.
    yield takeLatest('ADD_REPLY', addReply);
    yield takeLatest('DELETE_REPLY', deleteReply);
    yield takeLatest('UPDATE_REPLY', updateReply);
}

export default fountainSaga;