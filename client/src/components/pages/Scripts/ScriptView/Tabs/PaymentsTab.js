import React, { Component } from 'react';
import axios from 'axios'
import Moment from 'react-moment'

// Components
import {
  Header,
  Table
} from '../../../../common'


class PaymentsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: []
    }
  }

  componentWillMount() {
    console.log(this.props, this.state)
    const loginToken = window.localStorage.getItem("token");

    axios.get('../api/scripts/payments/search?scriptId=' + this.props.props.match.params.scriptId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp.data.response)
        this.setState({
          payments: resp.data.response,
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>PATIENT NAME</th>
          <th>MEDICATION</th>
          <th>AMOUNT</th>
          <th>PAYMENT PROCESSED ON</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.payments.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(payment) {
    return (
      // <tr value={script.id} onClick={() => this.handleClick(script.id)}>
      <tr>
        <td>{this.props.state.patientName}</td>
        <td>{this.props.state.productName}</td>
        <td>${payment.amount}</td>
        <td><Moment format="MM/DD/YYYY">{payment.createdAt}</Moment></td>
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
    if (this.state.payments) {

      var paymentList = this.state.payments.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      });

      var paymentList = this.state.payments.map(function (item, i) {

        return (
          <div key={i}>
          </div>
        )
      })
    }

    return (
      <div>
        <Header>
          <h2>
           Payments
          </h2>
        </Header>

        {this.renderTable()}
        {paymentList}
      </div>

    )
  }
}

export default PaymentsTab;
