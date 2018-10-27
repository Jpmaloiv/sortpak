import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment'

// import GoogleMaps from '../../../shared/GoogleMaps/GoogleMaps.js'

import {
  AsYouType,
  parseNumber,
  formatNumber,
} from '../../../../lib/phoneHelper'

import {
  unformatDate,
} from '../../../../lib/dateHelper'

// Components
import { SwitchTable, AddressModal } from '../../../shared'

import { Body, Button, Header, Input, Span } from '../../../common'

import PrescriptionsTab from './Tabs/PrescriptionsTab'
import InsuranceTab from './Tabs/InsuranceTab'
import FilesTab from './Tabs/FilesTab'
import NotesTab from './Tabs/NotesTab'

// Actions
import {
  createPatientNote,
  getPatientById,
  patchPatientById,
} from '../../../../actions/patients'

import styles from './PatientView.css'

class PatientView extends Component {
  constructor(props) {
    super(props)
    this.tabOptions = [
      {
        value: 'prescriptions',
        display: 'Prescriptions',
        renderComponent: () => this.renderPrescriptionsTab(),
      },
      {
        value: 'insurance',
        display: 'Medical Insurance',
        renderComponent: () => this.renderInsuranceTab(),
      },
      {
        value: 'files',
        display: 'Files/Docs',
        renderComponent: () => this.renderFilesTab()
      },
      {
        value: 'notes',
        display: 'More Info/Notes',
        renderComponent: () => this.renderNotesTab(),
      },
    ]

    this.state = {
      tab: this.tabOptions[0],
      ...this.initialState,
    }
  }

  componentDidMount() {
    if (this.props.match.params.patientId) {
      const loginToken = window.localStorage.getItem("token");
      axios.get('/api/patients/search?patientId=' + this.props.match.params.patientId, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          let patient = resp.data.response[0]
          this.setState({
            name: patient.firstName + " " + patient.lastName,
            id: patient.id,
            dob: patient.dob,
            sex: patient.sex,
            patientSince: patient.createdAt,
            phone: patient.phone,
            address: patient.address1 + "\n" + patient.address2,
            email: patient.email
          })
        }).catch((err) => {
          console.error(err)
        })
    }

