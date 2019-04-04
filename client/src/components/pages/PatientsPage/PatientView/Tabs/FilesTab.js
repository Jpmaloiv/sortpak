import React, { Component } from 'react';
import axios from 'axios'

import Moment from 'react-moment'

// Components
import { Button, Span, Table } from '../../../../common'

import {
  PatientAttachmentModal
} from '../../../../shared/'

class FilesTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateAttached: '',
      type: ''
    }
  }

  openNoteModal() {
    this.props.setState({ fileModal: {} })
  }

  componentWillReceiveProps() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patientAttachments/search?patientId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          attachments: resp.data.response,
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  reRender() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patientAttachments/search?patientId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          attachments: resp.data.response,
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/patientAttachments/search?patientId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          attachments: resp.data.response,
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  deleteAttachment(id, name) {
    if (window.confirm('Delete this attachment?')) {
      const loginToken = window.localStorage.getItem("token");
      axios.delete('/api/patientAttachments/delete?attachmentId=' + id + '&patientId=' + this.props.state.id + '&name=' + name ,
        { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success == true) this.reRender();
        }).catch((error) => {
          console.error(error);
        })
    } else {
      return;
    }
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            File
          </th>
          <th>
            Date Attached
          </th>
          <th>
            Attached By
          </th>
          <th>
            Type
          </th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.attachments.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(attachment) {
    return (
      <tr key={attachment.id}>
        <td style={{ display: 'flex', alignItems: 'center' }}>
          <a href={attachment.link} target='_blank' activeClassName="active">
            <h3>{attachment.title}</h3>
          </a>
          <Span icon="remove" style={{padding: 8}} onClick={this.deleteAttachment.bind(this, attachment.id, attachment.title)} />
        </td>
        <td>
          <Moment format={"MM/DD/YYYY"}>{`${attachment.createdAt}`}</Moment>
        </td>

        <td>
          {attachment.attachedBy}
        </td>

        <td>
          {attachment.type}
        </td>
      </tr>
    )
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  render() {

    if (this.state.attachments) {

      var attachmentList = this.state.attachments.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      });

      var attachmentList = this.state.attachments.map(function (item, i) {
        console.log(item);
        return (
          <div key={i}>
          </div>
        )
      })
    }
    else {
      return <div>
        <p></p>
      </div>
    }

    const {
      state,
      className,
      onCloseModal,
      onCreateNote,
    } = this.props

    const {
      fileModal
    } = state

    return (
      <div className={className}>

        <Button
          icon="plus"
          title="ATTACH FILE"
          onClick={() => this.openNoteModal()}
        />

        <div className="notes">

          {this.renderTable()}
          {attachmentList}

        </div>

        <PatientAttachmentModal
          content={fileModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
          props={this.props}
          state={this.state}
        />
      </div>
    )
  }
}

export default FilesTab;
