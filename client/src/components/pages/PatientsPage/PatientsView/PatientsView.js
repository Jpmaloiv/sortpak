import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment'
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { Span, Table, Input, Header, Button, ActionBox, SearchBar } from '../../../common'

import {
  getPatients,
  filterPatientsByName,
  filterPatientsByDob,
} from '../../../../actions/main'

import MergePatientModal from '../../../shared/MergePatientModal/MergePatientModal'

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
      file: '',
      mergeModal: '',
      searchName: '',
      searchDOB: '',
      searchAddress: '',
      searchPhone: ''
    }
    this.searchQuery = this.searchQuery.bind(this);
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('api/patients/search/', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp.data.response);
        this.setState({
          patients: resp.data.response
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  addAddressField = () => {
    this.setState(prevState => {
      return { addressNum: prevState.addressNum + 1 }
    })
  }

  addPhoneField = () => {
    this.setState(prevState => {
      return { phoneNum: prevState.phoneNum + 1 }
    })
  }

  openNoteModal() {
    this.setState({ mergeModal: {} })
  }

  closeModal() {
    this.setState({
      mergeModal: null
    })
  }

  searchQuery() {
    let searchDOB = ''
    if (this.state.searchDOB) searchDOB = moment(this.state.searchDOB).format("MM/DD/YYYY");
    const loginToken = window.localStorage.getItem("token");
    axios.get('api/patients/search?name=' + this.state.searchName + '&dob=' + searchDOB + '&address=' + this.state.searchAddress, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp.data.response);
        this.setState({
          patients: resp.data.response,
        }, () => console.log(this.state.patients))
      }).catch((error) => {
        console.error(error);
      })
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) { //13 is the enter keycode
      this.searchQuery();
    }
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
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.patients.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location = `/patients/${value}`
  }

  renderTableRow(patient) {
    return (
      <tr value={patient.id} onClick={() => this.handleClick(patient.id)}>
        <td>
          {patient.firstName} {patient.lastName}
        </td>

        <td>
          <Span icon="calendar">
            <Moment format="MM/DD/YYYY">{patient.dob || 'None'}</Moment>
          </Span>
        </td>

        <td>
          <Span icon="phone">
            {patient.phone || 'None'}
          </Span>
        </td>

        <td>
          {patient.addressStreet}<br />
          {patient.addressCity}, {patient.addressState}, {patient.addressZipCode}
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

    const columns = [{
      Header: 'Name',
      accessor: 'firstName',
      Cell: props =>
        <span>
          {props.original.firstName} {props.original.lastName}
        </span>
    }, {
      Header: 'Date of Birth',
      accessor: 'dob',
      Cell: props =>
        <Span icon="calendar">
          <Moment format="MM/DD/YYYY">{props.original.dob || 'None'}</Moment>
        </Span>
    }, {
      Header: 'Phone Number',
      accessor: 'phone',
      Cell: props =>
        <Span icon="phone">{props.original.phone || 'None'}</Span>
    }, {
      Header: 'Address',
      accessor: 'address',
      Cell: props =>
        <span>
          {props.original.addressStreet}<br />
          {props.original.addressCity}, {props.original.addressState}, {props.original.addressZipCode}
        </span>
    }]

    const {
      mergeModal
    } = this.state;

    if (this.state.patients) {
      var patientList = this.state.patients.map(function (item, i) {
        return (
          <div key={i}>
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
              style={{ backgroundColor: "#ff7d38", marginRight: 10 }}
              onClick={this.openNoteModal.bind(this)}
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

          <ActionBox className='searchBar'>
            <div className="main" style={{ paddingTop: 0 }}>

              <Input
                label="Search By Name"
                placeholder="First or Last Name..."
                value={this.state.searchName}
                onChange={searchName => this.setState({ searchName })}
                onKeyPress={this.enterPressed.bind(this)}
              />
              <Input
                label="Search By DOB"
                type="date"
                value={this.state.searchDOB}
                onChange={searchDOB => this.setState({ searchDOB })}
                onKeyPress={this.enterPressed.bind(this)}
              />
              <Input
                label="Search By Address"
                placeholder="Address or City"
                value={this.state.searchAddress}
                onChange={searchAddress => this.setState({ searchAddress })}
                onKeyPress={this.enterPressed.bind(this)}
              />
              <Input
                label="Search by Phone"
                type="phone"
                placeholder="(---) --- ---"
                value={this.state.searchPhone}
                onChange={searchPhone => this.setState({ searchPhone })}
                onKeyPress={this.enterPressed.bind(this)}
              />

              <Button
                search
                icon="search"
                title="SEARCH"
                onClick={this.searchQuery}
              />


            </div>

          </ActionBox>

          <ReactTable
            className="reactTable"
            data={this.state.patients}
            columns={columns}
            getTrProps={(state, rowInfo, column, instance) => ({
              onClick: e => window.location = `/patients/${rowInfo.original.id}`
            })}
          />
          {/* {this.renderTable()}
          {patientList} */}

          <div className="mergePatient">
            <MergePatientModal
              content={mergeModal}
              // onSubmit={this.openReceiptModals}
              state={this.state}
              patientId={this.state.PatientId}
              props={this.props}
              onClickAway={() => this.closeModal()}
            // onCloseModal={() => this.closeModal()}
            />
          </div>

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
