import * as ActionTypes from '../actionTypes';

const reducer  = (state = {
    errMess: null,
    clients: [],
    }, action) =>{
    switch(action.type){
        case ActionTypes.ADD_CLIENT:
            var client = action.payload;    
            return {...state, clients:state.clients.concat(client)};
        case ActionTypes.DELETE_CLIENT:
            return clients.filter(({id}) => id !== payload.id);
        case ActionTypes.GET_CLIENT:
            return state;
        case ActionTypes.UPDATE_CLIENT:
            return clients.map((client) => {
                if (client.id === payload.id){
                    return{...client, ...payload,};
                }else{
                    return client;
                }
            });
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


export default reducer;