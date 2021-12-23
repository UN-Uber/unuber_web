import * as ActionTypes from '../actionTypes';

const reducer  = (state = {
    errMess: null,
    clients: [],
    }, action) =>{
    switch(action.type){
        case ActionTypes.ADD_CLIENT:
            var client = action.payload;    
            return state + client;
        case ActionTypes.DELETE_CLEINT:
            return state - client;
        case ActionTypes.GET_CLIENT:
            return state;
        case ActionTypes.UPDATE_CLIENT:
            return state + action.payload;
        case ActionTypes.CLIENT_LOADING:
            return {...state, isLoading: true, errMess: null, clients: []};
        case ActionTypes.CLIENT_FAIL:
            return {...state, isLoading: false, errMess: action.payload, clients: []};
        default:
            return state;
    }
};


export default reducer;