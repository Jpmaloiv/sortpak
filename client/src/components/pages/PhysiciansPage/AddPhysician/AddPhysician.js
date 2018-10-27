import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'


import {
  Selector,
  Button,
  Header,
  Body,
  Input,
  Form,
} from '../../../common'

// Actions
import {
  getReps,
} from '../../../../actions/main'

import {
  createPhysician,
} from '../../../../actions/physicians'

import styles from './AddPhysician.css'


class AddPhysician extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      specialty: '',
      group: '',
      rep: '',
    }
  }

  /* componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        this.props.getReps()
      })
      .catch(console.log)
  } */

  submitphysician = (event) => {
    event.preventDefault()
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.post('/api/physicians/add?firstName=' + this.state.firstName + '&lastName=' + this.state.lastName +
      '&group=' + this.state.group + '&rep=' + this.state.rep + '&specialization=' + this.state.specialization +
      '&DEA=' + this.state.DEA + '&NPI=' + this.state.NPI + '&phone=' + this.state.phone + '&fax=' + this.state.fax +
      '&email=' + this.state.email + '&contact=' + this.state.contact + '&addressStreet=' + this.state.addressStreet + '&addressCity=' +
      this.state.addressCity + '&addressState=' + this.state.addressState + '&addressZipCode=' + this.state.addressZipCode + '&physicianWarning=' + this.state.physicianWarning,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);
        this.props.history.push("/physicians");
      }).catch((error) => {
        console.error(error);
      })
  }

  render() {

    const {
      firstName, lastName, specialization, group, rep, DEA, NPI, phone, fax, email, contact, addressStreet, addressCity, addressState, addressZipCode, physicianWarning
    } = this.state

    const specOptions = [
      'Internal Medicine',
      'Home Health',
      'Hospice',
      'Skilled Nursing Center',
      'Assisted Living',
      'Hospital',
      'Residential Living',
      'Oncology',
      'Rheumatology',
      'Dermatology',
      'Nephrology',
      'Neurology',
      'Gastroenterology',
      'Allergy',
      'Infectious Disease',
      'Transplant',
      'Orthopedic',
      'Endocrinology',
      'Urology',
      'Cardiology',
      'Hepatology',
      'Pulmonology'
    ]


    return (
      <div className={styles.app} id="addPhysician">
        <Header>
          <h2>Add a New Physician</h2>
          <div className="action">
            <Button
              cancel
              type="button"
              title="CANCEL"
              link="/physicians"
              style={{ marginRight: 10 }}
            />
            <Button
              onClick={this.submitphysician}
              title="CREATE PHYSICIAN"
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
                  label="Physician Name"
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
                  label="Group"
                  placeholder="Group Name"
                  value={group}
                  onChange={group => this.setState({ group })}
                />

                <Input
                  label="Rep"
                  placeholder="Select Rep"
                  value={rep}
                  onChange={rep => this.setState({ rep })}
                />

                <Selector
                  wide
                  label="Specialization"
                  placeholder="Specialization"
                  options={specOptions}
                  value={specialization}
                  onSelect={specialization => this.setState({ specialization })}
                />

                <Input
                  label="DEA"
                  value={DEA}
                  onChange={DEA => this.setState({ DEA })}
                />

                <Input
                  label="NPI"
                  value={NPI}
                  onChange={NPI => this.setState({ NPI })}
                />

                <Input
                  label="Phone"
                  placeholder="(---) --- ----"
                  value={phone}
                  onChange={phone => this.setState({ phone })}
                />

                <Input
                  label="Fax"
                  placeholder="(---) --- ----"
                  value={fax}
                  onChange={fax => this.setState({ fax })}
                />

                <Input
                  label="Email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={email => this.setState({ email })}
                />

                <Input
                  label="Contact"
                  placeholder="Enter additional contact here"
                  value={contact}
                  onChange={contact => this.setState({ contact })}
                />

                <Input
                  label="Physician Address"
                  placeholder="Street"
                  value={addressStreet}
                  onChange={addressStreet => this.setState({ addressStreet })}
                />

                <Input
                  placeholder="City"
                  value={addressCity}
                  onChange={addressCity => this.setState({ addressCity })}
                />

                <Input
                  placeholder="State"
                  value={addressState}
                  onChange={addressState => this.setState({ addressState })}
                />

                <Input
                  placeholder="Zip Code"
                  value={addressZipCode}
                  onChange={addressZipCode => this.setState({ addressZipCode })}
                />


              </div>
              <div class="col">

                <Input
                  label="Physician Warning"
                  placeholder="Enter physician warning here"
                  value={physicianWarning}
                  onChange={physicianWarning => this.setState({ physicianWarning })}
                />

              </div>
            </div>

          </Form>
        </Body>
      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    loading,
    reps,
  } = main

  return {
    loading,
    reps,
  }
}

const actions = {
  getReps,
  createPhysician,
}

export default connect(mapStateToProps, actions)(AddPhysician)
