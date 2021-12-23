import * as ActionTypes from './actionTypes';
import clientData from '../shared/client';

export const fetchClients = () => async (dispatch) => {
    try{
        const res = await clientData.getAllClients();
        dispatch({
            type: ActionTypes.GET_CLIENTS,
            payload: res.data,
        });
    }catch(err){
        return Promise.reject(err);
    }
};


export const fetchClient = (id) => async (dispatch) => {
    try{
        const res = await clientData.getClient(id);
        dispatch({
            type:ActionTypes.GET_CLIENT,
            payload: res.data,
        });
    }catch(err){
        console.log(err);
    }
};


export const fetchCardsClient = (id) => async (dispatch) => {
    try{
        const res = await clientData.getCardsClient(id);
        dispatch({
            type:ActionTypes.GET_CARDS_CLIENT,
            payload: res.data,
        });
    }catch(err){
        console.log(err);
    }
}

export const addClient = (client) => async (dispatch) => {
    try{
        const res = await clientData.createClient(client);
        dispatch({
            type: ActionTypes.ADD_CLIENT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }catch (err){
        return Promise.reject(err);
    }
};

export const updateClient = (id, client) => async (dispatch) => {
    try{
        const res  = await clientData.updateClient(client, id);
        dispatch({
            type: ActionTypes.UPDATE_CLIENT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }catch (err){
        return Promise.reject(err);
    }
};


export const deleteClient = (id) => async (dispatch) => {
    try{
        await clientData.deleteClient(id);
        dispatch({
            type: ActionTypes.DELETE_CLIENT,
            payload: {id},
        });
    }catch (err){
        console.log(err);
    }
};

