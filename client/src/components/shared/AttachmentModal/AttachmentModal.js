import React, { Component } from 'react';
import axios from 'axios'

// Components
import {
  Button,
  Selector,
  FormModal,
} from '../../common'

import styles from './AttachmentModal.css'

export default class AttachmentModal extends Component {
  constructor(props) {
    super(props)
  }
    state = {
      attachmentFile: '',
      dateAttached: '',
      attachedBy: '',
      type: ''
    }
  

  onChangeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

  get inactive() {
    const {
      scriptFile,
      // type
    } = this.state

    return !scriptFile
    // return !type
  }

  onSubmit(e) {
    e.preventDefault()
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        data.append("attachmentFile", document.getElementById("pdf-file").files[0])
        axios.post('/api/scripts/attachments/add?dateAttached=' + this.state.dateAttached + "&attachedBy=" + this.state.attachedBy + "&type=" + this.state.type, 
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                this.props.onClickAway()
                // this.setState({ scriptFile: '', type: '' })
                window.location.reload();
                // this.props.history.push("/scripts");              
            }).catch((error) => {
                console.error(error);
            })
          }


  render() {
    const {
      content,
      onClickAway,
    } = this.props

    const {
      attachmentFile,
      type
    } = this.state

    const typeOptions = [
      'Rx',
      'Delivery Signature',
      'PA form',
      'Medical Notes',
      'Copay Assistance Form',
      'Income Documents',
      'Shipping Label',
      'Other'
    ]  

    return (
      <FormModal
        title="Add Attachment"
        onClickAway={onClickAway}
        visible={!!content}
        onSubmit={this.onSubmit.bind(this)}
        className={styles.modal}
      >
        <label htmlFor="attachmentFile">Select PDF:</label>
        <input name="attachmentFile" selected={attachmentFile} onSelect={attachmentFile => this.setState({ attachmentFile })} onChange={this.onChangeHandler} accept=".pdf" id="pdf-file" type="file" />

        <br />

        <Selector
            wide
            selected={type}
            options={typeOptions}
            onSelect={type => this.setState({ type })}
          />

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
            // inactive={this.inactive}
            type="submit"
            title="Post"
          />
        </div>
      </FormModal>
    )
  }
}
