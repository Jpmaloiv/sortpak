
import React, { Component } from 'react';

import axios from 'axios'
import { TablePagination } from 'react-pagination-table';

import {
  // Span,
  Table,
  Header,
  ActionBox,
  Button,
  SearchBar,
} from '../../../common'


import styles from './ProductsView.css'

const th = ['NAME','NDC','SCHEDULE','PACKAGE SIZE','QUANTITY','COST','VALUE']

class ProductsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: ''
    }
  }

  

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/products/search/', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);

        this.setState({
          products: resp.data.response
        })

      }).catch((err) => {
        console.error(err)
      })
  }




  // renderTableHead() {
  //   return (
  //     <thead>
  //       <tr>
  //         <th>
  //           NAME
  //         </th>
  //         <th>
  //           NDC
  //         </th>
  //         <th>
  //           SCHEDULE
  //         </th>
  //         <th>
  //           PACKAGE SIZE
  //         </th>
  //         <th>
  //           QUANTITY
  //         </th>
  //         <th>
  //           COST
  //         </th>
  //         <th>
  //           VALUE
  //         </th>
  //         <th/>
  //       </tr>
  //     </thead>
  //   )
  // }

  // renderTableBody() {

  //   return (
  //     <tbody>
  //       {this.state.products.map(this.renderTableRow.bind(this))}
  //     </tbody>
  //   )
  // }

  // renderTableRow(product) {
  //   return (
  //     <tr>
  //       <td>
  //         {product.name}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT NDC
  //         */}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT SCHEDULE
  //         */}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT PACKAGE SIZE
  //         */}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT QUANTITY
  //         */}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT COST
  //         */}
  //       </td>

  //       <td>
  //         {/*
  //           TODO: RENDER PRODUCT VALUE
  //         */}
  //       </td>

  //       {/*
  //         TODO: Edit button for product
  //       <td>

  //         <Button
  //           title="edit"
  //           styes={{ backgroundColor:"orange" }}
  //         />

  //       </td>
  //       */}

  //     </tr>
  //   )
  // }

  // renderTable() {
  //   return (
  //     <Table>
  //       {this.renderTableHead()}
  //       {this.renderTableBody()}
  //     </Table>
  //   )
  // }

  render() {

    if (this.state.products) {
      // const self = this;

      var productList = this.state.products.map(function (item, i) {
        return (
          <div key={i}>

          </div>
        )

      })
    }
    else {
      return <div>
        <p></p>
      </div>
    }

    return (
      <div className={styles.app}>

        <Header>

          <h2>
            Products
          </h2>

          <div className="action">

            <Button
              icon="plus"
              title="ADD A NEW PRODUCT"
              style={{ marginRight: 14 }}
            />

        </div>

        </Header>
        <div className="body">

          <ActionBox>
            <div className="main">

              <SearchBar
                label="Search"
                placeholder="Product name..."
              />
              <Button
                search
                icon="search"
                title="SEARCH"
              />

            </div>

          </ActionBox>

          <TablePagination
            headers={ th }
            data={this.state.products }
            columns="name.NDC.schedule.packageSize.quantity.cost.value"
            perPageItemCount={ 10 }
            totalCount={ this.state.products.length }
            // arrayOption={ [["size", 'all', ' ']] }
        />

          {/* {this.renderTable()} */}
          {productList}

        </div>

      </div>
    );
  }
}

export default ProductsView;
