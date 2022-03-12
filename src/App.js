import data from './data.json';
import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      cartItems: [],
    };
  }

  filterProducts = (event) => {
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        // products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value) >= 0),
        products: data.products.filter((product) => product.availableSizes.includes(event.target.value)),
      });
    }
  };

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        if (sort === 'lowest') {
          return a.price - b.price;
        } else if (sort === 'highest') {
          return b.price - a.price;
        } else {
          return a._id > b._id ? 1 : -1;
        }
      }),
    });
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice(); // clone new array
    const itemExists = cartItems.find((item) => item._id === product._id);
    let items = [];
    if (itemExists) {
      // ton tai item trong cart
      items = cartItems.map((item) => {
        return item._id === itemExists._id ? { ...item, quantity: itemExists.quantity + 1 } : item;
      });
    } else {
      // khong ton tai item trong cart
      items = [...cartItems, { ...product, quantity: 1 }];
    }
    this.setState({
      cartItems: items,
    });
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice(); // clone new
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href={'#'}>React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
