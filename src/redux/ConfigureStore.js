import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {Clients} from './reducers/clientReducer';

export const ConfigureStore = () => {
    const store =  createStore(
        combineReducers({
            clients: Clients
        }),
        applyMiddleware(thunk, logger)
    );   
    return store;
};