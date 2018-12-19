import React, { Component } from 'react';
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'

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
      username: '',
      password: '',
      confirmpw: '',
      active: false,
      physicianId: 1
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    if (loginToken) {
      var decoded = jwt_decode(loginToken);
      axios.get('../api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
            userRole: resp.data.response[0].role,
          }, () => console.log(this.state.userRole));
        }).catch((error) => {
          console.error(error);
        })
    } else {
      return;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCheckbox(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.password === this.state.confirmpw) {
      const loginToken = window.localStorage.getItem("token");

      let data = new FormData();
      axios.post('/api/user/new?physicianId=' + this.state.physicianId + '&username=' + this.state.username + '&name=' + this.state.name + '&email=' + this.state.email +
        '&password=' + this.state.password + '&role=' + this.state.role + '&active=' + this.state.active,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((data) => {
          console.log(data);
          this.props.history.push("/team");

        }).catch((error) => {
          console.error(error);
        })
    } else {
      alert("Passwords do not match");
    }
  }

  render() {
    const {
      username,
      name,
      email,
      password,
      confirmpw,
      role
    } = this.state


    const roleOptions = [
      {
        display: 'Select Role...'
      },
      {
        value: 'Admin',
        display: 'Admin',
      },
      {
        value: 'Rep',
        display: 'Sales Rep',
      },
      {
        value: 'Physician',
        display: 'Physician'
      }
    ]

    const roleOptionsRep = [
      {
        display: 'Select Role...'
      },
      {
        value: 'Physician',
        display: 'Physician'
      }
    ]

    return (
      <div className='addMember'>
        <Header>
          <h2>Access</h2>
          <div className='action'>
            <Button
              large
              cancel
              link="/team"
              title="CANCEL"
              style={{ marginRight: 10 }}
            />
            <Button
              onClick={this.handleSubmit}
              title="SAVE"
              className="submit btn btn-default"
              type="submit"
              value="Submit"
              style={{ marginRight: 8 }}
            />
          </div>
        </Header>
        <Body className={styles.body}>
          <Form
            className="form"
            onSubmit={this.handleSubmit}
          >
            <Input
              label='User Name'
              placeholder='Enter A User Name...'
              name='username'
              value={username}
              onChange={username => this.setState({ username })}
            />
            <label>
              Name:
            </label>
            <Input
              placeholder="Name"
              value={name}
              onChange={name => this.setState({ name })}
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

            <Input
              label='Password:'
              name='password'
              type='password'
              value={password}
              onChange={password => this.setState({ password })}
            />

            <Input
              label='Confirm Password:'
              name='confirmpw'
              type='confirmpw'
              value={confirmpw}
              onChange={confirmpw => this.setState({ confirmpw })}
            />

            {this.state.userRole === "Admin" ?
              <div>
                <label>
                  Role:
                </label>
                <Selector
                  wide
                  selected={role}
                  options={roleOptions}
                  onSelect={role => this.setState({ role })}
                />
              </div>
              :
              <div>
                <label>
                  Role:
                </label>
                <Selector
                  wide
                  selected={role}
                  options={roleOptionsRep}
                  onSelect={role => this.setState({ role })}
                />
              </div>
            }

            <div className='check'>
              <input
                type="checkbox"
                name="active"
                checked={this.state.active}
                onChange={this.handleCheckbox}
              />
              <label>ACTIVE</label>
            </div>

            <br />
          </Form>
        </Body>
      </div >
    );
  }
}

const mapStateToProps = ({ main }) => {
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
