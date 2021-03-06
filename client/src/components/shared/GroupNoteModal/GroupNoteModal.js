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

export default class GroupNoteModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: ''
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
    console.log(this)
    const patientId = this.props.props.state.id;

    // Allows literal hashtags to be written in note
    const note = this.state.note.replace(/#/g, "%23");

    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.post('/api/groupNotes/add?group=' + this.props.props.pID.match.params.group + '&name=' + this.state.username + '&note=' + note,
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
