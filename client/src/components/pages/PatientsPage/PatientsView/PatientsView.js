import React, { Component } from 'react';
import { connect } from 'react-redux'

import { hasAuthTokenAsync } from '../../../../lib'

import {
  Span,
  Table,
  Header,
  ActionBox,
  Button,
  SearchBar,
} from '../../../common'

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
      phone: ''
    }
  }
  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        this.props.getPatients()
      })
      .catch(console.log)
  }

  searchByName(name) {
    const dob = ''
    this.setState({ name, dob })
    this.props.filterPatientsByName(name)
  }

  searchByDob(dob) {
    const name = ''
    this.setState({ name, dob })
    this.props.filterPatientsByDob(dob)
  }

  renderTableHead() {
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
    const { patients } = this.props
    return (
      <tbody>
        {patients.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(patient) {
    const address = patient.address ? patient.address.street1 : 'None'
    return (
      <tr key={patient.id}>
        <td>
          {patient.nameDisplay}
        </td>

        <td>
          <Span icon="calendar">
            {patient.dobDisplay || 'None'}
          </Span>
        </td>

        <td>
          <Span icon="phone">
            {patient.phoneDisplay || 'None'}
          </Span>
        </td>

        <td>
          {address}
        </td>

        <td className={styles.detailsCell}>
          <Button
            title="DETAILS"
            link={`/patients/${patient.id}`}
            onClick={() => this.props.setPatient(patient)}
          />
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
    const {
      name,
      dob,
    } = this.state

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
                value={name}
                onChange={this.searchByName.bind(this)}
              />
              <SearchBar
                label="Search By DOB"
                type="date"
                value={dob}
                onChange={this.searchByDob.bind(this)}
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
