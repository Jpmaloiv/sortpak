import React, { Component } from 'react';
import axios from 'axios'

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
    }
  }

  get inactive() {
    const {
      note,
    } = this.state

    return !note
  }

  onSubmit(e) {
    e.preventDefault()
        const scriptId = this.props.props.state.id;
        console.log(scriptId);
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.post('/api/scripts/notes/add?scriptId=' + scriptId + '&note=' + this.state.note, 
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
