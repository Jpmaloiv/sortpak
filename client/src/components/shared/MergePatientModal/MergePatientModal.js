import React, { Component } from 'react';

import axios from 'axios'
import moment from 'moment'

import {
  Button,
  Input,
  Table,
  FormModal
} from '../../common'

import styles from './MergePatientModal.css'
import { throws } from 'assert';

class MergePatientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }

    this.handleMerge = this.handleMerge.bind(this);
  }

  mergePatient(e) {
    e.preventDefault();

    if (window.confirm(`This will delete ${this.state.oldPatientName} and update ${this.state.patientName}\n
    The scripts associated with ${this.state.oldPatientName} will be reassigned to ${this.state.patientName}`)) {
      const loginToken = window.localStorage.getItem("token");

      axios.put('/api/scripts/merge?oldPatientId=' + this.state.oldPatientId + '&patientId=' + this.state.patientId,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          // this.props.history.push(`/patients/${this.state.id}`);
        }).catch((error) => {
          console.error(error);
        })

      axios.delete('/api/patients/delete?patientId=' + this.state.oldPatientId,
        { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
        }).catch((error) => {
          console.error(error);
        })

      let data = new FormData();
      axios.put('/api/patients/update?id=' + this.state.patientId + '&firstName=' + this.state.firstName + "&lastName=" + this.state.lastName + "&dob=" + this.state.dob + '&hub=' + this.state.hub + "&sex=" + this.state.sex + '&phone=' + this.state.phone + '&phone2=' + this.state.phone2 + '&phone3=' + this.state.phone3 +
        '&email=' + this.state.email + '&patientWarning=' + this.state.patientWarning + '&conditions=' + this.state.conditions + '&allergies=' + this.state.allergies +
        '&addressStreet=' + this.state.addressStreet + '&addressCity=' + this.state.addressCity + '&addressState=' + this.state.addressState + '&addressZipCode=' + this.state.addressZipCode +
        '&address2Street=' + this.state.address2Street + '&address2City=' + this.state.address2City + '&address2State=' + this.state.address2State + '&address2ZipCode=' + this.state.address2ZipCode +
        '&address3Street=' + this.state.address3Street + '&address3City=' + this.state.address3City + '&address3State=' + this.state.address3State + '&address3ZipCode=' + this.state.address3ZipCode +
        '&primInsPlan=' + this.state.primInsPlan + '&primInsBIN=' + this.state.primInsBIN + '&primInsPCN=' + this.state.primInsPCN + '&primInsID=' + this.state.primInsID +
        '&primInsGroup=' + this.state.primInsGroup + '&primInsType=' + this.state.primInsType + '&secInsPlan=' + this.state.secInsPlan + '&secInsBIN=' + this.state.secInsBIN + '&secInsPCN=' + this.state.secInsPCN +
        '&secInsID=' + this.state.secInsID + '&secInsGroup=' + this.state.secInsGroup + '&secInsType=' + this.state.secInsType,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          window.location.reload();
        }).catch((error) => {
          console.error(error);
        })
    }
  }

  handleMerge(event) {
    event.preventDefault();
    const name = event.currentTarget.name;
    if (event.currentTarget.name === "dob") {
      this.setState({
        dob: moment(this.state.oldPatient.dob).format("YYYY-MM-DD")
      })
    } else {
      this.setState({
        [event.currentTarget.name]: this.state.oldPatient[`${name}`]
      })
    }
  }


  renderPatientColumn() {
    console.log(this.state.oldPatient)
    return (
      <div>
        {this.state.oldPatient ?
          <div style={{ marginLeft: 35, width: '50%', textAlign: 'right', 'float': 'right' }}>
            <Table style={{ 'display': 'none' }} className="addScriptSearch">
              {this.state.patients.map(this.renderPatientRow.bind(this))}
            </Table>
          </div>
          :
          <div style={{ marginLeft: 35 }}>
            <Table className="addScriptSearch">
              {this.state.patients.map(this.renderPatientRow.bind(this))}
            </Table>
          </div>}
      </div>
    )
  }

  renderPatientRow(patient) {
    return (
      <tr style={{ 'cursor': 'pointer' }} value={patient.id} onClick={() => this.setPatient(patient.id)}>
        <td>{patient.firstName} {patient.lastName}</td>
      </tr>
    )
  }

  setPatient(value) {
    this.setState({
      patientSearch: false,
      patientId: value,
      setPatient: 'set'
    }, this.getPatient)
  }

  getPatient() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patients/search?patientId=' + this.state.patientId,
      { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        if (this.state.searchNewPatient) {
          let patient = resp.data.response[0];
          this.setState({
            patient: patient,
            patientId: patient.id,
            patientName: patient.firstName + ' ' + patient.lastName,
            firstName: patient.firstName,
            lastName: patient.lastName,
            hub: patient.hub,
            sex: patient.sex,
            email: patient.email,
            patientWarning: patient.patientWarning,
            conditions: patient.conditions,
            allergies: patient.allergies,
            addressStreet: patient.addressStreet,
            addressCity: patient.addressCity,
            addressState: patient.addressState,
            addressZipCode: patient.addressZipCode,
            address2Street: patient.address2Street,
            address2City: patient.address2City,
            address2State: patient.address2State,
            address2ZipCode: patient.address2ZipCode,
            address3Street: patient.address3Street,
            address3City: patient.addressC3ity,
            address3State: patient.address3State,
            address3ZipCode: patient.address3ZipCode,
            phone: patient.phone,
            phone2: patient.phone2,
            phone3: patient.phone3,
            primInsPlan: patient.primInsPlan,
            primInsBIN: patient.primInsBIN,
            primInsPCN: patient.primInsPCN,
            primInsID: patient.primInsID,
            primInsGroup: patient.primInsGroup,
            primInsType: patient.primInsType,
            secInsPlan: patient.secInsPlan,
            secInsBIN: patient.secInsBIN,
            secInsPCN: patient.secInsPCN,
            secInsID: patient.secInsID,
            secInsGroup: patient.secInsGroup,
            secInsType: patient.secInsType,
            dob: moment(patient.dob).format("YYYY-MM-DD")
          })
        } else {
          this.setState({
            oldPatient: resp.data.response[0],
            oldPatientId: resp.data.response[0].id,
            oldPatientName: resp.data.response[0].firstName + ' ' + resp.data.response[0].lastName
          })
        }
      }).catch((error) => {
        console.error(error);
      })
  }

  searchPatients() {
    this.setState({
      patientSearch: true
    })
    let patientName = "";

    if (this.state.searchNewPatient) patientName = this.state.patientName
    if (!this.state.searchNewPatient) patientName = this.state.oldPatientName

    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patients/search?name=' + patientName, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          patients: resp.data.response
        })
      }).catch((err) => {
        console.error(err)
      })
  }


  render() {

    console.log(this.state)

    const {
      content,
      onClickAway,
    } = this.props

    const patient = this.state.patient;
    const oldPatient = this.state.oldPatient;


    return (
      <FormModal
        title="Merge Patient"
        onClickAway={onClickAway}
        visible={!!content}
      >
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
            onClick={this.mergePatient.bind(this)}
            title="Merge"
          />
        </div><br /><br />
        <div style={{ 'display': 'flex' }}>
          <div style={{ 'flex': '1 0 auto' }}>
            {this.state.oldPatient ?
              <h6 style={{ color: 'red' }}>This patient will be deleted.</h6>
              : <span></span>}
            <Input
              placeholder="Type name or patient.."
              value={this.state.oldPatientName}
              onChange={oldPatientName => this.setState({ oldPatientName, searchNewPatient: false }, this.searchPatients)}
            />
            {this.state.oldPatient ?
              <div>
                <br />
                <h4>Patient Info</h4>

                <Input
                  label="First Name"
                  placeholder={oldPatient.firstName}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Last Name"
                  placeholder={oldPatient.lastName}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Date of Birth"
                  placeholder={oldPatient.dob}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Hub"
                  placeholder={oldPatient.hub}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Sex"
                  placeholder={oldPatient.sex}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Email"
                  placeholder={oldPatient.email}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Patient Warning"
                  placeholder={oldPatient.patientWarning}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Conditions"
                  placeholder={oldPatient.conditions}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Allergies"
                  placeholder={oldPatient.allergies}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - Street"
                  placeholder={oldPatient.addressStreet}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - City"
                  placeholder={oldPatient.addressCity}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - State"
                  placeholder={oldPatient.addressState}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - Zip Code"
                  placeholder={oldPatient.addressZipCode}
                  onChange={n => this.setState({ n })}
                />
                {oldPatient.address2Street ?
                  <div>
                    <Input
                      label="Address 2 - Street"
                      placeholder={oldPatient.address2Street}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 2 - City"
                      placeholder={oldPatient.address2City}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 2 - State"
                      placeholder={oldPatient.address2State}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 2 - Zip Code"
                      placeholder={oldPatient.address2ZipCode}
                      onChange={n => this.setState({ n })}
                    />
                  </div>
                  :
                  <span></span>}
                {oldPatient.address3Street ?
                  <div>
                    <Input
                      label="Address 3 - Street"
                      placeholder={oldPatient.address3Street}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 3 - City"
                      placeholder={oldPatient.address3City}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 3 - State"
                      placeholder={oldPatient.address3State}
                      onChange={n => this.setState({ n })}
                    />
                    <Input
                      label="Address 3 - Zip Code"
                      placeholder={oldPatient.address3ZipCode}
                      onChange={n => this.setState({ n })}
                    />
                  </div>
                  :
                  <span></span>}

                <Input
                  label="Phone"
                  placeholder={oldPatient.phone}
                  onChange={n => this.setState({ n })}
                />
                {oldPatient.phone2 ?
                  <Input
                    label="Phone 2"
                    placeholder={oldPatient.phone2}
                    onChange={n => this.setState({ n })}
                  />
                  : <span></span>
                }
                {oldPatient.phone3 ?
                  <Input
                    label="Phone 3"
                    placeholder={oldPatient.phone3}
                    onChange={n => this.setState({ n })}
                  />
                  : <span></span>
                }

                <h5>Primary Insurance</h5>

                <Input
                  label="Plan"
                  placeholder={oldPatient.primInsPlan}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="BIN"
                  placeholder={oldPatient.primInsBIN}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="PCN"
                  placeholder={oldPatient.primInsPCN}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="ID"
                  placeholder={oldPatient.primInsID}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Group"
                  placeholder={oldPatient.primInsGroup}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Type"
                  placeholder={oldPatient.primInsType}
                  onChange={n => this.setState({ n })}
                />

                <h5>Secondary Insurance</h5>

                <Input
                  label="Plan"
                  placeholder={oldPatient.secInsPlan}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="BIN"
                  placeholder={oldPatient.secInsBIN}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="PCN"
                  placeholder={oldPatient.secInsPCN}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="ID"
                  placeholder={oldPatient.secInsID}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Group"
                  placeholder={oldPatient.secInsGroup}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Type"
                  placeholder={oldPatient.secInsType}
                  onChange={n => this.setState({ n })}
                />
              </div>
              :
              <span></span>
            }

          </div>
          <div style={{ 'flex': '1 1 auto', textAlign: 'center', marginTop: 160 }}>
            {this.state.oldPatient && this.state.patient ?
              <div>
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="firstName"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="lastName"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="dob"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="hub"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="sex"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="email"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="patientWarning"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="conditions"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="allergies"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="addressStreet"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="addressCity"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="addressState"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="addressZipCode"
                  onClick={this.handleMerge}
                />
                <br />

                {this.state.oldPatient.address2Street ?
                  <div>
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address2Street"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address2City"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address2State"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address2ZipCode"
                      onClick={this.handleMerge}
                    />
                  </div>
                  :
                  <span></span>}

                {this.state.oldPatient.address3Street ?
                  <div>
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address3Street"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address3City"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address3State"
                      onClick={this.handleMerge}
                    />
                    <br />
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="address3ZipCode"
                      onClick={this.handleMerge}
                    />
                  </div>
                  :
                  <span></span>}
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="phone"
                  onClick={this.handleMerge}
                />

                {this.state.oldPatient.phone2 ?
                  <div>
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="phone2"
                      onClick={this.handleMerge}
                    />
                  </div>
                  : <span></span>}

                {this.state.oldPatient.phone3 ?
                  <div>
                    <Button
                      className="mergeButton"
                      icon="arrow-right"
                      name="phone3"
                      onClick={this.handleMerge}
                    />
                  </div>
                  : <span></span>}

                {this.state.oldPatient.phone2 ?
                  <span></span> : <br />}
                <Button
                  className="mergeButton"
                  style={{ marginTop: 37 }}
                  icon="arrow-right"
                  name="primInsPlan"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="primInsBIN"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="primInsPCN"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="primInsID"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="primInsGroup"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="primInsType"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  style={{ marginTop: 37 }}
                  icon="arrow-right"
                  name="secInsPlan"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="secInsBIN"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="secInsPCN"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="secInsID"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="secInsGroup"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="secInsType"
                  onClick={this.handleMerge}
                />
              </div>
              :
              <span></span>
            }
          </div>
          <div style={{ 'flex': '1 0 auto', 'overflow': 'initial' }}>
            {this.state.patient ?
              <h6 style={{ color: 'red' }}>This patient will be updated.</h6>
              : <span></span>}
            <Input
              placeholder="Type name or patient.."
              value={this.state.patientName}
              onChange={patientName => this.setState({ patientName, searchNewPatient: true }, this.searchPatients)}
            />
            {this.state.patient ?
              <div>
                <br />
                <h4>Patient Info</h4>

                <Input
                  label="First Name"
                  placeholder={patient.firstName}
                  value={this.state.firstName}
                  onChange={firstName => this.setState({ firstName })}
                />
                <Input
                  label="Last Name"
                  placeholder={patient.lastName}
                  value={this.state.lastName}
                  onChange={lastName => this.setState({ lastName })}
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  value={this.state.dob}
                  onChange={dob => this.setState({ dob })}
                />
                <Input
                  label="Hub"
                  placeholder={patient.hub}
                  value={this.state.hub}
                  onChange={hub => this.setState({ hub })}
                />
                <Input
                  label="Sex"
                  placeholder={patient.sex}
                  value={this.state.sex}
                  onChange={sex => this.setState({ sex })}
                />
                <Input
                  label="Email"
                  placeholder={patient.email}
                  value={this.state.email}
                  onChange={email => this.setState({ email })}
                />
                <Input
                  label="Patient Warning"
                  placeholder={patient.patientWarning}
                  value={this.state.patientWarning}
                  onChange={patientWarning => this.setState({ patientWarning })}
                />
                <Input
                  label="Conditions"
                  placeholder={patient.conditions}
                  value={this.state.conditions}
                  onChange={conditions => this.setState({ conditions })}
                />
                <Input
                  label="Allergies"
                  placeholder={patient.allergies}
                  value={this.state.allergies}
                  onChange={allergies => this.setState({ allergies })}
                />
                <Input
                  label="Address - Street"
                  placeholder={patient.addressStreet}
                  value={this.state.addressStreet}
                  onChange={addressStreet => this.setState({ addressStreet })}
                />
                <Input
                  label="Address - City"
                  placeholder={patient.addressCity}
                  value={this.state.addressCity}
                  onChange={addressCity => this.setState({ addressCity })}
                />
                <Input
                  label="Address - State"
                  placeholder={patient.addressState}
                  value={this.state.addressState}
                  onChange={addressState => this.setState({ addressState })}
                />
                <Input
                  label="Address - Zip Code"
                  placeholder={patient.addressZipCode}
                  value={this.state.addressZipCode}
                  onChange={addressZipCode => this.setState({ addressZipCode })}
                />
                {this.state.oldPatient.address2Street ?
                  <div>
                    <Input
                      label="Address 2 - Street"
                      placeholder={patient.address2Street}
                      value={this.state.address2Street}
                      onChange={address2Street => this.setState({ address2Street })}
                    />
                    <Input
                      label="Address 2 - City"
                      placeholder={patient.address2City}
                      value={this.state.address2City}
                      onChange={address2City => this.setState({ address2City })}
                    />
                    <Input
                      label="Address 2 - State"
                      placeholder={patient.address2State}
                      value={this.state.address2State}
                      onChange={address2State => this.setState({ address2State })}
                    />
                    <Input
                      label="Address 2 - Zip Code"
                      placeholder={patient.address2ZipCode}
                      value={this.state.address2ZipCode}
                      onChange={address2ZipCode => this.setState({ address2ZipCode })}
                    />
                  </div>
                  :
                  <span></span>}
                {this.state.oldPatient.address3Street ?
                  <div>
                    <Input
                      label="Address 3 - Street"
                      placeholder={patient.address3Street}
                      value={this.state.address3Street}
                      onChange={address3Street => this.setState({ address3Street })}
                    />
                    <Input
                      label="Address 3 - City"
                      placeholder={patient.address3City}
                      value={this.state.address3City}
                      onChange={address3City => this.setState({ address3City })}
                    />
                    <Input
                      label="Address 3 - State"
                      placeholder={patient.address3State}
                      value={this.state.address3State}
                      onChange={address3State => this.setState({ address3State })}
                    />
                    <Input
                      label="Address 3 - Zip Code"
                      placeholder={patient.address3ZipCode}
                      value={this.state.address3ZipCode}
                      onChange={address3ZipCode => this.setState({ address3ZipCode })}
                    />
                  </div>
                  :
                  <span></span>}

                <Input
                  label="Phone"
                  placeholder={patient.phone}
                  value={this.state.phone}
                  onChange={phone => this.setState({ phone })}
                />
                {this.state.oldPatient.phone2 ?
                  <Input
                    label="Phone 2"
                    placeholder={patient.phone2}
                    value={this.state.phone2}
                    onChange={phone2 => this.setState({ phone2 })}
                  />
                  : <span></span>
                }
                {this.state.oldPatient.phone3 ?
                  <Input
                    label="Phone 3"
                    placeholder={patient.phone3}
                    value={this.state.phone3}
                    onChange={phone3 => this.setState({ phone3 })}
                  />
                  : <span></span>
                }

                <h5>Primary Insurance</h5>

                <Input
                  label="Plan"
                  placeholder={patient.primInsPlan}
                  value={this.state.primInsPlan}
                  onChange={primInsPlan => this.setState({ primInsPlan })}
                />
                <Input
                  label="BIN"
                  placeholder={patient.primInsBIN}
                  value={this.state.primInsBIN}
                  onChange={primInsBIN => this.setState({ primInsBIN })}
                />
                <Input
                  label="PCN"
                  placeholder={patient.primInsPCN}
                  value={this.state.primInsPCN}
                  onChange={primInsPCN => this.setState({ primInsPCN })}
                />
                <Input
                  label="ID"
                  placeholder={patient.primInsID}
                  value={this.state.primInsID}
                  onChange={primInsID => this.setState({ primInsID })}
                />
                <Input
                  label="Group"
                  placeholder={patient.primInsGroup}
                  value={this.state.primInsGroup}
                  onChange={primInsGroup => this.setState({ primInsGroup })}
                />
                <Input
                  label="Type"
                  placeholder={patient.primInsType}
                  value={this.state.primInsType}
                  onChange={primInsType => this.setState({ primInsType })}
                />

                <h5>Secondary Insurance</h5>

                <Input
                  label="Plan"
                  placeholder={patient.secInsPlan}
                  value={this.state.secInsPlan}
                  onChange={secInsPlan => this.setState({ secInsPlan })}
                />
                <Input
                  label="BIN"
                  placeholder={patient.secInsBIN}
                  value={this.state.secInsBIN}
                  onChange={secInsBIN => this.setState({ secInsBIN })}
                />
                <Input
                  label="PCN"
                  placeholder={patient.secInsPCN}
                  value={this.state.secInsPCN}
                  onChange={secInsPCN => this.setState({ secInsPCN })}
                />
                <Input
                  label="ID"
                  placeholder={patient.secInsID}
                  value={this.state.secInsID}
                  onChange={secInsID => this.setState({ secInsID })}
                />
                <Input
                  label="Group"
                  placeholder={patient.secInsGroup}
                  value={this.state.secInsGroup}
                  onChange={secInsGroup => this.setState({ secInsGroup })}
                />
                <Input
                  label="Type"
                  placeholder={patient.secInsType}
                  value={this.state.secInsType}
                  onChange={secInsType => this.setState({ secInsType })}
                />
              </div>
              :
              <span></span>
            }

          </div>
        </div>
        <br /><br />
        {this.state.patientSearch ?
          <div>
            {this.renderPatientColumn()}
          </div>
          :
          <div></div>}

        <br />

        <br /><br />

      </FormModal >
    );
  }
}

export default MergePatientModal;