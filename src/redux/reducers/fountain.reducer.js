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

const fountainComments = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    fountainsReducer,
    fountain,
    fountainComments
});