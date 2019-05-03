import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment'
import CreditCardInput from 'react-credit-card-input';

import {
  Button,
  Input,
  Selector,
  Table,
  FormModal,
} from '../../common'

import styles from './CheckoutForm.css'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      totalPay: 0,
      totalPayUpdated: false
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/search?patientId=' + this.props.patientId + '&exactStatus=Schedule', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp)
        this.setState({
          scripts: resp.data.response,
          patientName: resp.data.response[0].Patient.firstName + " " + resp.data.response[0].Patient.lastName
        }, this.calcTotalPay)
      }).catch((err) => {
        console.error(err)
      })

    this.setState({
      transactionId: Math.floor(Math.random() * 90000000) + 10000000
    })

  }

  calcTotalPay() {
    const totalPay = [];
    for (var i = 0; i < this.state.scripts.length; i++) {
      totalPay.push(this.state.scripts[i].patientPay)
    }
    var sum = totalPay.reduce(add, 0);

    function add(a, b) {
      return a + +b;
    }

    this.setState({
      totalPay: sum,
      patientPay: totalPay
    })
  }



  async submit(ev) {
    console.log(this.state.totalPay)
    ev.preventDefault();
    if (window.confirm(`This will charge an amount of $${this.state.totalPay.toFixed(2)} to the card that has been entered. Proceed?\n\n
    Testing Mode (Feel free to click CHARGE)`)) {

      const payments = this.state.scripts;
      const totalPay = this.state.totalPay;
      const firstName = this.props.state.patientName.split(' ').slice(0, -1).join(' ');
      const lastName = this.props.state.patientName.split(' ').slice(-1).join(' ');
      const date = moment().format('MM-DD-YYYY')
      // const transactionId = this.state.transactionId

      for (var i = 0; i < this.state.scripts.length; i++) {
        const loginToken = window.localStorage.getItem("token");
        // let token = await this.props.stripe.createToken({ name: "Name" });
        // console.log(token);
        let data = new FormData();
        axios.post('/api/scripts/payments/charge?amount=' + this.state.scripts[i].patientPay + '&scriptId=' + this.state.scripts[i].id
          + '&receiptLink=' + `${lastName}_${firstName}/${date}/Receipt.pdf` + '&number=' + this.state.number + '&expiry=' + this.state.expiry + '&cvc=' + this.state.cvc
          + '&customerId=' + this.state.PatientId + '&firstName=' + firstName + '&lastName=' + lastName + '&address=' + this.state.patientAddressStreet + '&city=' + this.state.patientAddressCity +
          '&state=' + this.state.patientAddressState + '&zipCode=' + this.state.patientAddressZipCode + '&phone=' + this.state.patientPhone, data, { headers: { "Authorization": "Bearer " + loginToken, "Content-Type": "application/json" }, })
          .then((res) => {
            console.log(res)
            const { transactionId } = res.data
            this.props.onSubmit(payments, totalPay, transactionId);
          }).catch((error) => {
            window.alert("Payment Failed")
            console.error(error);
            return;
          })

      }
    } else {
      return;
    }
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>RX NUMBER</th>
          <th>PROCESS ON</th>
          <th>MEDICATION</th>
          <th>AMOUNT</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.scripts.map(this.renderTableRow.bind(this))}
        {this.renderTotalPayRow()}
      </tbody>
    )
  }

  renderTotalPayRow() {
    return (
      <tr style={{ textAlign: 'right' }}>
        <td colspan="4">Total Pay: <b>{this.state.totalPay ? <span>${this.state.totalPay.toFixed(2)}</span> : <b>Input needed</b>}</b></td>
      </tr>
    )
  }

  updateTotalPay(i, event) {
    this.state.patientPay.splice(i, 1, event.target.value);
    this.setState({
      totalPayUpdated: true
    })
  }

  handleCardInfoChange = e => {
    console.log(e.target, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })

  }


  renderTableRow(script) {
    const i = this.state.scripts.indexOf(script);
    let test = "";
    if (this.state.patientPay) test = this.state.patientPay[i]
    return (
      <tr value={script.id}>

        <td>{script.rxNumber}</td>
        <td><Moment format="MM/DD/YYYY">{script.processedOn || 'None'}</Moment></td>
        <td>{script.Product.name}</td>
        <td>
          {script.patientPay ?
            <input
              placeholder={script.patientPay}
              value={test}
              index={i}
              style={{ width: 'auto' }}
              onChange={this.updateTotalPay.bind(this, i)}
            />
            :
            <b>Input needed</b>
          }
        </td>
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

    console.log(this.props, this.state)

    if (this.state.totalPayUpdated === true) {
      const totalPay = [];
      for (var i = 0; i < this.state.patientPay.length; i++) {
        totalPay.push(this.state.patientPay[i])
      }
      var sum = totalPay.reduce(add, 0);

      function add(a, b) {
        return a + +b;
      }

      this.setState({
        totalPay: sum,
        totalPayUpdated: false
      })
    }


    if (this.state.scripts) {

      var scriptList = this.state.scripts.sort(function (a, b) {
        return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
      });


      var scriptList = this.state.scripts.map(function (item, i) {

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
    const {
      content,
      onClickAway,
    } = this.props

    const claimOptions = [
      '-',
      'Patient'
    ]

    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <FormModal
        title="Charge Credit Card"
        onClickAway={onClickAway}
        visible={!!content}
        className="checkoutForm"
      ><br />
        <div className="checkout">
          <CreditCardInput
            cardNumberInputProps={{ name: 'number', onChange: this.handleCardInfoChange }}
            cardExpiryInputProps={{ name: 'expiry', onChange: this.handleCardInfoChange }}
            cardCVCInputProps={{ name: 'cvc', onChange: this.handleCardInfoChange }}
            fieldClassName="input"
            style={{ display: 'initial !important' }}
          />

          <label>Claim</label>
          <Selector
            options={claimOptions}
            value={this.state.claim}
            onSelect={claim => this.setState({ claim })}
          />

          {this.renderTable()}
          {scriptList}
          <br />
          <div className="buttons">
            <Button
              large
              cancel
              type="button"
              title="Cancel"
              onClick={onClickAway}
            />
            <Button
              large
              type="submit"
              onClick={this.submit}
              title="Charge"
            />
          </div>
          <br /><br />

        </div>
      </FormModal>
    );
  }
}

export default injectStripe(CheckoutForm);