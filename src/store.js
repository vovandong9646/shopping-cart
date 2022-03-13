import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { productReducers } from './reducers/ProductReducer';
import { cartReducers } from './reducers/CartReducer';

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
  combineReducers({
    products: productReducers,
    carts: cartReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default Store;
