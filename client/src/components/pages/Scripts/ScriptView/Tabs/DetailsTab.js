import React, { Component } from 'react';
import axios from 'axios'
import Moment from 'react-moment'

// Components
import {
  Header,
  Body,
  Link,
  Selector,
  Span,
  TextArea
} from '../../../../common'



class DetailsTab extends Component {
  constructor(props) {
    super(props)
    this.state = { refills: 0 }
  }
  state = {
    script: ''
  }


  componentDidMount() {
    let scriptNum = this.props.sID.match.params.scriptId;
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/search?scriptId=' + scriptNum, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        let script = resp.data.response[0];
        this.setState({
          id: script.id,
          processedOn: script.processedOn,
          status: script.status,
          writtenDate: script.writtenDate,
          patientId: script.PatientId,
          patientName: script.Patient.firstName + " " + script.Patient.lastName,
          patientDob: script.Patient.dob,
          patientPhone: script.Patient.phone,
          patientEmail: script.Patient.email,
          primInsPlan: script.Patient.primInsPlan, primInsBIN: script.Patient.primInsBIN, primInsGroup: script.Patient.primInsGroup, primInsID: script.Patient.primInsID, primInsPCN: script.Patient.primInsPCN, primInsType: script.Patient.primInsType,
          secInsPlan: script.Patient.secInsPlan, secInsBIN: script.Patient.secInsBIN, secInsGroup: script.Patient.secInsGroup, secInsID: script.Patient.secInsID, secInsPCN: script.Patient.secInsPCN, secInsType: script.Patient.secInsType,
          conditions: script.Patient.conditions,
          allergies: script.Patient.allergies,
          patientWarning: script.Patient.patientWarning,
          physicianId: script.PhysicianId,
          physicianName: script.Physician.firstName + " " + script.Physician.lastName,
          physicianContact: script.Physician.contact,
          physicianPhone: script.Physician.phone,
          physicianRep: script.Physician.rep,
          physicianWarning: script.Physician.physicianWarning,
          productName: script.Product.name,
          productNDC: script.Product.NDC,
          productQuantity: script.Product.quantity,
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
          networkPay: script.networkPay,
          patientPay: script.patientPay,
          directions: script.directions,
          shipOn: script.shipOn,
          deliveryMethod: script.deliveryMethod,
          trackNum: script.trackNum,
          ETA: script.ETA,
          paymentOption: script.paymentOption
        }, () => console.log(this.state.status))

      }).catch((err) => {
        console.error(err)
      })

  }

  setEditState(editing) {
    this.setState({ ...this.initialState, editing })
  }

  save() {
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.put('/api/scripts/update?id=' + this.state.id + '&processedOn=' + this.state.processedOn + '&writtenDate=' + this.state.writtenDate
      + '&billOnDate=' + this.state.billOnDate + '&rxNumber=' + this.state.rxNumber + '&diagnosis=' + this.state.diagnosis + '&secDiagnosis=' + this.state.secDiagnosis
      + '&refills=' + this.state.refills + '&refillsRemaining=' + this.state.refillsRemaining + '&quantity=' + this.state.quantity + '&daysSupply=' + this.state.daysSupply
      + '&salesCode=' + this.state.salesCode + '&cost=' + this.state.cost + '&primInsPay=' + this.state.primInsPay + '&secInsPay=' + this.state.secInsPay
      + '&copayApproval=' + this.state.copayApproval + '&copayNetwork=' + this.state.copayNetwork + '&patientPay=' + this.state.patientPay + '&status=' + this.state.status,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);
        window.location.reload();
      }).catch((error) => {
        console.error(error);
      })
  }

  render() {

    const statusOptions = [
      'No Status',
      'Received',
      'Review',
      'Prior Auth',
      'Process',
      'Copay Assistance',
      'Schedule',
      'QA',
      'Fill',
      'Shipped',
      'Done',
      'Cancelled',
      'Refill'
    ]

    const copayApprovalOptions = [
      'Approved',
      'Denied'
    ]

    const copayNetworkOptions = [
      'Cancer Care Foundation',
      'Chronice Disease Fund',
      'Health Well',
      'LLS',
      'Patient Access Network',
      'Patient Advocate',
      'Patient Service Inc',
      'Safety Net Foundation',
      'Good Days',
      'Coupon',
      'Voucher',
      'Copay Card'
    ]


    const {
      editing
    } = this.state

    if (this.state.conditions) {
      var conditions = this.state.conditions.split(",").join("\n")
    }

    if (this.state.allergies) {
      var allergies = this.state.allergies.split(",").join("\n")
    }

    return (
      <div>
        <Header>
        </Header>
        <Body id="scriptView">
          <div id="scriptViewColumns">
            <div className="scriptViewColumn1">
              <table>
                {/* <table className={styles.scriptView}> */}
                <tbody>
                  <tr style={{ 'line-height': '1.8em' }}>
                    <td className="field">Processed On</td>
                    <td className="value">
                      <Moment format="MM/DD/YYYY">{this.state.processedOn || 'None'}</Moment>
                    </td>
                    <td className="field">Written Date</td>
                    <td className="value">
                      <Moment stye={{ 'line-height': '1.8em' }} format="MM/DD/YYYY">{this.state.writtenDate || 'None'}</Moment>
                    </td>
                  </tr>
                  <tr style={{ 'line-height': '1.8em' }}>
                    <td className="field">Patient Name</td>
                    <td className="setValue">
                      <Link to={'../patients/' + this.state.patientId} activeClassName="active">
                        {this.state.patientName}
                      </Link>
                    </td>
                    <td className="field">Bill On</td>
                    <td className="value">
                      <Moment format="MM/DD/YYYY">{this.state.billOnDate || 'None'}</Moment>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Date of Birth</td>
                    <td className="value"><Moment format="MM/DD/YYYY">{this.state.patientDob}</Moment></td>
                    <td className="field">RX Number</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.rxNumber}
                        value={this.state.rxNumber}
                        onChange={rxNumber => this.setState({ rxNumber })}
                      >
                        {this.state.rxNumber}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Phone</td>
                    <td className="value">{this.state.patientPhone}</td>
                    <td className="field">Diagnosis</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.diagnosis}
                        value={this.state.diagnosis}
                        onChange={diagnosis => this.setState({ diagnosis })}
                      >
                        {this.state.diagnosis}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Email</td>
                    <td className="value">{this.state.patientEmail}</td>
                    <td className="field">Secondary Diagnosis</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.secDiagnosis}
                        value={this.state.secDiagnosis}
                        onChange={secDiagnosis => this.setState({ secDiagnosis })}
                      >
                        {this.state.secDiagnosis}
                      </Span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td className="field">Physician</td>
                    <td className="setValue">
                      <Link to={'../physicians/' + this.state.physicianId} activeClassName="active">
                        {this.state.physicianName}
                      </Link></td>
                    <td className="field">Refill #</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.refills}
                        value={this.state.refills}
                        onChange={refills => this.setState({ refills })}

                      >
                        {this.state.refills}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Contact</td>
                    <td className="value">{this.state.physicianContact}</td>
                    <td className="field">Refills Remaining</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.refillsRemaining}
                        value={this.state.refillsRemaining}
                        onChange={refillsRemaining => this.setState({ refillsRemaining })}
                      >
                        {this.state.refillsRemaining}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Phone</td>
                    <td className="value">{this.state.physicianPhone}</td>
                    <td className="field">Quantity</td>
                    <td className="value">
                      <Span
                        editing={editing}
                        placeholder={this.state.quantity}
                        value={this.state.quantity}
                        onChange={quantity => this.setState({ quantity })}
                      >
                        {this.state.quantity}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Rep</td>
                    <td className="value">{this.state.physicianRep}</td>
                    <td className="field">Days Supply</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.daysSupply}
                        value={this.state.daysSupply}
                        onChange={daysSupply => this.setState({ daysSupply })}
                      >
                        {this.state.daysSupply}
                      </Span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td className="field">Medicine</td>
                    <td className='value'>{this.state.productName}</td>
                    <td className="field">Sales Code</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.salesCode}
                        value={this.state.salesCode}
                        onChange={salesCode => this.setState({ salesCode })}
                      >
                        {this.state.salesCode}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">NDC</td>
                    <td className='value'>{this.state.productNDC}</td>
                    <td className="field">Cost</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.cost}
                        value={this.state.cost}
                        onChange={cost => this.setState({ cost })}
                      >
                        {this.state.cost}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">On Hand</td>
                    <td className='value'>{this.state.productQuantity}</td>
                    <td className="field">Primary Insurance Pay</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.primInsPay}
                        value={this.state.primInsPay}
                        onChange={primInsPay => this.setState({ primInsPay })}
                      >
                        {this.state.primInsPay}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Prior Authorization</td>
                    <td className='value'></td>
                    <td className="field">Secondary Insurance Pay</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.secInsPay}
                        value={this.state.secInsPay}
                        onChange={secInsPay => this.setState({ secInsPay })}
                      >
                        {this.state.secInsPay}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Location</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.location}
                        value={this.state.location}
                        onChange={location => this.setState({ location })}
                      >
                        {this.state.location}
                      </Span>
                    </td>
                    <td className="field">Copay Assistance Status</td>
                    <td className='value'>
                      {editing ? (
                        <Selector
                          placeholder={this.state.copayApproval}
                          value={this.state.copayApproval}
                          options={copayApprovalOptions}
                          onSelect={copayApproval => this.setState({ copayApproval })}
                        />
                      ) : (
                          <Span>
                            {this.state.copayApproval}
                          </Span>
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Ship On</td>
                    <td className='value'><Moment format="MM/DD/YYYY">{this.state.shipOn}</Moment></td>
                    <td className="field">Copay Assistance Network</td>
                    <td className='value'>
                      {editing ? (
                        <Selector
                          placeholder={this.state.copayNetwork}
                          value={this.state.copayNetwork}
                          options={copayNetworkOptions}
                          onSelect={copayNetwork => this.setState({ copayNetwork })}
                        />
                      ) : (
                          <Span>
                            {this.state.copayNetwork}
                          </Span>
                        )}
                    </td>
                  </tr>
                  <tr>
                    <td className="field">Delivery Method</td>
                    <td className='value'>{this.state.deliveryMethod}</td>
                    <td className="field">Copay Assistance Amount</td>
                    <td className='value'>{this.state.networkPay}</td>
                  </tr>
                  <tr>
                    <td className="field">Tracking Number</td>
                    <td className='value'>{this.state.trackNum}</td>
                    <td className="field">Patient Pay</td>
                    <td className='value'>
                      <Span
                        editing={editing}
                        placeholder={this.state.patientPay}
                        value={this.state.patientPay}
                        onChange={patientPay => this.setState({ patientPay })}
                      >
                        {this.state.patientPay}
                      </Span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field">ETA</td>
                    <td className='value'><Moment format="MM/DD/YYYY">{this.state.ETA}</Moment></td>
                    <td className="field">Payment Option</td>
                    <td className='value'>{this.state.paymentOption}</td>
                  </tr>
                  <tr>
                    <td className="field">Status</td>
                    <td className='value'>
                      {editing ? (
                        <Selector
                          placeholder={this.state.status}
                          value={this.state.status}
                          options={statusOptions}
                          onSelect={status => this.setState({ status })}
                        />
                      ) : (
                          <Span>
                            {this.state.status}
                          </Span>
                        )}
                    </td>
                    <td className="field">Total Pay</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="field">Instructions</td>
                    <td className='value'>{this.state.directions}</td>
                    <td className="field">Profit</td>
                    <td className='value'></td>
                  </tr>
                  <tr>
                    <td className="field"></td>
                    <td className='value'></td>
                    <td className="field">Margin</td>
                    <td className='value'></td>
                  </tr>
                </tbody>
              </table>

              <table>
                <tbody>
                  <tr>
                    <td className="field" style={{ 'vertical-align': 'top' }}>Primary Insurance</td>
                    <td className='value'>
                      Plan: {this.state.primInsPlan}<br />
                      BIN: {this.state.primInsBIN}<br />
                      Group: {this.state.primInsGroup}<br />
                      ID: {this.state.primInsID}<br />
                      PCN: {this.state.primInsPCN}<br />
                      Type: {this.state.primInsType}</td>
                    <td className="field" style={{ 'vertical-align': 'top' }}>Secondary Insurance</td>
                    <td className="value">Plan: {this.state.secInsPlan}<br />
                      BIN: {this.state.secInsBIN}<br />
                      Group: {this.state.secInsGroup}<br />
                      ID: {this.state.secInsID}<br />
                      PCN: {this.state.secInsPCN}<br />
                      Type: {this.state.secInsType}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="scriptViewColumn2">

              <table>
                <tr>
                  <td>
                    <Span
                      label="Co-morbid conditions"
                    >
                      <TextArea
                        disabled
                        id='symptoms'
                        placeholder={conditions}
                      />
                    </Span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Span
                      label="Allergies"
                    >
                      <TextArea
                        disabled
                        id='symptoms'
                        placeholder={allergies}
                      /></Span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label style={{ fontSize: 14 }}>
                      Patient Warning
                    </label>
                    <div id="patientWarning">
                      <Span>
                        {this.state.patientWarning || 'None'}
                      </Span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label style={{ fontSize: 14 }}>
                      Physician Warning
                    </label>
                    <div id="physicianWarning">
                      <Span>
                        {this.state.physicianWarning || 'None'}
                      </Span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>

        </Body>
      </div >
    )
  }
}

export default DetailsTab;
