import React, { Component } from 'react';
import { connect } from 'react-redux'

import { hasAuthTokenAsync } from '../../../../lib'

// Components
import {
  SwitchTable,
} from '../../../shared'

import {
  Input,
  Icon,
  Header,
  Body,
  Span,
} from '../../../common'
import DashboardTab from './DashboardTab'

// Actions
import {
  getMemberById,
  patchMemberById,
} from '../../../../actions/team'

import styles from './MemberView.css'

class MemberView extends Component {
  constructor(props) {
    super(props)
    this.tabOptions = [
      {
        value: 'dashboard',
        display: 'Dashboard',
        renderComponent: () => this.renderDashboardTab(),
      },
      {
        value: 'scripts',
        display: 'Prescriptions',
        renderComponent: () => this.renderScriptsTab(),
      },
      {
        value: 'physicians',
        display: 'Physicians',
        renderComponent: () => this.renderPhysiciansTab(),
      },
    ]

    this.state = this.initialState
  }

  get initialState() {
    const { user } = this.props
    const {
      firstName,
      lastName,
      group,
      email,
    } = user

    return {
      tab: this.tabOptions[0],
      editing: false,
      firstName,
      lastName,
      group,
      email,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps.user || null
  }

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        const { memberId } = this.props.match.params
        this.props.getMemberById(memberId)
      })
      .catch(console.log)
  }

  setEditState(editing) {
    this.setState({ ...this.initialState, editing })
  }

  save() {
    const id = this.props.user.id
    const {
      firstName,
      lastName,
      username,
      group,
      email,
    } = this.state

    const update = {
      firstName,
      lastName,
      username,
      group,
      email,
    }

    this.props.patchMemberById(id, update)

    this.setEditState(false)
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

  renderDashboardTab() {
    return (
      <DashboardTab />
    )
  }

  renderScriptsTab() {
    return (
      <div className={styles.scriptsTab}>
        <div className="header">
          Scripts
        </div>
      </div>
    )
  }

  renderPhysiciansTab() {
    return (
      <div className={styles.scriptsTab}>
        <div className="header">
          physicians list
        </div>
      </div>
    )
  }

  renderContactInfo() {
    const {
      editing,
      firstName,
      lastName,
      username,
      group,
      email,
    } = this.state

    const { user } = this.props

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
            Name:
            <Span>
              {user.nameDisplay}
            </Span>
          </div>
        )}

        <div>
          Group:
          <Span
            editing={editing}
            value={group}
            placeholder="Group Name"
            onChange={group => this.setState({ group })}
          >
            {group || 'None'}
          </Span>
        </div>
        <div>
          Username:
          <Span
            editing={editing}
            value={username}
            placeholder="Username"
            onChange={username => this.setState({ username })}
          >
            {username || 'None'}
          </Span>
        </div>
        <div>
          Email:
          <Span
            editing={editing}
            value={email}
            type="email"
            placeholder="user@gmail.com"
            onChange={email => this.setState({ email })}
          >
            {email || 'None'}
          </Span>
        </div>
      </div>
    )
  }

  render() {
    const { user } = this.props
    if (!user) {
      return null
    }

    const {
      editing,
    } = this.state

    const {
      nameDisplay,
    } = user

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
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team }) => {
  const {
    user,
    error,
  } = team

  const {
    me,
  } = auth

  return {
    user: user || {},
    error,
    me,
  }
}

const actions = {
  patchMemberById,
  getMemberById,
}

export default connect(mapStateToProps, actions)(MemberView);
