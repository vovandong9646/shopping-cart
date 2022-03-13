import { ADD_TO_CART, REMOVE_FROM_CART } from '../types';

export const addToCart =
  (items = [], product) =>
  (dispatch) => {
    //   cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItems = items.slice();
    const existsItems = cartItems.find((item) => item._id === product._id);
    if (existsItems) {
      cartItems = cartItems.map((item) =>
        item._id === existsItems._id ? { ...item, quantity: existsItems.quantity + 1 } : item,
      );
    } else {
      cartItems.push({ ...product, quantity: 1 });
      //   cartItems = cartItems.concat({ ...product, quantity: 1 });
      //   cartItems = [...cartItems, { ...product, quantity: 1 }];
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
