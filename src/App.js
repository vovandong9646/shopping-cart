import data from './data.json';
import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: '',
      sort: '',
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
    console.log(sort);
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
