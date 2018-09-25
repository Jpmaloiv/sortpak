import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import { hasAuthTokenAsync } from '../../../../lib'
import { formatNumber, unformatNumber } from '../../../../lib/phoneHelper'

// Components
import ContactInfo from './ContactInfo'
import MiscInfo from './MiscInfo'

import {
  VisitModal,
  NoteModal,
  SwitchTable,
  AddressModal,
} from '../../../shared'

import {
  Icon,
  Button,
  Header,
  Body,
  DateBox,
  Span,
} from '../../../common'

// Actions
import {
  createVisit,
} from '../../../../actions/main'

import {
  createNote,
  getPhysicianById,
  patchPhysicianById,
  clearState,
} from '../../../../actions/physicians'

import styles from './PhysicianView.css'

class PhysicianView extends Component {
  constructor(props) {
    super(props)
    this.tabOptions = [
      {
        value: 'notes',
        display: 'Schedule/Notes',
        renderComponent: () => this.renderScheduleTab(),
      },
      {
        value: 'scripts',
        display: 'Scripts',
        renderComponent: () => this.renderScriptsTab(),
      },
      {
        value: 'online',
        display: 'Online Access',
        renderComponent: () => this.renderOnlineTab(),
      },
    ]

    this.state = this.initialState
  }

  get initialState() {
    const physician = this.props.physician || {}
    const {
      firstName,
      lastName,
      group,
      specialty,
      address,
      username,
      phone,
      fax,
      rep,
      npi,
      dea,
      pointOfContact,
    } = physician

    return {
      // [notes, scripts, online]
      tab: this.tabOptions[0],
      editing: false,
      // contact info
      firstName,
      lastName,
      group,
      specialty,
      // contact box
      phone: formatNumber(phone),
      fax: formatNumber(fax),
      address,
      // misc info
      npi,
      dea,
      repId: rep ? rep.id : '',
      pointOfContact,
      // online tab
      username,
      password: '',
      // modals
      addressModal: null,
      visitModal: null,
      noteModal: null,
    }
  }

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        const { physicianId } = this.props.match.params
        this.props.getPhysicianById(physicianId)
      })
      .catch(console.log)
  }

  save() {
    const id = this.props.physician.id
    const {
      username,
      password,
      firstName,
      lastName,
      group,
      specialty,
      phone,
      fax,
      address,
      pointOfContact,
      repId,
      npi,
      dea,
    } = this.state

    const update = {
      username,
      firstName,
      lastName,
      group,
      specialty,
      phone: unformatNumber(phone),
      fax: unformatNumber(fax),
      address,
      pointOfContact,
      repId,
      npi,
      dea,
    }

    if (password) {
      update.password = password
    }

    this.props.patchPhysicianById(id, update)

    this.setEditState(false)
  }

  setEditState(editing) {
    const password = ''
    let username = ''

    if (editing) {
      username = this.props.physician.username || ''
    }

    // retain selected tab
    const { tab } = this.state

    const newState = {
      ...this.initialState,
      tab,
      editing,
      username,
      password,
    }

    this.setState(newState)
  }

  openVisitModal() {
    const { physician } = this.props

    const visitModal = {
      physician,
    }

    this.setState({ visitModal })
  }

  openNoteModal(visit) {
    const noteModal = {
      visit,
    }

    this.setState({ noteModal })
  }

  closeModal() {
    this.setState({
      noteModal: null,
      visitModal: null,
      addressModal: null,
    })
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

  renderScheduleTab() {
    const { physician } = this.props

    if (!physician) {
      return null
    }

    const { visits } = physician

    const {
      visitModal,
      noteModal,
    } = this.state

    return (
      <div className={styles.notesTab}>
        <div className="header">
          <Button
            icon="plus"
            title="ADD VISIT?"
            onClick={() => this.openVisitModal()}
          />
        </div>
        <div className="visits">
          {visits.map(this.renderVisit.bind(this))}
        </div>

        <VisitModal
          content={visitModal}
          onSubmit={data => this.props.createVisit(data)}
          onClickAway={() => this.closeModal()}
        />

        <NoteModal
          content={noteModal}
          onSubmit={data => this.props.createNote(data)}
          onClickAway={() => this.closeModal()}
        />
      </div>
    )
  }

  renderVisit(visit) {
    const notes = visit.notes || []
    return (
      <div key={visit.id} className="visit">
        <DateBox
          visit={visit}
          buttonTitle="ADD NOTE"
          buttonIcon="plus"
          onClick={() => this.openNoteModal(visit)}
        />
        {notes.map(note => (
          <DateBox
            key={note.id}
            note={note}
          />
        ))}
      </div>
    )
  }

  renderScriptsTab() {
    return (
      <div className={styles.scriptsTab}>
        <div className="header">
          <h2>Scripts Go Here</h2>
        </div>
      </div>
    )
  }

  renderOnlineTab() {
    const {
      editing,
    } = this.state

    const {
      username,
      password,
      lastLogin,
    } = this.props.physician

    const loginDate = lastLogin ? moment(lastLogin).format('M/D/YY @ hh:mm A') : `Hasn't Logged In`

    return (
      <div className={styles.onlineTab}>
        <div className="item">
          <label>
            Username
          </label>
          <Span
            placeholder="Username"
            editing={editing}
            value={this.state.username}
            onChange={username => this.setState({ username })}
          >
            {username || 'Enter a Username'}
          </Span>
        </div>

        <div className="item">
          <label>
            Password
          </label>
          <Span
            placeholder="Password"
            editing={editing}
            value={this.state.password}
            onChange={password => this.setState({ password })}
          >
            {password ? '******' : 'Create a Password'}
          </Span>
        </div>

        <div className="item">
          <label>
            Last Logged In
          </label>
          <Span>
            {loginDate}
          </Span>
        </div>
      </div>
    )
  }

  render() {
    const { physician } = this.props
    if (!physician) {
      return null
    }

    const { editing } = this.state

    const {
      nameDisplay,
      group,
    } = physician

    return (
      <div>
        <Header className={styles.header}>
          <h2>
            {nameDisplay}
            <span className="group">
              {group || 'No Group Available'}
            </span>
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
          <ContactInfo
            className={styles.contactInfo}
            physician={physician}
            editing={editing}
            state={this.state}
            onChange={newState => this.setState(newState)}
            closeModal={() => this.closeModal()}
          />

          <MiscInfo
            className={styles.miscInfo}
            physician={physician}
            editing={editing}
            state={this.state}
            onChange={newState => this.setState(newState)}
          />

          {this.renderSwitchTable()}
        </Body>

        {/* Address Modal */}
        <AddressModal
          content={this.state.addressModal}
          onSubmit={address => this.setState({ address })}
          onClickAway={() => this.closeModal()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, physicians }) => {
  const {
    physician,
    error,
  } = physicians

  const {
    me,
  } = auth

  return {
    physician,
    error,
    me,
  }
}

const actions = {
  createVisit,
  createNote,
  clearState,
  patchPhysicianById,
  getPhysicianById,
}

export default connect(mapStateToProps, actions)(PhysicianView);