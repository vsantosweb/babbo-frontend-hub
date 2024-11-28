// reducers/index.js
import { combineReducers } from 'redux';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    order: orderReducer,
});

export default rootReducer;
