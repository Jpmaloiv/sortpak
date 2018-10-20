import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'


import {Span, Table, Header, Button, ActionBox, SearchBar} from '../../../common'

import {
  getPatients,
  filterPatientsByName,
  filterPatientsByDob,
} from '../../../../actions/main'

import {
  setPatient,
} from '../../../../actions/patients'

import styles from './PatientsView.css'

class PatientsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      dob: '',
      address: '',
      phone: '',
      file: ''
    }
  }
  componentDidMount() {
      const loginToken = window.localStorage.getItem("token");
        axios.get('api/patients/search/', { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp.data.response);
            this.setState({
                patients: resp.data.response,
                // id: resp.data.response.id,   
            })
            console.log(this.state.patients)
          }).catch((error) => {
            console.error(error);
        })
  }

  /* searchByName(name) {
    const dob = ''
    this.setState({ name, dob })
    this.props.filterPatientsByName(name)
  }

  searchByDob(dob) {
    const name = ''
    this.setState({ name, dob })
    this.props.filterPatientsByDob(dob)
  } */

  renderTableHead() {
    console.log(this.state.patients);
    return (
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Date of Birth
          </th>
          <th>
            Phone Number
          </th>
          <th>
            Address
          </th>
          <th/>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    // const { patients } = this.props
    return (
      <tbody>
        {this.state.patients.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location=`/patients/${value}`
  }

  renderTableRow(patient) {
    return (
      <tr value={patient.id} onClick={() => this.handleClick(patient.id)}>
        <td>
          {patient.firstName} {patient.lastName}
        </td>

        <td>
          <Span icon="calendar">
            {patient.dob || 'None'}
          </Span>
        </td>

        <td>
          <Span icon="phone">
            {patient.phone || 'None'}
          </Span>
        </td>

        <td>
          {patient.address1}
          <br />
          {patient.address2}
        </td>
      </tr>
    )
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  render() {

    if (this.state.patients) {
      // const self = this;

var patientList = this.state.patients.map(function (item, i) {
          console.log(item);
          return (
              <div key={i}>
                  {/* <div className="story-title-author">
                          <h3 className="story-title">{item.patient}</h3>
                
                      <h5 className="story-author">
                          {!(self.props.match.params.username)
                              ?
                              <div style={{ marginLeft: "5px" }} className="btn-group" role="group">
                                  <button onClick={() => self.showUpdForm(item)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>
                                  <button onClick={() => self.deleteBook(item.id)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
                              </div>
                              : null
                          }
                      </h5>
                  </div>
                  
                  <p>{item.description}</p>
                  <br /> */}
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
      <div className={styles.app}>

        <Header>

          <h2>
            Select a Patient
          </h2>

          <div className="action">
            <Button
              title="MERGE PATIENT"
              style={{backgroundColor: "#ff7d38", marginRight: 10 }}
            />

            <Button
              link="/patients/add"
              icon="plus"
              title="ADD A NEW PATIENT"
              style={{ marginRight: 8 }}
            />

        </div>

        </Header>

        <div className="body">

          <ActionBox>
            <div className="main">

              <SearchBar
                label="Search By Name"
                placeholder="First or Last Name..."
                // value={name}
                // onChange={this.searchByName.bind(this)}
              />
              <SearchBar
                label="Search By DOB"
                type="date"
                // value={dob}
                // onChange={this.searchByDob.bind(this)}
              />
            <SearchBar
                label="Search By Address"
                type="address"
                placeholder="Address or City"
              />
            <SearchBar
                label="Search by Phone"
                type="phone"
                placeholder="(---) --- ---"
            />
          
            {/*
              TODO: Automatic filter, no search button
              <Button
                search
                icon="search"
                title="SEARCH"
              />
            */}

            </div>

          </ActionBox>


          {this.renderTable()}
          {patientList}

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    patientsDisplay,
    loading,
    error,
  } = main

  return {
    patients: patientsDisplay,
    loading,
    error,
  }
}

const actions = {
  getPatients,
  setPatient,
  filterPatientsByName,
  filterPatientsByDob,
}

export default connect(mapStateToProps, actions)(PatientsView);
