import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  AsYouType,
  parseNumber,
  formatNumber,
} from '../../../../lib/phoneHelper'

import {
  unformatDate,
} from '../../../../lib/dateHelper'

import { hasAuthTokenAsync } from '../../../../lib'

// Components
import {
  SwitchTable,
  AddressModal,
  AddressLine,
} from '../../../shared'

import {
  Input,
  Icon,
  Header,
  Body,
  Span,
} from '../../../common'

import NotesTab from './Tabs/NotesTab'
import ScriptsTab from './Tabs/ScriptsTab'
import InsuranceTab from './Tabs/InsuranceTab'

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
        value: 'scripts',
        display: 'Prescriptions',
        renderComponent: () => this.renderScriptsTab(),
      },
      {
        value: 'insurance',
        display: 'Medical Insurance',
        renderComponent: () => this.renderInsuranceTab(),
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

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        const { patientId } = this.props.match.params
        this.props.getPatientById(patientId)
      })
      .catch(console.log)
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
      noteModal: null,
      addressModal: null,
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
      phone,
      dob,
      transferNpi,
      transferDate,
    } = this.state

    const { patient } = this.props
    const {
      nameDisplay,
      dobDisplay,
      address,
      phoneDisplay,
      transferDateDisplay
    } = patient

    return (
      <div className={styles.contactInfo}>
        {editing ? (
          <div className="name">
            Name:
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
            Name: {nameDisplay}
          </div>
        )}

        <div>
          Date of Birth:
          <Span
            editing={editing}
            type="date"
            value={dob}
            onChange={dob => this.setState({ dob })}
          >
            {dobDisplay || 'No date of birth set...'}
          </Span>
        </div>
        <div>
          Address:
          <AddressLine
            editing={editing}
            state={this.state}
            address={address}
            onChange={newState => this.setState(newState)}
          />
        </div>
        <div>
          Phone Number:
          <Span
            editing={editing}
            value={phone}
            placeholder="xxx xxx xxxx"
            onChange={this.handlePhoneChange.bind(this)}
          >
            {phoneDisplay || 'No Phone...'}
          </Span>
        </div>
        <div className="transfer">
          <Span
            type="number"
            label="Transfer Pharmacy NPI"
            editing={editing}
            value={transferNpi}
            placeholder="Transfer NPI"
            onChange={transferNpi => this.setState({ transferNpi })}
          >
            {patient.transferNpi || 'None'}
          </Span>
          <Span
            label="Transfer Pharmacy Date"
            type="date"
            editing={editing}
            value={transferDate}
            onChange={transferDate => this.setState({ transferDate })}
          >
            {transferDateDisplay || 'None'}
          </Span>
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

  renderScriptsTab() {
    return (
      <ScriptsTab
        className={styles.scriptsTab}
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
      editing,
      addressModal,
    } = this.state

    const {
      nameDisplay,
    } = patient

    return (
      <div>
        <Header className={styles.header}>
          <h2>
            {nameDisplay}
            {!editing ? (
              <div>
                <Icon
                  edit
                  onClick={() => this.setEditState(true)}
                />
              </div>
            ) : (
              <div>
                <Icon
                  cancel
                  onClick={() => this.setEditState(false)}
                />
                <Icon
                  save
                  onClick={() => this.save()}
                />
              </div>
            )}
          </h2>
        </Header>
        <Body className={styles.body}>

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
