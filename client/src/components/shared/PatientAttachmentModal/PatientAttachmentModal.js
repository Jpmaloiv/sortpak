import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'


// Components
import {
  Button,
  Selector,
  FormModal,
} from '../../common'

import styles from './PatientAttachmentModal.css'

export default class PatientAttachmentModal extends Component {
  /* constructor(props) {
    super(props)
  } */
  state = {
    patientFile: '',
    dateAttached: '',
    type: ''
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    this.setState({
      userId: decoded.id,
      username: decoded.username
    })
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  get inactive() {
    const {
      patientFile,
      type
    } = this.state

    return !patientFile, !type
  }

  onSubmit(e) {
    console.log(this.state)
    e.preventDefault()
    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    data.append("patientFile", document.getElementById("pdf-file").files[0])
    axios.post('/api/patientAttachments/upload?patientId=' + this.props.props.state.id + '&userId=' + this.state.userId + '&dateAttached=' + this.state.dateAttached + "&attachedBy=" + this.state.username + "&type=" + this.state.type,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        this.submitS3(data);
      }).catch((error) => {
        console.error(error);
      })
  }

  submitS3() {
    const files = document.getElementById('pdf-file').files;
    console.log(files)
    const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  };

  getSignedRequest(file) {
    const loginToken = window.localStorage.getItem("token");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/patientAttachments/sign-s3?file-name=${file.name}&file-type=${file.type}&patientId=` + this.props.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // document.getElementById('preview').src = url;
          // document.getElementById('avatar-url').value = url;
          this.props.onClickAway()
          console.log(url)
          window.open(url)
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }


  render() {
    const {
      content,
      onClickAway,
    } = this.props

    const {
      patientFile,
      type
    } = this.state

    const typeOptions = [
      '--',
      'Insurance Card',
      'Assignment of Benefits',
      'Patient Agreement Form',
      'Other'
    ]

    return (
      <FormModal
        title="Add File"
        onClickAway={onClickAway}
        visible={!!content}
        onSubmit={this.onSubmit.bind(this)}
        className={styles.modal}
      >
        <label htmlFor="patientFile">Select PDF:</label>
        <input name="patientFile" selected={patientFile} onSelect={patientFile => this.setState({ patientFile })} onChange={this.onChangeHandler} accept=".pdf" id="pdf-file" type="file" />

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
            inactive={this.inactive}
            type="submit"
            title="Post"
          />
        </div>
      </FormModal>
    )
  }
}
