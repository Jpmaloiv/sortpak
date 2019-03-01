import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

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
    console.log(decoded);
    this.setState({
      userId: decoded.id,
      username: decoded.username
    }, this.getUserInfo)
  }

  getUserInfo() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/user/search?userId=' + this.state.userId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        this.setState({
          userName: resp.data.response[0].name,
          userImage: resp.data.response[0].link
        })
      }).catch((err) => {
        console.error(err)
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
    const dateTime = moment().format();
    const scriptId = this.props.props.state.id;

    // Allows literal hashtags to be written in note
    const note = this.state.note.replace(/#/g, "%23");

    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    console.log(this.state.note);
    axios.post('/api/scripts/notes/add?scriptId=' + scriptId + '&userId=' + this.state.userId + '&name=' + this.state.userName + '&note=' + note + '&userImage=' + this.state.userImage + '&private=' + this.state.private,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);

        axios.put('/api/scripts/updateNoteTime?id=' + scriptId + '&notesUpdated=' + dateTime,
          data, { headers: { "Authorization": "Bearer " + loginToken } })
          .then((data) => {
          }).catch((error) => {
            console.error(error);
          })

        this.props.onClickAway()
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
        className={styles.modal}
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
