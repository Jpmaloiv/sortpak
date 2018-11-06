import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'


import {
  Selector,
  Button,
  Header,
  Input,
  Body,
  Form,
} from '../../../common'

// Actions
import {
  getPhysicians,
} from '../../../../actions/main'

import {
  createPatient,
} from '../../../../actions/patients'

import styles from './AddPatient.css'

class EditPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      sex: '',
      phone: '',
      email: '',
      patientWarning: '',
      physicians: '',
      physicianId: ''
    }
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patients/search?patientId=' + this.props.match.params.patientId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
          console.log(resp);
        let patient = resp.data.response[0];
        this.setState({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dob: patient.dob,
            sex: patient.sex,
            phone: patient.phone,
            email: patient.email,
            patientWarning: patient.patientWarning,
            conditions: patient.conditions,
            allergies: patient.allergies,
            address1: patient.address1,
            address2: patient.address2,
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
            secInsType: patient.secInsType
        })
        
      }).catch((error) => {
        console.error(error);
    })

    axios.get('/api/physicians/search/', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
            physicians: resp.data.response
        })
        console.log(this.state.physicians);
      }).catch((error) => {
        console.error(error);
    })
} 

  updatePatient = (event) => {
    event.preventDefault()
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.put('/api/patients/update?id=' + this.state.id + '&firstName=' + this.state.firstName + "&lastName=" + this.state.lastName + "&dob=" + this.state.dob + "&sex=" + this.state.sex + '&phone=' + this.state.phone +
        '&email=' + this.state.email + '&patientWarning=' + this.state.patientWarning + '&conditions=' + this.state.conditions + '&allergies=' + this.state.allergies + '&address1=' + this.state.address1 +
        '&address2=' + this.state.address2 + '&primInsPlan=' + this.state.primInsPlan + '&primInsBIN=' + this.state.primInsBIN + '&primInsPCN=' + this.state.primInsPCN + '&primInsID=' + this.state.primInsID +
        '&primInsGroup=' + this.state.primInsGroup + '&primInsType=' + this.state.primInsType + '&secInsPlan=' + this.state.secInsPlan + '&secInsBIN=' + this.state.secInsBIN + '&secInsPCN=' + this.state.secInsPCN + 
        '&secInsID=' + this.state.secInsID + '&secInsGroup=' + this.state.secInsGroup + '&secInsType=' + this.state.secInsType, 
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                this.props.history.push("/patients");              
            }).catch((error) => {
                console.error(error);
            })
  }

  render() {

    const {
      firstName, lastName, dob, sex, phone, email, patientWarning, conditions, allergies, address1, address2, primInsPlan, primInsBIN, primInsPCN, primInsID,
      primInsGroup, primInsType, secInsPlan, secInsBIN, secInsPCN, secInsID, secInsGroup, secInsType
    } = this.state

    const sexOptions = [
      '--',
      'Male',
      'Female',
      'Other'
    ]

    const insTypeOptions = [
      '--',
      'Medicare Part B',
      'Medicare Part D',
      'Medicaid',
      'Commercial',
      'Patient Pay'
    ]

    return (
      <div className={styles.app} id="addPatient">
        <Header>
          <h2>Edit Patient</h2>
          <div className="action">
              <Button
                cancel
                type="button"
                title="CANCEL"
                link="/patients"
                style={{ marginRight: 10 }}
              />
              <Button
                onClick={this.updatePatient}
                title="SAVE"
                className="submit btn btn-default"
                type="submit"
                value="Submit"
                style={{ marginRight: 8 }}
              />
            </div>
        </Header>
        <Body className={styles.body}>
          <Form className="form">
            <div class="flex-grid">
              <div class="col">         
                <Input
                  label="Patient Name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={firstName => this.setState({ firstName })}
                />
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={lastName => this.setState({ lastName })}
                />
      
                <Input
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={dob => this.setState({ dob })}
                />

                <Selector
                  label="Sex"
                  options={sexOptions}
                  selected={this.state.sex}
                  value={sex}
                  onSelect={sex => this.setState({ sex })}
                />

                <Input
                  label="Phone"
                  value={phone}
                  onChange={phone => this.setState({ phone })}
                />

                <Input 
                  label="Email"
                  value={email}
                  onChange={email => this.setState({ email })}
                />

                <Input 
                  label="Patient Warning"
                  className="textarea"
                  value={patientWarning}
                  onChange={patientWarning => this.setState({ patientWarning })}
                />

              </div>
              <div class="col">

                <Input 
                  label="Co-morbid Conditions"
                  className="textarea"
                  placeholder="Conditions"
                  value={conditions}
                  onChange={conditions => this.setState({ conditions })}
                />

                <Input
                  label="Allergies"
                  className="textarea"
                  placeholder="Conditions"
                  value={allergies}
                  onChange={allergies => this.setState({ allergies })}
                />

                <Input 
                  label="Patient Address"
                  placeholder="Click here"
                  value={address1}
                  onChange={address1 => this.setState({ address1 })}
                />

                <Input
                  placeholder="To enter address"
                  value={address2}
                  onChange={address2 => this.setState({ address2 })}
                />
              </div>
            </div>

            <div class="flex-grid">
              <div class="col">
                <h4>Primary Insurance</h4>
                <Input
                  label="Plan"
                  value={primInsPlan}
                  onChange={primInsPlan => this.setState({ primInsPlan })}
                />
                <Input
                  label="BIN"
                  value={primInsBIN}
                  onChange={primInsBIN => this.setState({ primInsBIN })}
                />
                <Input
                  label="PCN"
                  value={primInsPCN}
                  onChange={primInsPCN => this.setState({ primInsPCN })}
                />
                <Input
                  label="ID"
                  value={primInsID}
                  onChange={primInsID => this.setState({ primInsID })}
                />
                <Input
                  label="Group"
                  value={primInsGroup}
                  onChange={primInsGroup => this.setState({ primInsGroup })}
                />
                <Selector
                  label="Type"
                  options={insTypeOptions}
                  selected={primInsType}
                  value={primInsType}
                  onSelect={primInsType => this.setState({ primInsType })}
                />
              </div>
              <div class="col">
                <h4>Secondary Insurance</h4>
                <Input
                  label="Plan"
                  value={secInsPlan}
                  onChange={secInsPlan => this.setState({ secInsPlan })}
                />
                <Input
                  label="BIN"
                  value={secInsBIN}
                  onChange={secInsBIN => this.setState({ secInsBIN })}
                />
                <Input
                  label="PCN"
                  value={secInsPCN}
                  onChange={secInsPCN => this.setState({ secInsPCN })}
                />
                <Input
                  label="ID"
                  value={secInsID}
                  onChange={secInsID => this.setState({ secInsID })}
                />
                <Input
                  label="Group"
                  value={secInsGroup}
                  onChange={secInsGroup => this.setState({ secInsGroup })}
                />
                <Selector
                  label="Type"
                  options={insTypeOptions}
                  selected={secInsType}
                  value={secInsType}
                  onSelect={secInsType => this.setState({ secInsType })}
                />
              </div>
            </div>
            
          </Form>
        </Body>
      </div>
    );
  }
}

const mapStateToProps = ({main}) => {
  const {
    loading
  } = main

  return {
    loading
  }
}

const actions = {
  getPhysicians,
  createPatient,
}

export default connect(mapStateToProps, actions)(EditPatient)
