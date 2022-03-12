import { FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from '../types';

export const productReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCT_BY_SIZE:
      return { ...state, filteredItems: action.payload.items, size: action.payload.size };
    case ORDER_PRODUCTS_BY_PRICE:
      return { ...state, filteredItems: action.payload.items, sort: action.payload.sort };
    default:
      return state;
  }
};
