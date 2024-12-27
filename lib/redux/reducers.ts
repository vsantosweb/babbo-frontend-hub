// reducers/index.js
import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import redirectReducer from './redirectReducer';

const rootReducer = combineReducers({
    order: orderReducer,
    redirectApp: redirectReducer
});

export default rootReducer;
