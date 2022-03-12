import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from './../actions/ProductAction';

class Filter extends Component {
  render() {
    return (
      <>
        {!this.props.filteredItems ? (
          <p>loading...</p>
        ) : (
          <div className="filter">
            <div className="filter-result">{this.props.filteredItems.length} Products</div>
            <div className="filter-sort">
              Order{' '}
              <select
                name=""
                id=""
                value={this.props.sort}
                onChange={(e) => this.props.sortProducts(this.props.filteredItems, e.target.value)}
              >
                <option value="">Lastest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
            <div className="filter-size">
              Filter{' '}
              <select
                name=""
                id=""
                value={this.props.size}
                onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}
              >
                <option value="">ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredItems: state.products.filteredItems,
  }),
  { filterProducts, sortProducts },
)(Filter);
