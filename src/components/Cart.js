import React, { Component } from 'react';
import formatCurrency from './../util';
import { Fade, Zoom } from 'react-reveal';
import { connect } from 'react-redux';
import { removeFromCart } from './../actions/CartAction';
import { createOrder, clearOrder } from './../actions/OrderAction';
import Modal from 'react-modal';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowForm: false,
      name: '',
      email: '',
      address: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    return (
      <>
        {!cartItems ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <div className="cart cart-header">Cart is empty</div>
            ) : (
              <div className="cart cart-header">You have {cartItems.length} items in the cart</div>
            )}

            {order && (
              <Modal isOpen={true} onRequestClose={this.closeModal}>
                <Zoom>
                  <button className="close-modal" onClick={this.closeModal}>
                    x
                  </button>
                  <div className="order-details">
                    <h3 className="success-message">Your order hash been placed.</h3>
                    <h2>Order {order._id}</h2>
                    <u>
                      <li>
                        <div>Name:</div>
                        <div>{order.name}</div>
                      </li>
                      <li>
                        <div>Email:</div>
                        <div>{order.email}</div>
                      </li>
                      <li>
                        <div>Address:</div>
                        <div>{order.address}</div>
                      </li>
                      <li>
                        <div>Date:</div>
                        <div>{order.createdAt}</div>
                      </li>
                      <li>
                        <div>Total:</div>
                        <div>{formatCurrency(order.total)}</div>
                      </li>
                      <li>
                        <div>Cart Items:</div>
                        <div>
                          {order.cartItems.map((x) => (
                            <div key={x._id}>
                              {x.quantity} x {x.title}
                            </div>
                          ))}
                        </div>
                      </li>
                    </u>
                  </div>
                </Zoom>
              </Modal>
            )}

            <div>
              <div className="cart">
                <Fade left cascade>
                  <ul className="cart-items">
                    {cartItems.map((item) => (
                      <li key={item._id}>
                        <div>
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div>
                          <div>{item.title}</div>
                          <div className="right">
                            {formatCurrency(item.price)} x {item.quantity} {'   '}
                            <button
                              className="button"
                              onClick={() => this.props.removeFromCart(this.props.cartItems, item)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Fade>
              </div>
              {cartItems.length !== 0 && (
                <>
                  <div className="cart">
                    <div className="total">
                      <div>
                        Total: {formatCurrency(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}
                      </div>
                      <button className="button primary" onClick={() => this.setState({ isShowForm: true })}>
                        Proceed
                      </button>
                    </div>
                  </div>
                  {this.state.isShowForm && (
                    <Fade right cascade>
                      <div className="cart">
                        <form action="" onSubmit={this.handleSubmit}>
                          <ul className="form-container">
                            <li>
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" name="email" required onChange={this.handleInput} />
                            </li>
                            <li>
                              <label htmlFor="name">Name</label>
                              <input type="text" id="name" name="name" required onChange={this.handleInput} />
                            </li>
                            <li>
                              <label htmlFor="address">Address</label>
                              <input type="text" id="address" name="address" required onChange={this.handleInput} />
                            </li>
                            <li>
                              <button type="submit" className="button primary">
                                Checkout
                              </button>
                            </li>
                          </ul>
                        </form>
                      </div>
                    </Fade>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
export default connect((state) => ({ cartItems: state.carts.cartItems, order: state.order.order }), {
  removeFromCart,
  createOrder,
  clearOrder,
})(Cart);
