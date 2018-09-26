import React, { Component } from 'react';
import { connect } from 'react-redux'
import validator from 'validator'

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
  createTeamMember,
} from '../../../../actions/team'

import styles from './AddMember.css'

class AddMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      role,
    } = this.state
    const data = {
      firstName,
      lastName,
      email,
      role,
    }
    // console.log('onSubmit', data)
    this.props.createTeamMember(data)
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      role,
    } = this.state

    const invalid = (
      !firstName
      || !lastName
      || !validator.isEmail(email)
      || !role
    )

    const roleOptions = [
      {
        display: 'Select Role...'
      },
      {
        value: 'admin',
        display: 'Admin',
      },
      {
        value: 'rep',
        display: 'Sales Rep',
      },
    ]

    return (
      <div>
        <Header>
          <h3>Add a New Team Member</h3>
        </Header>
        <Body className={styles.body}>
          <Form
            className="form"
            onSubmit={this.onSubmit.bind(this)}
          >
            <label>
              Team Member Name:
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
              Email:
            </label>
            <Input
              placeholder="Email"
              value={email}
              onChange={email => this.setState({ email })}
            />

            <br />

            <label>
              Role:
            </label>
            <Selector
              wide
              selected={role}
              options={roleOptions}
              onSelect={role => this.setState({ role })}
            />

            <br />

            <div className="buttons">
              <Button
                large
                cancel
                link="/team"
                title="CANCEL"
              />
              <Button
                large
                type="submit"
                title="CREATE MEMBER"
                inactive={invalid}
                onClick={this.onSubmit.bind(this)}
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
    loading,
  } = main

  return {
    loading,
  }
}

const actions = {
  createTeamMember,
}

export default connect(mapStateToProps, actions)(AddMember)
