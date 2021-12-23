import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './reducers/index';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const store  = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;