import React, { Component } from 'react';

import axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment'

import {
  Button,
  Input,
  Selector,
  Table,
  FormModal,
} from '../../common'

import styles from '../CheckoutForm/CheckoutForm.css'

class MergePatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }

    this.submit = this.submit.bind(this);
  }


  async submit(ev) {

  }

  renderPatientColumn() {
    return (
        <div style={{ marginLeft: 35 }}>
            <Table className="addScriptSearch">
                <thead>
                    <th>NAME</th>
                    <th>DATE OF BIRTH</th>
                    <th>PHONE NUMBER</th>
                    <th>ADDRESS</th>
                </thead>
                {this.state.patients.map(this.renderPatientRow.bind(this))}
            </Table>
        </div>
    )
}

renderPatientRow(patient) {
  return (
      <tr style={{ 'cursor': 'pointer' }} value={patient.id} onClick={() => this.setPatient(patient.id)}>
          <td>{patient.firstName} {patient.lastName}</td>
          <td>{patient.group}</td>
          <td>{patient.specialization}</td>
          <td>{patient.phone}</td>
          <td>{patient.addressStreet}<br />
              {patient.addressCity}, {patient.addressState}, {patient.addressZipCode}</td>
      </tr>
  )
}

  searchPatients() {
    this.setState({
        patientSearch: true
    })
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patients/search?name=' + this.state.patientName, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
            this.setState({
                patients: resp.data.response
            })
        }).catch((err) => {
            console.error(err)
        })
}


  render() {

    const {
      content,
      onClickAway,
    } = this.props



    return (
      <FormModal
        title="Merge Patient"
        onClickAway={onClickAway}
        visible={!!content}
        className="merge"
      ><br />
        <div>
          <div>
            <Input
              style={{ marginLeft: 35 }}
              placeholder="Type name or patient.."
              value={this.state.patientName}
              onChange={patientName => this.setState({ patientName }, this.searchPatients)}
            />
            {this.state.patientSearch ?
              <div>
                {this.renderPatientColumn()}
              </div>
              :
              <div></div>}
          </div>

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
              inactive={this.inactive}
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

export default MergePatientModal;