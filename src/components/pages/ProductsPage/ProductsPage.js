import React, { Component } from 'react';
import Router from './ProductsPage.Router'

import styles from './ProductsPage.scss'

class ProductsPage extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Router />
        <p>Test</p>
      </div>
    );
  }
}

export default ProductsPage;
