import {combineReducers} from 'redux';

import clientReducer from './clientReducer';

const reducers = combineReducers({
    client = clientReducer
});

export default reducers;