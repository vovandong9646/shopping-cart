import React, { Component } from 'react';
import formatCurrency from './../util';
import { Fade, Zoom } from 'react-reveal';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from './../actions/ProductAction';
import { addToCart } from './../actions/CartAction';

Modal.setAppElement('#root');
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (e, product) => {
    e.preventDefault();
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {!this.props.products ? (
              <p>Loading...</p>
            ) : (
              this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={'#' + product._id} onClick={(e) => this.openModal(e, product)}>
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        className="button primary"
                        onClick={() => this.props.addToCart(this.props.cartItems, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </Fade>
        {product && (
          <Modal id="modal" isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Size
                    {product.availableSizes.map((x) => (
                      <span key={x}>
                        {' '}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(this.props.cartItems, product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect((state) => ({ products: state.products.filteredItems, cartItems: state.carts.cartItems }), {
  fetchProducts,
  addToCart,
})(Products);
