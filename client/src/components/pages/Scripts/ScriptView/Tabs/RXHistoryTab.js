import React, { Component } from 'react';
import axios from 'axios'
import Moment from 'react-moment'

// Components
import {
  Span, Table, Input
} from '../../../../common'


class RXHistoryTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: ''
    }
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/search?patientId=' + this.props.state.patientId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        let script = resp.data.response[0]
        this.setState({
          scripts: resp.data.response,
          name: script.Patient.firstName + ' ' + script.Patient.lastName,
          id: script.Patient.id,
          dob: script.Patient.dob,
          sex: script.Patient.sex,
          patientSince: script.Patient.createdAt,
          phone: script.Patient.phone,
          addressStreet: script.Patient.addressStreet,
          addressCity: script.Patient.addressCity,
          addressState: script.Patient.addressState,
          addressZipCode: script.Patient.addressZipCode,
          email: script.Patient.email
        })
      }).catch((err) => {
        console.error(err)
      })
  }

  copyAttachments() {
    if (window.confirm('Select which script(s) you would like to copy the attachments to.')) {
      return;
    } else {
      window.location.reload();
    }
  }

  renderPatientInfo() {
    const {
      editing,
      firstName,
      lastName,
      dob
    } = this.state


    return (
      <div>
        <div className="flex-grid">
          <div id="contactInfo">
            {editing ? (
              <div className="name">
                Name:
                {this.state.name}
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={firstName => this.setState({ firstName })}
                />
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={lastName => this.setState({ lastName })}
                />
              </div>
            ) : (
                <div>
                  Name: {this.state.name}
                </div>
              )}

            <div>
              Patient ID: #{this.state.id}
            </div>

            <div>
              Date of Birth:&nbsp;
              <Moment format="MM/DD/YYYY">{this.state.dob}</Moment>
            </div>
            <div>
              Sex: {this.state.sex}
            </div>
            <div>
              Patient Since: &nbsp;<Moment format={"MM/DD/YYYY"}>{this.state.createdAt}</Moment>
            </div>
          </div>

          <div id="contactInfo">
            <div>
              <Span style={{ marginLeft: 0 }} icon="phone">
                {this.state.phone}
              </Span>
            </div>
            <div>
              <Span icon="building" style={{ 'line-height': '25px', marginLeft: 0 }}>
                {this.state.addressStreet},<br />{this.state.addressCity}, {this.state.addressState}, {this.state.addressZipCode}
              </Span>
            </div>
            <div>
              <Span style={{ marginLeft: 0 }} className="blue" icon="envelope">
                {this.state.email}
              </Span>
            </div>
          </div>
        </div>
      </div>

    )
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            BILL ON
                </th>
          <th>
            MEDICATION
                </th>
          <th>PHYSICIAN</th>
          <th>
            SHIP ON
                </th>
          <th>
            STATUS
                </th>
          <th>PROCESS ON</th>
          {/* <th>THERAPY END</th> */}
          <th>REFILL #</th>
          <th>REMAINING</th>
          <th>PATIENT PAY</th>
          <th>QUANTITY</th>
          <th>RX NUMBER</th>
          <th>POUCH</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {

    return (
      <tbody>
        {this.state.scripts.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location = `/scripts/${value}`
  }

  renderTableRow(script) {

    return (
      <tr value={script.id} onClick={() => this.handleClick(script.id)}>
        <td>
          <Span icon="calendar">
            {script.billOnDate ?
              <Moment format="MM/DD/YYYY">{script.billOnDate}</Moment>
              :
              <span></span>
            }
          </Span>
        </td>

        <td>
          {script.Product.name}
        </td>
        <td>{script.Physician.firstName + ' ' + script.Physician.lastName}</td>

        <td>
          <Span icon="calendar">
            {script.shipOn ?
              <Moment format="MM/DD/YYYY">{script.shipOn}</Moment>
              :
              <span></span>
            }
          </Span>
        </td>

        <td>
          {script.status}
        </td>
        <td><Span icon="calendar"><Moment format='MM/DD/YYYY'>{script.processedOn}</Moment></Span></td>
        {/* <td>
        </td> */}
        <td>{script.refills}</td>
        <td>{script.refillsRemaining}</td>
        <td>{script.patientPay}</td>
        <td>{script.quantity}</td>
        <td>{script.rxNumber}</td>
        <td>{script.pouch ? 'YES' : 'NO'}</td>

      </tr>
    )
  }

  renderTable() {
    return (
      <Table className="rxTable">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }



  render() {
    
    if (this.props.state.copyAttachments === true) {
      this.copyAttachments();
    }

    if (this.state.scripts) {

      var scriptList = this.state.scripts.sort(function (a, b) {
        return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
      });

      var scriptList = this.state.scripts.map(function (item, i) {
        console.log(item);
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
      <div className="rxHistoryTab">

        <div id="rxPrint" style={{ 'display': 'none' }}>
          <h1>RX History</h1>
          {this.renderPatientInfo()}</div>
        {this.renderTable()}
        {scriptList}
      </div>
    )
  }
}

export default RXHistoryTab;
