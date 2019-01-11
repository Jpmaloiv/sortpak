import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

// Components
import {
  Button,
  TextArea,
  FormModal,
} from '../../common'

import styles from './NoteModal.css'

export default class VisitModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      private: false
    }
  }

  get inactive() {
    const {
      note,
    } = this.state

    return !note
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    this.setState({
      username: decoded.username
    })
  }

  handleCheckbox(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value) {
      this.setState({
        private: true
      })
    } else if (!value) {
      this.setState({
        private: false
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    console.log(this.props);
    const patientId = this.props.props.state.id;
    console.log(this.props.props);
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.post('/api/patients/notes/add?patientId=' + patientId + '&name=' + this.state.username + '&note=' + this.state.note + '&private=' + this.state.private,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);
        this.props.onClickAway()
        window.location.reload();
      }).catch((error) => {
        console.error(error);
      })
  }

  render() {

    const {
      content,
      onClickAway,
    } = this.props

    return (
      <FormModal
        title="Add a Note"
        onClickAway={onClickAway}
        visible={!!content}
        onSubmit={this.onSubmit.bind(this)}
        className="NoteModalPatient"
      >
        {/* Rep */}
        <label>
          Note
        </label>
        <TextArea
          placeholder="Add a note..."
          value={this.state.note}
          onChange={note => this.setState({ note })}
        />

        <div>
          <input type="checkbox" onChange={this.handleCheckbox.bind(this)} style={{ width: '25px' }}></input>
          <label style={{ 'display': 'inline' }}>Make Private</label>
        </div>

        <br />

        <div className="buttons">
          <Button
            large
            cancel
            type="button"
            title="Cancel"
            onClick={onClickAway}
          />
          <Button
            large
            inactive={this.inactive}
            type="submit"
            title="Post"
          />
        </div>
      </FormModal>
    )
  }
}
