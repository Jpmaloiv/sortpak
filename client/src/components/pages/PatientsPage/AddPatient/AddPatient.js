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

class AddPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      physicians: '',
      physicianId: ''
    }
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/physicians/search/', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
            physicians: resp.data.response,
            // id: resp.data.response.id,    
        })
        console.log(this.state.physicians);
      }).catch((error) => {
        console.error(error);
    })
} 
  

  /* get initialState() {
    return {
      firstName: '',
      lastName: '',
      dob: '1970-01-01',
      physicianId: '',
    }
  } */

  /* get invalid() {
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
  } */

  onSubmit(e) {
    e.preventDefault()
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.post('/api/patients/add?firstName=' + this.state.firstName + "&lastName=" + this.state.lastName + "&dob=" + this.state.dob, 
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/patients");              
            }).catch((error) => {
                console.error(error);
            })

    

    // const dob = unformatDate(this.state.dob)

    /* const data = {
      firstName,
      lastName,
      dob,
      physicianId,
    }
    this.props.createPatient(data) */
  }

  render() {

    console.log(this.state.physicians);
    /* const {
      physicians,
    } = this.props */

    const {
      firstName,
      lastName,
      dob,
      physicianId,
    } = this.state
    console.log(this.state.physicians);
    const physicians = this.state.physicians;
    console.log(physicians);

    
    const physicianOptions = [
      {
        key: '',
        value: '',
        display: 'Select Physician',
      },
      ...physicians.map(physician => ({
        key: physician.id,
        value: physician.id,
        display: physician.firstName,
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

export default connect(mapStateToProps, actions)(AddPatient)
