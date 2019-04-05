import React, { Component } from 'react';
import axios from 'axios'

import Moment from 'react-moment'

// // Components
import { Button, Span, Table } from '../../../../common'

import {
  AttachmentModal,
} from '../../../../shared/'

import styles from './DetailsTab.css'


class AttachmentsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateAttached: '',
      type: '',
      copyToAll: false
    }
  }


  openNoteModal() {
    this.props.setState({ attachmentModal: {} })
  }

  componentWillReceiveProps() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/attachments/search?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
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
    axios.get('/api/attachments/search?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
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
    axios.get('/api/attachments/search?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
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
      axios.delete('/api/attachments/delete?attachmentId=' + id + '&scriptId=' + this.props.state.id + '&name=' + name,
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
          {this.state.copyToAll ?
            <input
              name="attachment"
              className="checkbox"
              style={{ position: 'absolute', marginLeft: '-4%' }}
              type="checkbox"
              checked={this.state.willCopy}
              onChange={this.handleCheckbox}
            />
            :
            <span></span>
          }
          <a href={attachment.link} target='_blank' activeClassName="active">
            <h3>{attachment.title}</h3>
          </a>
          <Span icon="remove" onClick={this.deleteAttachment.bind(this, attachment.id, attachment.title)} />
        </td>
        <td>
          <Moment format={"MM/DD/YYYY"}>{attachment.createdAt}</Moment>
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

  copyConfirm() {
    if (window.confirm('Select the attachment(s) you would like to copy.')) {
      return;
    } else {
      this.setState({
        copyToAll: false
      })
    }
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
      attachmentModal
    } = state


    return (
      <div id='attachmentsTab' className={className}>

        <Button
          icon="plus"
          title="ATTACH FILE"
          onClick={() => this.openNoteModal()}
        />

        <Button
          icon="copy"
          className="orange"
          title="COPY TO ALL"
          style={{ marginLeft: 10, display: 'none'}}
          inactive={this.state.copyToAll}
          onClick={() => this.setState({ copyToAll: true }, this.copyConfirm)}
        />
        {this.state.copyToAll ?
          <div style={{ display: 'inline', marginLeft: 10 }}>
            <Button
              title="CONFIRM"
              style={{ minWidth: 125 }}
              onClick={this.props.copyAttachments}
            />

            <Button
              style={{ backgroundColor: '#D2000D', marginLeft: 10, minWidth: 125 }}
              title="CANCEL"
              onClick={() => this.setState({copyToAll: false})}
            />
          </div>
          :
          <span></span>
        }

        <div className="notes">

          {this.renderTable()}
          {attachmentList}

        </div>


        <AttachmentModal
          content={attachmentModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
          state={this.state}
          props={this.props}
        />

      </div>
    )
  }
}

export default AttachmentsTab;

