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

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/physicians/search?physicianId=' + this.props.match.params.physicianId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        let physician = resp.data.response[0];
        this.setState({
          id: physician.id,
          firstName: physician.firstName,
          lastName: physician.lastName,
          group: physician.group,
          oldGroup: physician.group,
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
          physicianWarning: physician.physicianWarning,
        })

      }).catch((error) => {
        console.error(error);
      })


    axios.get('/api/user/search?role=Rep', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);

        this.setState({
          reps: resp.data.response
        })

      }).catch((error) => {
        console.error(error);
      })
  }

  fetchPhysicianUsers() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/user/search?role=Physician', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          users: resp.data.response
        }, this.fetchGroupPhysicians);
      }).catch((error) => {
        console.error(error);
      })
  }

  fetchGroupPhysicians() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/physicians/search?group=' + this.state.oldGroup, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp)
        this.setState({
          groupPhysicians: resp.data.response
        }, this.sortUsersAndPhysicians);
      }).catch((error) => {
        console.error(error);
      })
  }

  sortUsersAndPhysicians() {
    const { users, groupPhysicians } = this.state
    const groupIds = [];

    for (var i = 0; i < groupPhysicians.length; i++) {
      groupIds.push(groupPhysicians[i].id)
    }

    const filteredUsers = users.filter(function (user) {
      let userIds = [];
      for (var i = 0; i < user.physicians.length; i++) {
        userIds.push(user.physicians[i].id)
      }
      console.log(groupIds, userIds)
      return groupIds.every(id => userIds.includes(id))
    });
    console.log(filteredUsers)

    if (groupIds.length > 1 && filteredUsers.length > 0) {

      for (var i = 0; i < filteredUsers.length; i++) {
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        console.log(filteredUsers[i])
        axios.delete('/api/user/userPhysicians/delete?userId=' + filteredUsers[i].id + '&physicianId=' + this.state.id,
          data, { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp)
          }).catch((error) => {
            console.error(error);
          })
        if (i === filteredUsers.length - 1) this.finalUpdate();
      }
    } else {
      this.finalUpdate();
    }
  }

  finalUpdate() {
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.put('/api/physicians/update?id=' + this.state.id + '&firstName=' + this.state.firstName + '&lastName=' + this.state.lastName +
      '&group=' + this.state.group + '&rep=' + this.state.rep + '&specialization=' + this.state.specialization +
      '&DEA=' + this.state.DEA + '&NPI=' + this.state.NPI + '&phone=' + this.state.phone + '&fax=' + this.state.fax +
      '&email=' + this.state.email + '&contact=' + this.state.contact + '&addressStreet=' + this.state.addressStreet + '&addressCity=' +
      this.state.addressCity + '&addressState=' + this.state.addressState + '&addressZipCode=' + this.state.addressZipCode + '&physicianWarning=' + this.state.physicianWarning,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);
        window.alert("Group updated. Physician users with access to the previous group will no longer be able to see details about this physician. If you would like them to be able to see this physician's details, please grant them access on the Physician Access page.")
        this.props.history.push(`/physicians/${this.state.id}`);
      }).catch((error) => {
        console.error(error);
      })

  }

  updatePhysician() {
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    if (this.state.oldGroup !== this.state.group) {
      this.fetchPhysicianUsers()
    } else {
      axios.put('/api/physicians/update?id=' + this.state.id + '&firstName=' + this.state.firstName + '&lastName=' + this.state.lastName +
        '&group=' + this.state.group + '&rep=' + this.state.rep + '&specialization=' + this.state.specialization +
        '&DEA=' + this.state.DEA + '&NPI=' + this.state.NPI + '&phone=' + this.state.phone + '&fax=' + this.state.fax +
        '&email=' + this.state.email + '&contact=' + this.state.contact + '&addressStreet=' + this.state.addressStreet + '&addressCity=' +
        this.state.addressCity + '&addressState=' + this.state.addressState + '&addressZipCode=' + this.state.addressZipCode + '&physicianWarning=' + this.state.physicianWarning,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          this.props.history.push(`/physicians/${this.state.id}`);
        }).catch((error) => {
          console.error(error);
        })
    }
  }

  render() {

    const {
      firstName, lastName, specialization, group, rep, DEA, NPI, phone, fax, email, contact, addressStreet, addressCity, addressState, addressZipCode, physicianWarning
    } = this.state

    const stateOptions = [
      "State",
      "AL",
      "AK",
      "AS",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "DC",
      "FM",
      "FL",
      "GA",
      "GU",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MH",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "MP",
      "OH",
      "OK",
      "OR",
      "PW",
      "PA",
      "PR",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VI",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY"
    ]

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

    if (this.state.reps) {
      const repOptions = [
        {
          key: '',
          value: '',
          display: 'Unassigned',
        },

        ...this.state.reps.map(rep => ({
          key: rep.name,
          value: rep.name,
          display: rep.name,
        })),
      ]

      console.log(this.state.rep);

      return (
        <div className={styles.app} id="addPhysician">
          <Header>
            <h2>Edit Physician</h2>
            <div className="action">
              <Button
                cancel
                type="button"
                title="CANCEL"
                link="/physicians"
                style={{ marginRight: 10 }}
              />
              <Button
                onClick={this.updatePhysician.bind(this)}
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

                  <Selector
                    label="Rep"
                    options={repOptions}
                    selected={this.state.rep}
                    value={rep}
                    onSelect={rep => this.setState({ rep })}
                  />

                  <Selector
                    wide
                    label="Specialization"
                    selected={this.state.specialization}
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

                  <Selector
                    placeholder="State"
                    options={stateOptions}
                    selected={addressState}
                    value={addressState}
                    onSelect={addressState => this.setState({ addressState })}
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
    } else { return (<div></div>) }

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
