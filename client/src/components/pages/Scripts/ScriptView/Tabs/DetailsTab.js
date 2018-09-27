import React, { Component } from 'react';
import axios from 'axios'

// Components
import {
  Header,
  Body,
  Form,
  Span,
} from '../../../../common'

class DetailsTab extends Component {
  state = {
    script: ''
}
  /* componentDidMount() {
    if (this.props.match.params.scriptId) {
      const loginToken = window.localStorage.getItem("token");
        axios.get('/api/scripts/search?scriptId=' + this.props.match.params.scriptId, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
          let script = resp.data.response[0];
            this.setState({
                status: script.status,
                writtenDate: script.writtenDate,
                patient: script.patient,
                billOnDate: script.billOnDate,
                rxNumber: script.rxNumber,
                phone: script.phone,
                diagnosis: script.diagnosis,
                email: script.email,
                secDiagnosis: script.secDiagnosis,
                refills: script.refills,
                refillsRemaining: script.refillsRemaining,
                quantity: script.quantity,
                daysSupply: script.daysSupply,
                salesCode: script.salesCode,
                cost: script.cost,
                primInsPay: script.primInsPay,
                secInsPay: script.secInsPay,
                location: script.location,
                copayApproval: script.copayApproval,
                copayNetwork: script.copayNetwork,
                patientPay: script.patientPay,
                directions: script.directions
            }, () => console.log(this.state.status))

        }).catch((err) => {
            console.error(err)
        })
    }
} */

  render() {
    return(
      <div>
        <Header>
          <h2>Status: {this.state.status}</h2>
        </Header>
        <Body id="scriptView">
        {/* <Body className={styles.body} id="scriptView"> */}

          <table>
          {/* <table className={styles.scriptView}> */}
            <tbody>
              <tr>
                <td className="field">Processed On</td>
                <td className="value"></td>
                <td className="field">Written Date</td>
                <td className="value">{this.state.writtenDate}</td>
              </tr>
              <tr>
                <td className="field">Patient Name</td>
                <td className="value">{this.state.patient}</td>
                <td className="field">Bill On</td>
                <td className="value">{this.state.billOnDate}</td>
              </tr>
              <tr>
                <td className="field">Date of Birth</td>
                <td className="value"></td>
                <td className="field">RX Number</td>
                <td className="value">{this.state.rxNumber}</td>
              </tr>
              <tr>
                <td className="field">Phone</td>
                <td className="value">{this.state.phone}</td>
                <td className="field">Diagnosis</td>
                <td className="value">{this.state.diagnosis}</td>
              </tr>
              <tr>
                <td className="field">Email</td>
                <td className="value">{this.state.email}</td>
                <td className="field">Secondary Diagnosis</td>
                <td className="value">{this.state.secDiagnosis}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td className="field">Physician</td>
                <td className="value"></td>
                <td className="field">Refill #</td>
                <td className="value">{this.state.refills}</td>
              </tr>
              <tr>
                <td className="field">Contact</td>
                <td className="value"></td>
                <td className="field">Refills Remaining</td>
                <td className="value">{this.state.refillsRemaining}</td>
              </tr>
              <tr>
                <td className="field">Phone</td>
                <td className="value"></td>
                <td className="field">Quantity</td>
                <td className="value">{this.state.quantity}</td>
              </tr>
              <tr>
                <td className="field">Rep</td>
                <td className="value"></td>
                <td className="field">Days Supply</td>
                <td>{this.state.daysSupply}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td className="field">Medicine</td>
                <td></td>
                <td className="field">Sales Code</td>
                <td>{this.state.salesCode}</td>
              </tr>
              <tr>
                <td className="field">NDC</td>
                <td></td>
                <td className="field">Cost</td>
                <td>{this.state.cost}</td>
              </tr>
              <tr>
                <td className="field">On Hand</td>
                <td></td>
                <td className="field">Primary Insurance Pay</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Prior Authorization</td>
                <td></td>
                <td className="field">Secondary Insurance Pay</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Location</td>
                <td>{this.state.location}</td>
                <td className="field">Copay Assistance Status</td>
                <td>{this.state.copayApproval}</td>
              </tr>
              <tr>
                <td className="field">Ship On</td>
                <td></td>
                <td className="field">Copay Assistance Network</td>
                <td>{this.state.copayNetwork}</td>
              </tr>
              <tr>
                <td className="field">Delivery Method</td>
                <td></td>
                <td className="field">Copay Assistance Amount</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Tracking Number</td>
                <td></td>
                <td className="field">Patient Pay</td>
                <td>{this.state.patientPay}</td>
              </tr>
              <tr>
                <td className="field">ETA</td>
                <td></td>
                <td className="field">Payment Option</td>
                <td></td>              
              </tr>
              <tr>
                <td className="field">Status</td>
                <td>{this.state.status}</td>
                <td className="field">Total Pay</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Primary Insurance</td>
                <td></td>
                <td className="field">Profile</td>
                <td></td>
              </tr>
              <tr>
                <td className="field"></td>
                <td></td>
                <td className="field">Margin</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Instructions</td>
                <td>{this.state.directions}</td>
                <td className="field">Secondary Insurance</td>
                <td className="value"></td>
              </tr>
            </tbody>
          </table>

        </Body>
      </div>
    )
  }
}

export default DetailsTab;
