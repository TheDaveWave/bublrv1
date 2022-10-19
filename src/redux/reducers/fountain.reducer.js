// a reducer to store the fountains.
const fountainsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_FOUNTAINS':
            return action.payload;
        default:
            return state;
    }
};


export default fountainsReducer;