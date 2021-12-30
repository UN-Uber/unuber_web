import * as ActionTypes from '../actionTypes';

export const Clients  = (state = {
    errMess: null,
    clients: [],
    }, action) =>{
    switch(action.type){
        case ActionTypes.ADD_CLIENT:
            var client = action.payload;    
            return {...state, clients:state.clients.concat(client)};
        case ActionTypes.DELETE_CLIENT:
            return {...state ,state :state.clients.filter((id) => id !== action.payload)};
        case ActionTypes.GET_CLIENT:
            return state;
        case ActionTypes.UPDATE_CLIENT:
            return state;
        case ActionTypes.CLIENT_LOADING:
            return {...state, isLoading: true, errMess: null, clients: []};
        case ActionTypes.CLIENT_FAIL:
            return {...state, isLoading: false, errMess: action.payload, clients: []};
        case ActionTypes.GET_CLIENTS:
            return state.clients
        default:
            return state.clients;
    }
};