    const loginToken = window.localStorage.getItem("token");
    let patientId = (this.props.match.params.patientId) ? this.props.match.params.patientId : JSON.parse(window.atob(loginToken.split('.')[1])).patientId;
    axios({
      url: '/api/profile/' + patientId,
      method: 'get',
      headers: { "Authorization": "Bearer " + loginToken }
    })
      .then((resp) => {
        console.log(resp);
        this.setState({
          patientId: resp.data.id
        })

        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        console.log(this.state.patientId);

        axios.put('/api/current/add?patientId=' + this.state.patientId,
          data, { headers: { "Authorization": "Bearer " + loginToken } })
          .then((data) => {
            console.log(data);
            // window.location = '/profile';

          }).catch((error) => {
            console.error(error);
          })

      }).catch((error) => {
        console.error(error);
      })

  }

  get initialState() {
    const { patient } = this.props
    const {
      firstName,
      lastName,
      address,
      dob,
      transferNpi,
      transferDate,
      primaryInsurance,
      secondaryInsurance,
      warning,
    } = patient

    const phone = formatNumber(patient.phone)

    const contactInfoState = {
      firstName: firstName || '',
      lastName: lastName || '',
      phone,
      dob: dob || '1970-01-01',
      transferNpi,
      transferDate,
    }

    const notesState = {
      warning,
    }

    const insuranceState = {
      primaryInsurance: primaryInsurance || {},
      secondaryInsurance: secondaryInsurance || {},
    }

    const addressState = {
      address,
      addressModal: null,
    }

    return {
      editing: false,
      ...contactInfoState,
      ...notesState,
      ...insuranceState,
      ...addressState,
    }
  }

  setEditState(editing) {
    this.setState({ ...this.initialState, editing })
  }

  createNote({ text }) {
    const patientId = this.props.patient.id
    const data = {
      text,
      patientId,
    }
    this.props.createPatientNote(data)
  }

  closeModal() {
    this.setState({
      attachmentModal: null,
    })
  }

  handlePhoneChange(val) {
    if (val.length > 14) {
      return
    }

    const phone = new AsYouType('US').input(val)

    this.setState({ phone })
  }

  insuranceHasFields(data) {
    return (
      data.plan
      || data.bin
      || data.planId
      || data.pcn
      || data.type
    )
  }

  save() {
    const id = this.props.patient.id
    const {
      firstName,
      lastName,
      address,
      warning,
      transferNpi,
      primaryInsurance,
      secondaryInsurance,
    } = this.state

    const { phone } = parseNumber(this.state.phone, 'US')

    const dob = unformatDate(this.state.dob)
    const transferDate = unformatDate(this.state.transferDate)

    const update = {
      firstName,
      lastName,
      dob,
      phone,
      address,
      warning,
      transferNpi,
      transferDate,
    }

    if (this.insuranceHasFields(primaryInsurance)) {
      update.primaryInsurance = primaryInsurance
    }

    if (this.insuranceHasFields(secondaryInsurance)) {
      update.secondaryInsurance = secondaryInsurance
    }

    this.props.patchPatientById(id, update)

    this.setEditState(false)
  }

  renderContactInfo() {
    const {
      editing,
      firstName,
      lastName,
      dob
    } = this.state



    return (
      <div>
        <div className="flex-grid">
          <div id="contactInfo" className={styles.contactInfo}>
            {editing ? (
              <div className="name">
                Name:
                {this.state.name}
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
              </div>
            ) : (
                <div>
                  Name: {this.state.name}
                </div>
              )}

            <div>
              Patient ID: #{this.state.id}
            </div>

            <div>
              Date of Birth:
              <Span
                editing={editing}
                type="date"
                value={dob}
                onChange={dob => this.setState({ dob })}
              >
                {this.state.dob}
              </Span>
            </div>
            <div>
              Sex: {this.state.sex}
            </div>
            <div>
              Patient Since: <Moment format={"YYYY-MM-DD"}>{this.state.createdAt}</Moment>
            </div>
          </div>
          <div id="contactInfo" className={styles.contactInfo}>

            <GoogleMaps
              address={this.state.address}
             />

          </div>
          <div id="contactInfo" className={styles.contactInfo}>


            <div>
              <Span icon="phone">
                {this.state.phone}
              </Span>
            </div>
            <div>
              <Span icon="building">
                {this.state.address}
              </Span>
            </div>
            <div>
              <Span className="blue" icon="envelope">
                {this.state.email}
              </Span>
            </div>
          </div>
        </div>
      </div>

    )
  }


  renderSwitchTable() {
    const { tab } = this.state
    return (
      <SwitchTable
        tabs={this.tabOptions}
        selected={tab}
        onClick={tab => this.setState({ tab })}
      />
    )
  }

  renderPrescriptionsTab() {
    return (
      <PrescriptionsTab
        className={styles.scriptsTab}
        pID={this.props}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
      />
    )
  }

  renderInsuranceTab() {
    return (
      <InsuranceTab
        className={styles.insuranceTab}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
      />
    )
  }

  renderFilesTab() {
    return (
      <FilesTab
        className={styles.filesTab}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
        onCloseModal={() => this.closeModal()}
      />
    )
  }

  renderNotesTab() {
    return (
      <NotesTab
        className={styles.notesTab}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
        onCreateNote={this.createNote.bind(this)}
        onCloseModal={() => this.closeModal()}
      />
    )
  }

  render() {
    const { patient } = this.props
    if (!patient) {
      return null
    }

    const {
      addressModal
    } = this.state

    return (
      <div>
        <Header className={styles.header}>
          <h2>{this.state.name}
            <div className="action">
              <Button
                search
                icon="edit"
                title="EDIT PATIENT"
                style={{ marginLeft: 8 }}
              />

              <Button
                icon="plus"
                title="ADD A NEW SCRIPT"
                link="/scripts/add"
                style={{ marginLeft: 8 }}
              />

            </div>
          </h2>

        </Header>

        <Body id="patientView" className={styles.body}>
          {this.renderContactInfo()}

          <div className="switch-buffer" />

          {this.renderSwitchTable()}
        </Body>

        {/* Address Modal */}
        <AddressModal
          content={addressModal}
          onSubmit={address => this.setState({ address })}
          onClickAway={() => this.closeModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, patients }) => {
  const {
    patient,
    error,
  } = patients

  const {
    me,
  } = auth

  return {
    patient: patient || {},
    error,
    me,
  }
}

const actions = {
  createPatientNote,
  patchPatientById,
  getPatientById,
}

export default connect(mapStateToProps, actions)(PatientView);
