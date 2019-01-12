import React, { Component } from 'react';

import axios from 'axios'
import moment from 'moment'

import {
  Button,
  Input,
  Table,
  FormModal
} from '../../common'

import styles from './MergePhysicianModal.css'
import { throws } from 'assert';

class MergePhysicianModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      physicians: []
    }

    this.handleMerge = this.handleMerge.bind(this);
  }

  mergePhysician(e) {
    e.preventDefault();

    if (window.confirm(`This will delete ${this.state.oldPhysicianName} and update ${this.state.physicianName}\n
    The scripts associated with ${this.state.oldPhysicianName} will be reassigned to ${this.state.physicianName}`)) {
      const loginToken = window.localStorage.getItem("token");

      axios.put('/api/scripts/mergephys?oldPhysicianId=' + this.state.oldPhysicianId + '&physicianId=' + this.state.physicianId,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          // this.props.history.push(`/physicians/${this.state.id}`);
        }).catch((error) => {
          console.error(error);
        })

      axios.put('/api/visits/notes/merge?oldPhysicianId=' + this.state.oldPhysicianId + '&physicianId=' + this.state.physicianId,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          // this.props.history.push(`/physicians/${this.state.id}`);
        }).catch((error) => {
          console.error(error);
        })

      axios.put('/api/visits/notes/merge?oldPhysicianId=' + this.state.oldPhysicianId + '&physicianId=' + this.state.physicianId,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          // this.props.history.push(`/physicians/${this.state.id}`);
        }).catch((error) => {
          console.error(error);
        })

        axios.put('/api/user/merge??oldPhysicianId=' + this.state.oldPhysicianId + '&physicianId=' + this.state.physicianId,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);

            }).catch((error) => {
                console.error(error);
            })

      axios.delete('/api/physicians/delete?physicianId=' + this.state.oldPhysicianId,
        { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
        }).catch((error) => {
          console.error(error);
        })

      let data = new FormData();
      axios.put('/api/physicians/update?id=' + this.state.physicianId + '&firstName=' + this.state.firstName + "&lastName=" + this.state.lastName + "&dob=" + this.state.dob + '&hub=' + this.state.hub + "&sex=" + this.state.sex + '&phone=' + this.state.phone + '&phone2=' + this.state.phone2 + '&phone3=' + this.state.phone3 +
        '&email=' + this.state.email + '&physicianWarning=' + this.state.physicianWarning + '&conditions=' + this.state.conditions + '&allergies=' + this.state.allergies +
        '&addressStreet=' + this.state.addressStreet + '&addressCity=' + this.state.addressCity + '&addressState=' + this.state.addressState + '&addressZipCode=' + this.state.addressZipCode +
        '&address2Street=' + this.state.address2Street + '&address2City=' + this.state.address2City + '&address2State=' + this.state.address2State + '&address2ZipCode=' + this.state.address2ZipCode +
        '&address3Street=' + this.state.address3Street + '&address3City=' + this.state.address3City + '&address3State=' + this.state.address3State + '&address3ZipCode=' + this.state.address3ZipCode +
        '&primInsPlan=' + this.state.primInsPlan + '&primInsBIN=' + this.state.primInsBIN + '&primInsPCN=' + this.state.primInsPCN + '&primInsID=' + this.state.primInsID +
        '&primInsGroup=' + this.state.primInsGroup + '&primInsType=' + this.state.primInsType + '&secInsPlan=' + this.state.secInsPlan + '&secInsBIN=' + this.state.secInsBIN + '&secInsPCN=' + this.state.secInsPCN +
        '&secInsID=' + this.state.secInsID + '&secInsGroup=' + this.state.secInsGroup + '&secInsType=' + this.state.secInsType,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          // window.location.reload();
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
        dob: moment(this.state.oldPhysician.dob).format("YYYY-MM-DD")
      })
    } else {
      this.setState({
        [event.currentTarget.name]: this.state.oldPhysician[`${name}`]
      })
    }
  }


  renderPhysicianColumn() {
    console.log(this.state.oldPhysician)
    return (
      <div>
        {this.state.oldPhysician ?
          <div style={{ marginLeft: 35, width: '50%', textAlign: 'right', 'float': 'right' }}>
            <Table style={{ 'display': 'none' }} className="addScriptSearch">
              {this.state.physicians.map(this.renderPhysicianRow.bind(this))}
            </Table>
          </div>
          :
          <div style={{ marginLeft: 35 }}>
            <Table className="addScriptSearch">
              {this.state.physicians.map(this.renderPhysicianRow.bind(this))}
            </Table>
          </div>}
      </div>
    )
  }

  renderPhysicianRow(physician) {
    return (
      <tr style={{ 'cursor': 'pointer' }} value={physician.id} onClick={() => this.setPhysician(physician.id)}>
        <td>{physician.firstName} {physician.lastName}</td>
      </tr>
    )
  }

  setPhysician(value) {
    this.setState({
      physicianSearch: false,
      physicianId: value,
      setPhysician: 'set'
    }, this.getPhysician)
  }

  getPhysician() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/physicians/search?physicianId=' + this.state.physicianId,
      { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        if (this.state.searchNewPhysician) {
          let physician = resp.data.response[0];
          this.setState({
            physician: physician,
            physicianId: physician.id,
            physicianName: physician.firstName + ' ' + physician.lastName,
            firstName: physician.firstName,
            lastName: physician.lastName,
            group: physician.group,
            rep: physician.rep,
            specialization: physician.specialization,
            DEA: physician.DEA,
            NPI: physician.NPI,
            phone: physician.phone,
            fax: physician.fax,
            email: physician.email,
            contact: physician.contact,
            addressStreet: physician.addressStreet,
            addressCity: physician.addressCity,
            addressState: physician.addressState,
            addressZipCode: physician.addressZipCode,
            physicianWarning: physician.physicianWarning
          })
        } else {
          this.setState({
            oldPhysician: resp.data.response[0],
            oldPhysicianId: resp.data.response[0].id,
            oldPhysicianName: resp.data.response[0].firstName + ' ' + resp.data.response[0].lastName
          })
        }
      }).catch((error) => {
        console.error(error);
      })
  }

  searchPhysicians() {
    this.setState({
      physicianSearch: true
    })
    let physicianName = "";

    if (this.state.searchNewPhysician) physicianName = this.state.physicianName
    if (!this.state.searchNewPhysician) physicianName = this.state.oldPhysicianName

    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/physicians/search?name=' + physicianName, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          physicians: resp.data.response
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

    const physician = this.state.physician;
    const oldPhysician = this.state.oldPhysician;


    return (
      <FormModal
        title="Merge Physician"
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
            onClick={this.mergePhysician.bind(this)}
            title="Merge"
          />
        </div><br /><br />
        <div style={{ 'display': 'flex' }}>
          <div style={{ 'flex': '1 0 auto' }}>
            {this.state.oldPhysician ?
              <h6 style={{ color: 'red' }}>This physician will be deleted.</h6>
              : <span></span>}
            <Input
              placeholder="Type name or physician.."
              value={this.state.oldPhysicianName}
              onChange={oldPhysicianName => this.setState({ oldPhysicianName, searchNewPhysician: false }, this.searchPhysicians)}
            />
            {this.state.oldPhysician ?
              <div>
                <br />
                <h4>Physician Info</h4>

                <Input
                  label="First Name"
                  placeholder={oldPhysician.firstName}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Last Name"
                  placeholder={oldPhysician.lastName}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Group"
                  placeholder={oldPhysician.group}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Rep"
                  placeholder={oldPhysician.rep}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Specialization"
                  placeholder={oldPhysician.specialization}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="DEA"
                  placeholder={oldPhysician.DEA}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="NPI"
                  placeholder={oldPhysician.NPI}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Phone"
                  placeholder={oldPhysician.phone}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Fax"
                  placeholder={oldPhysician.fax}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Email"
                  placeholder={oldPhysician.email}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Contact"
                  placeholder={oldPhysician.contact}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - Street"
                  placeholder={oldPhysician.addressStreet}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - City"
                  placeholder={oldPhysician.addressCity}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - State"
                  placeholder={oldPhysician.addressState}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Address - Zip Code"
                  placeholder={oldPhysician.addressZipCode}
                  onChange={n => this.setState({ n })}
                />
                <Input
                  label="Physician Warning"
                  placeholder={oldPhysician.physicianWarning}
                  onChange={n => this.setState({ n })}
                />
              </div>
              : <span></span>}
          </div>
          <div style={{ 'flex': '1 1 auto', textAlign: 'center', marginTop: 160 }}>
            {this.state.oldPhysician && this.state.physician ?
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
                  name="group"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="rep"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="specialization"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="DEA"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="NPI"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="phone"
                  onClick={this.handleMerge}
                />
                <br />
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="fax"
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
                  name="contact"
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
                <Button
                  className="mergeButton"
                  icon="arrow-right"
                  name="physicianWarning"
                  onClick={this.handleMerge}
                />

              </div>
              :
              <span></span>
            }
          </div>
          <div style={{ 'flex': '1 0 auto', 'overflow': 'initial' }}>
            {this.state.physician ?
              <h6 style={{ color: 'red' }}>This physician will be updated.</h6>
              : <span></span>}
            <Input
              placeholder="Type name or physician.."
              value={this.state.physicianName}
              onChange={physicianName => this.setState({ physicianName, searchNewPhysician: true }, this.searchPhysicians)}
            />
            {this.state.physician ?
              <div>
                <br />
                <h4>Physician Info</h4>

                <Input
                  label="First Name"
                  placeholder={physician.firstName}
                  value={this.state.firstName}
                  onChange={firstName => this.setState({ firstName })}
                />
                <Input
                  label="Last Name"
                  placeholder={physician.lastName}
                  value={this.state.lastName}
                  onChange={lastName => this.setState({ lastName })}
                />
                <Input
                  label="Group"
                  value={this.state.group}
                  onChange={group => this.setState({ group })}
                />
                <Input
                  label="Rep"
                  placeholder={physician.rep}
                  value={this.state.rep}
                  onChange={rep => this.setState({ rep })}
                />
                <Input
                  label="Specialization"
                  placeholder={physician.specialization}
                  value={this.state.specialization}
                  onChange={specialization => this.setState({ specialization })}
                />
                <Input
                  label="DEA"
                  placeholder={physician.DEA}
                  value={this.state.DEA}
                  onChange={DEA => this.setState({ DEA })}
                />
                <Input
                  label="NPI"
                  placeholder={physician.NPI}
                  value={this.state.NPI}
                  onChange={NPI => this.setState({ NPI })}
                />
                <Input
                  label="Phone"
                  placeholder={physician.phone}
                  value={this.state.phone}
                  onChange={phone => this.setState({ phone })}
                />
                <Input
                  label="Fax"
                  placeholder={physician.fax}
                  value={this.state.fax}
                  onChange={fax => this.setState({ fax })}
                />
                <Input
                  label="Email"
                  placeholder={physician.email}
                  value={this.state.email}
                  onChange={email => this.setState({ email })}
                />
                <Input
                  label="Contact"
                  placeholder={physician.contact}
                  value={this.state.contact}
                  onChange={contact => this.setState({ contact })}
                />
                <Input
                  label="Address - Street"
                  placeholder={physician.addressStreet}
                  value={this.state.addressStreet}
                  onChange={addressStreet => this.setState({ addressStreet })}
                />
                <Input
                  label="Address - City"
                  placeholder={physician.addressCity}
                  value={this.state.addressCity}
                  onChange={addressCity => this.setState({ addressCity })}
                />
                <Input
                  label="Address - State"
                  placeholder={physician.addressState}
                  value={this.state.addressState}
                  onChange={addressState => this.setState({ addressState })}
                />
                <Input
                  label="Address - Zip Code"
                  placeholder={physician.addressZipCode}
                  value={this.state.addressZipCode}
                  onChange={addressZipCode => this.setState({ addressZipCode })}
                />
                <Input
                  label="Physician Warning"
                  placeholder={physician.physicianWarning}
                  value={this.state.physicianWarning}
                  onChange={physicianWarning => this.setState({ physicianWarning })}
                />
              </div>
              :
              <span></span>
            }

          </div>
        </div>
        <br /><br />
        {this.state.physicianSearch ?
          <div>
            {this.renderPhysicianColumn()}
          </div>
          :
          <div></div>}

        <br />

        <br /><br />

      </FormModal >
    );
  }
}

export default MergePhysicianModal;