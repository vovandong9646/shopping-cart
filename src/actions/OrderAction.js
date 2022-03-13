import { CREATE_ORDER, CLEAR_ORDER, CLEAR_CART } from './../types';

export const createOrder = (order) => (dispatch) => {
  fetch('/api/order', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CREATE_ORDER,
        payload: data,
      });
      localStorage.removeItem('cartItems');
      dispatch({
        type: CLEAR_CART,
      });
    })
    .catch((error) => console.log(error));
};

export const clearOrder = () => (dispatch) => {
  dispatch({
    type: CLEAR_ORDER,
  });
};
