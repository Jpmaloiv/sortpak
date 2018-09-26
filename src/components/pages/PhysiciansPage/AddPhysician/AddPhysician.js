import React, { Component } from 'react';
import { connect } from 'react-redux'

import { hasAuthTokenAsync } from '../../../../lib'

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
    hasAuthTokenAsync()
      .then(() => {
        this.props.getReps()
      })
      .catch(console.log)
  }

  onSubmit(e) {
    e.preventDefault()
    const {
      firstName,
      lastName,
      specialty,
      username,
      group,
      rep,
    } = this.state
    const data = {
      firstName,
      lastName,
      specialty,
      username,
      rep,
      group,
      role: 'physician',
    }
    this.props.createPhysician(data)
  }

  render() {
    const {
      reps,
    } = this.props

    const {
      firstName,
      lastName,
      username,
      specialty,
      group,
      rep,
    } = this.state

    const invalid = !firstName || !lastName

    const repOptions = [
      {
        key: '',
        value: '',
        display: 'Unassigned',
      },
      ...reps.map(rep => ({
        key: rep.id,
        value: rep.id,
        display: rep.nameDisplay,
      })),
    ]

    return (
      <div>
        <Header>
          <h3>Add a New Physician</h3>
        </Header>
        <Body className={styles.body}>
          <Form
            className="form"
            onSubmit={this.onSubmit.bind(this)}
          >
            <label>
              Physician Name:
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
              Username:
            </label>
            <Input
              placeholder="Username"
              value={username}
              onChange={username => this.setState({ username })}
            />

            <br />

            <label>
              Specialty:
            </label>
            <Input
              placeholder="Specialty"
              value={specialty}
              onChange={specialty => this.setState({ specialty })}
            />

            <br />

            <label>
              Group
            </label>
            <Input
              placeholder="Group"
              value={group}
              onChange={group => this.setState({ group })}
            />

            <br />

            <label>
              Sales Representative
            </label>
            <Selector
              wide
              selected={rep}
              options={repOptions}
              onSelect={rep => this.setState({ rep })}
            />

            <br />

            <div className="buttons">
              <Button
                large
                cancel
                type="button"
                title="CANCEL"
                link="/physicians"
              />
              <Button
                large
                type="submit"
                title="CREATE PHYSICIAN"
                inactive={invalid}
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
