import React, { Component } from 'react';
import formatCurrency from './../util';

export default class Cart extends Component {
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
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is empty</div>
          ) : (
            <div className="cart cart-header">You have {cartItems.length} items in the cart</div>
          )}
          <div>
            <div className="cart">
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
                        <button className="button" onClick={() => this.props.removeFromCart(item)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
