import React, { Component } from 'react';
// import { connect } from 'react-redux'

// import { hasAuthTokenAsync } from '../../../../lib'

import {
  // Span,
  Table,
  Header,
  ActionBox,
  Button,
  SearchBar,
} from '../../../common'

// import {
//   getPatients,
//   filterPatientsByName,
//   filterPatientsByDob,
// } from '../../../../actions/main'

// import {
//   setPatient,
// } from '../../../../actions/patients'

import styles from './ProductsView.scss'

class ProductsView extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     name: '',
  //     dob: '',
  //     address: '',
  //     phone: ''
  //   }
  // }

  /* componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        
          TODO: GET AVAILABLE PRODUCTS FROM DB
          this.props.getPatients()
        
      })
      .catch(console.log)
  } */


  //   TODO: ADD SEARCH FOR PRODUCTS
  // searchByName(name) {
  //   const dob = ''
  //   this.setState({ name, dob })
  //   this.props.filterPatientsByName(name)
  // }
  //
  //
  // searchByDob(dob) {
  //   const name = ''
  //   this.setState({ name, dob })
  //   this.props.filterPatientsByDob(dob)
  // }


  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            NAME
          </th>
          <th>
            NDC
          </th>
          <th>
            SCHEDULE
          </th>
          <th>
            PACKAGE SIZE
          </th>
          <th>
            QUANTITY
          </th>
          <th>
            COST
          </th>
          <th>
            VALUE
          </th>
          <th/>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    // const { products } = this.props
    return (
      <tbody>
        {/*
          TODO: RENDER PRODUCTS FROM DB
        {patients.map(this.renderTableRow.bind(this))}
        */}
      </tbody>
    )
  }

  renderTableRow(patient) {
    return (
      <tr>
        <td>
          {/*
            TODO: RENDER PRODUCT NAME
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT NDC
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT SCHEDULE
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT PACKAGE SIZE
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT QUANTITY
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT COST
          */}
        </td>

        <td>
          {/*
            TODO: RENDER PRODUCT VALUE
          */}
        </td>

        {/*
          TODO: Edit button for product
        <td>

          <Button
            title="edit"
            styes={{ backgroundColor:"orange" }}
          />

        </td>
        */}

      </tr>
    )
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  render() {

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

          {this.renderTable()}

        </div>

      </div>
    );
  }
}

export default ProductsView;
