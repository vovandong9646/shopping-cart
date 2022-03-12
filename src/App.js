import data from './data.json';
import React, { Component } from 'react';
import Products from './components/Products';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: '',
      sort: '',
    };
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href={'#'}>React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Carts</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
