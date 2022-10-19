import { combineReducers } from "redux";

// a reducer to store the fountains.
const fountainsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_FOUNTAINS':
            return action.payload;
        default:
            return state;
    }
};

// reducer to store a specific fountain.
const fountain = (state={}, action) => {
    switch (action.type) {
        case 'SET_FOUNTAIN':
            return action.payload;    
        default:
            return state;
    }
}

// reducer to store fountain comments.
const fountainComments = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload;
        default:
            return state;
    }
}

// // reducer to store comment replies.
// const commentReplies = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_REPLIES':
//             return action.payload    
//         default:
//             return state;
//     }
// }

// reducer to store all replies.
const replies = (state = [], action) => {
    switch (action.type) {
        case 'SET_REPLIES':
            return action.payload    
        default:
            return state;
    }
}

export default combineReducers({
    fountainsReducer,
    fountain,
    fountainComments,
    // commentReplies,
    replies,
});