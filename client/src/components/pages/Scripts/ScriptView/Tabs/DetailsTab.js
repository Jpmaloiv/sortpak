import React, { Component } from 'react';
import axios from 'axios'

// Components
import {
  Header,
  Body,
  Icon,
  Button,
  Selector,
  Span
} from '../../../../common'



class DetailsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {refills: 0}
  
      // this.handleClick = this.handleClick.bind(this);
  }
  state = {
    script: ''
}

/* handleClick = () => {
  this.setState({refills: this.state.refills += 1}, () => {
      console.log(this.state.refills);
  });
} */
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

    // const  patient  = this.props;

    /* const {
      nameDisplay 
    } = patient */

    return(
      <div>
        <Header>
        <h2>
            {/* {nameDisplay} */}
            {!editing ? (
              <div>
                <Button
                  search
                  icon="edit"
                  title="EDIT SCRIPT"
                  onClick={() => this.setEditState(true)}
                />
              </div>
            ) : (
              <div>
                <Icon
                  cancel
                  onClick={() => this.setEditState(false)}
                />
                <Icon
                  save
                  onClick={() => this.save()}
                />
              </div>
            )}
          </h2>
        </Header>
        <Body id="scriptView">
        {/* <Body className={styles.body} id="scriptView"> */}

          <table>
          {/* <table className={styles.scriptView}> */}
            <tbody>
              <tr>
                <td className="field">Processed On</td>
                <td className="value">
                  <Span
                    editing={editing}
                    type="date"
                    value={this.state.proessedOn}
                    onChange={processedOn => this.setState({ processedOn })}
                  >
                    {this.state.processedOn}
                  </Span>
                </td>
                <td className="field">Written Date</td>
                <td className="value">
                  <Span
                    editing={editing}
                    type="date"
                    value={this.state.writtenDate}
                    onChange={writtenDate => this.setState({ writtenDate})}
                  >
                    {this.state.writtenDate}
                  </Span>
                </td>
              </tr>
              <tr>
                <td className="field">Patient Name</td>
                <td className="setValue">{this.state.patient}</td>
                <td className="field">Bill On</td>
                <td className="value">
                <Span
                    editing={editing}
                    type="date"
                    value={this.state.billOnDate}
                    onChange={billOnDate => this.setState({ billOnDate })}
                  >
                    {this.state.billOnDate}
                  </Span>
                </td>
              </tr>
              <tr>
                <td className="field">Date of Birth</td>
                <td className="value">{this.state.dob}</td>                
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
                <td className="value">{this.state.phone}</td>
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
                <td className="value">{this.state.email}</td>
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
                <td className="value"></td>
                <td className="field">Refill #</td>
                <td className="value">
                 {/*  <Button
                    className="plus"
                    icon="plus"
                    editing={editing}
                    value={this.state.refills}
                    onClick={this.handleClick}
                  /> */}
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
                <td className="value"></td>
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
                <td className="value"></td>
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
                <td className="value"></td>
                <td className="field">Days Supply</td>
                <td>
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
                <td></td>
                <td className="field">Sales Code</td>
                <td>
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
                <td></td>
                <td className="field">Cost</td>
                <td>
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
                <td></td>
                <td className="field">Primary Insurance Pay</td>
                <td>
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
                <td></td>
                <td className="field">Secondary Insurance Pay</td>
                <td>
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
                <td>
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
                <td>
                  { editing ? (
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
                <td></td>
                <td className="field">Copay Assistance Network</td>
                <td>
                { editing ? (
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
                <td></td>
                <td className="field">Copay Assistance Amount</td>
                <td></td>
              </tr>
              <tr>
                <td className="field">Tracking Number</td>
                <td></td>
                <td className="field">Patient Pay</td>
                <td>
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
                <td></td>
                <td className="field">Payment Option</td>
                <td></td>              
              </tr>
              <tr>
                <td className="field">Status</td>
                <td>
                { editing ? (
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
