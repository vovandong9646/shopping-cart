import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

export const addToCart = (product) => (dispatch, getState) => {
  // get from store (reducer)
  let cartItems = getState().carts.cartItems.slice(); // copy array

  // change logic so với branch b9-cart-redux-v1
  let itemExists = false;
  cartItems.forEach((item) => {
    if (item._id === product._id) {
      // nếu tồn tại item trong cart, thì tiến hành cộng quantity lên 1 và găn flag tồn tại là true để tý check item không tồn tại
      itemExists = true;
      item.quantity++;
    }
  });
  if (!itemExists) {
    cartItems.push({ ...product, quantity: 1 });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: {
      cartItems: cartItems,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeFromCart = (cartItems, product) => (dispatch) => {
  cartItems = cartItems.filter((item) => item._id !== product._id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      cartItems: cartItems,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
