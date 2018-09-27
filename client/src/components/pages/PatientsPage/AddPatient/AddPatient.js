import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import { hasAuthTokenAsync } from '../../../../lib'

import {
  unformatDate,
} from '../../../../lib/dateHelper'

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

class AddPatient extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  /* componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        this.props.getPhysicians()
      })
      .catch(console.log)
  } */

  get initialState() {
    return {
      firstName: '',
      lastName: '',
      dob: '1970-01-01',
      physicianId: '',
    }
  }

  get invalid() {
    const {
      firstName,
      lastName,
      dob,
      physicianId,
    } = this.state

    return !(
      firstName
      && lastName
      && dob
      && physicianId
    )
  }

  onSubmit(e) {
    e.preventDefault()
        console.log(this.state.firstName);
        console.log(this.props.firstName);
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.post('/api/patients/add?firstName=' + this.state.firstName, 
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/patients");              
            }).catch((error) => {
                console.error(error);
            })

    const {
      firstName,
      lastName,
      physicianId,
    } = this.state

    const dob = unformatDate(this.state.dob)

    /* const data = {
      firstName,
      lastName,
      dob,
      physicianId,
    }
    this.props.createPatient(data) */
  }

  render() {
    const {
      physicians,
    } = this.props

    const {
      firstName,
      lastName,
      dob,
      physicianId,
    } = this.state

    const physicianOptions = [
      {
        key: '',
        value: '',
        display: 'Select Physician',
      },
      ...physicians.map(physician => ({
        key: physician.id,
        value: physician.id,
        display: physician.nameDisplay,
      })),
    ]

    return (
      <div>
        <Header>
          <h3>Add a New Patient</h3>
        </Header>
        <Body className={styles.body}>
          <Form
            className="form"
            onSubmit={this.onSubmit.bind(this)}
          >
            <label>
              Patient Name
            </label>
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

            <br />

            <label>
              Date of Birth
            </label>
            <Input
              type="date"
              value={dob}
              onChange={dob => this.setState({ dob })}
            />

            <br />

            <label>
              Physician
            </label>
            <Selector
              wide
              selected={physicianId}
              options={physicianOptions}
              onSelect={physicianId => this.setState({ physicianId })}
            />

            <br />

            <div className="buttons">
              <Button
                large
                cancel
                type="button"
                title="CANCEL"
                link="/patients"
              />
              <Button
                large
                type="submit"
                title="CREATE PATIENT"
              />
            </div>
          </Form>
        </Body>
      </div>
    );
  }
}

const mapStateToProps = ({main}) => {
  const {
    loading,
    physicians,
  } = main

  return {
    loading,
    physicians,
  }
}

const actions = {
  getPhysicians,
  createPatient,
}

export default connect(mapStateToProps, actions)(AddPatient)
