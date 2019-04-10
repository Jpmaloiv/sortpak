import React, { Component } from 'react';
import axios from 'axios'
import Moment from 'react-moment'
import jwt_decode from 'jwt-decode'

// Components
import { Button, Input, Span, Table } from '../../../../common'


class RXHistoryTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: '',
      copyConfirm: false,
      scriptIds: [],
      loading: false,
    }
  }


  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/search?patientId=' + this.props.state.patientId, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        let script = resp.data.response[0]
        this.setState({
          scripts: resp.data.response,
          name: script.Patient.firstName + ' ' + script.Patient.lastName,
          id: script.Patient.id,
          dob: script.Patient.dob,
          sex: script.Patient.sex,
          patientSince: script.Patient.createdAt,
          phone: script.Patient.phone,
          addressStreet: script.Patient.addressStreet,
          addressCity: script.Patient.addressCity,
          addressState: script.Patient.addressState,
          addressZipCode: script.Patient.addressZipCode,
          email: script.Patient.email,
          copyAttachments: true
        }, this.copyAttachments, this.copyNotes)
      }).catch((err) => {
        console.error(err)
      })

    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token);
    this.setState({
      userId: decoded.id,
      username: decoded.username
    })
  }

  copyAttachments() {
    if (this.props.state.copyAttachments) {
      if (window.confirm('Select which script(s) you would like to copy the attachment(s) to.')) {
        this.setState({
          copyAttachments: true
        })
      } else {
        window.location.reload();
      }
    }
  }

  copyNotes() {
    if (this.props.state.copyNotes) {
      if (window.confirm('Select which script(s) you would like to copy the note(s) to.')) {
        this.setState({
          copyNotes: true
        })
      } else {
        window.location.reload();
      }
    }
  }

  handleCheckbox(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id
    if (value === true) {
      this.state.scriptIds.push(id)
    } else {
      this.state.scriptIds.splice(this.state.scriptIds.indexOf(id), 1)
    }
  }

  uploadCopyAttachments() {
    const loginToken = window.localStorage.getItem("token");
    const { attachmentIds } = this.props.state
    const { scriptIds } = this.state

    const attachments = [];

    for (var i = 0; i < attachmentIds.length; i++) {
      attachments.push({ id: attachmentIds[i].id, title: attachmentIds[i].title, attachedBy: attachmentIds[i].attachedBy, type: attachmentIds[i].type, oldScriptId: attachmentIds[i].ScriptId, UserId: attachmentIds[i].UserId })
    }

    if (scriptIds.length) {
      if (window.confirm(`This will upload ${attachmentIds.length} attachments to ${scriptIds.length} different scripts. Continue?`)) {
        this.props.loading();

        for (var i = 0; i < scriptIds.length; i++) {
          let iVal = i;
          for (var j = 0; j < attachments.length; j++) {
            let jVal = j;
            console.log(attachments[j])
            axios.post('/api/attachments/copy?id=' + attachments[j].id + '&title=' + attachments[j].title + '&attachedBy=' + attachments[j].attachedBy + '&type=' + attachments[j].type + '&userId=' + attachments[j].UserId +
              '&scriptId=' + scriptIds[i] + '&oldScriptId=' + attachments[j].oldScriptId,
              { headers: { "Authorization": "Bearer " + loginToken } })
              .then((res) => {
                console.log(res, i, scriptIds.length)
                if (res.status === 200 && iVal === scriptIds.length - 1 && jVal === attachments.length - 1) {
                  this.props.cancelLoading();
                  window.location.reload();
                }
              }).catch((error) => {
                console.error(error);
              })
          }
        }
      } else {
        this.props.cancelLoading();
      }
    } else {
      window.alert('Please select at least one script.')
    }
  }

  uploadCopyNotes() {
    const loginToken = window.localStorage.getItem("token");
    const { noteIds } = this.props.state
    const { scriptIds } = this.state

    const notes = [];

    for (var i = 0; i < noteIds.length; i++) {
      notes.push({ id: noteIds[i].id, name: noteIds[i].name, note: noteIds[i].note, private: noteIds[i].private, userImage: noteIds[i].userImage, oldScriptId: noteIds[i].ScriptId, UserId: noteIds[i].UserId })
    }

    if (scriptIds.length) {
      if (window.confirm(`This will upload ${noteIds.length} notes to ${scriptIds.length} different scripts. Continue?`)) {
        this.props.loading();

        for (var i = 0; i < scriptIds.length; i++) {
          let iVal = i;
          for (var j = 0; j < notes.length; j++) {
            let jVal = j;
            console.log(notes[j])
            axios.post('/api/notes/copy?id=' + notes[j].id + '&name=' + notes[j].name + '&note=' + notes[j].note + '&private=' + notes[j].private + '&userImage=' + notes[j].userImage + '&userId=' + notes[j].UserId +
              '&scriptId=' + scriptIds[i] + '&oldScriptId=' + notes[j].oldScriptId,
              { headers: { "Authorization": "Bearer " + loginToken } })
              .then((res) => {
                console.log(res, i, scriptIds.length)
                if (res.status === 200 && iVal === scriptIds.length - 1 && jVal === notes.length - 1) {
                  this.props.cancelLoading();
                  window.location.reload();
                }
              }).catch((error) => {
                console.error(error);
              })
          }
        }
      } else {
        this.props.cancelLoading();
      }
    } else {
      window.alert('Please select at least one script.')
    }
  }

  cancelCopies() {
    this.setState({
      copyAttachments: false,
      copyNotes: false
    })
    this.props.setState({
      copyAttachments: false,
      copyNotes: false
    })
  }

  renderPatientInfo() {
    const {
      editing,
      firstName,
      lastName,
      dob
    } = this.state


    return (
      <div>
        <div className="flex-grid">
          <div id="contactInfo">
            {editing ? (
              <div className="name">
                Name:
                {this.state.name}
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
              </div>
            ) : (
                <div>
                  Name: {this.state.name}
                </div>
              )}

            <div>
              Patient ID: #{this.state.id}
            </div>

            <div>
              Date of Birth:&nbsp;
              <Moment format="MM/DD/YYYY">{this.state.dob}</Moment>
            </div>
            <div>
              Sex: {this.state.sex}
            </div>
            <div>
              Patient Since: &nbsp;<Moment format={"MM/DD/YYYY"}>{this.state.createdAt}</Moment>
            </div>
          </div>

          <div id="contactInfo">
            <div>
              <Span style={{ marginLeft: 0 }} icon="phone">
                {this.state.phone}
              </Span>
            </div>
            <div>
              <Span icon="building" style={{ 'line-height': '25px', marginLeft: 0 }}>
                {this.state.addressStreet},<br />{this.state.addressCity}, {this.state.addressState}, {this.state.addressZipCode}
              </Span>
            </div>
            <div>
              <Span style={{ marginLeft: 0 }} className="blue" icon="envelope">
                {this.state.email}
              </Span>
            </div>
          </div>
        </div>
      </div>

    )
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>BILL ON</th>
          <th>MEDICATION</th>
          <th>PHYSICIAN</th>
          <th>SHIP ON</th>
          <th>STATUS</th>
          <th>PROCESS ON</th>
          <th>REFILL #</th>
          <th>REMAINING</th>
          <th>PATIENT PAY</th>
          <th>QUANTITY</th>
          <th>RX NUMBER</th>
          <th>POUCH</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.scripts.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location = `/scripts/${value}`
  }

  renderTableRow(script) {
    return (
      <tr value={script.id} onClick={this.props.state.copyAttachments ? '' : () => this.handleClick(script.id)}>
        <td>
          {this.props.state.copyAttachments && script.id !== this.props.state.id ?
            <input
              name="attachment"
              className="checkbox"
              id={script.id}
              style={{ position: 'absolute', marginLeft: '-2.2%' }}
              type="checkbox"
              onChange={this.handleCheckbox.bind(this)}
            />
            :
            <span></span>
          }
          <Span icon="calendar">
            {script.billOnDate ?
              <Moment format="MM/DD/YYYY">{script.billOnDate}</Moment>
              :
              <span></span>
            }
          </Span>
        </td>

        <td>
          {script.Product.name}
        </td>
        <td>{script.Physician.firstName + ' ' + script.Physician.lastName}</td>

        <td>
          <Span icon="calendar">
            {script.shipOn ?
              <Moment format="MM/DD/YYYY">{script.shipOn}</Moment>
              :
              <span></span>
            }
          </Span>
        </td>

        <td>
          {script.status}
        </td>
        <td><Span icon="calendar"><Moment format='MM/DD/YYYY'>{script.processedOn}</Moment></Span></td>
        {/* <td>
        </td> */}
        <td>{script.refills}</td>
        <td>{script.refillsRemaining}</td>
        <td>{script.patientPay}</td>
        <td>{script.quantity}</td>
        <td>{script.rxNumber}</td>
        <td>{script.pouch ? 'YES' : 'NO'}</td>

      </tr>
    )
  }

  renderTable() {
    return (
      <Table className="rxTable">
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }



  render() {

    if (this.state.scripts) {

      var scriptList = this.state.scripts.sort(function (a, b) {
        return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
      });

      var scriptList = this.state.scripts.map(function (item, i) {
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


    return (
      <div className="rxHistoryTab">
        {this.props.state.copyAttachments ?
          <div style={{ display: 'inline', marginLeft: 10 }}>
            <Button
              title="CONFIRM"
              style={{ minWidth: 125 }}
              onClick={this.uploadCopyAttachments.bind(this)}
            />

            <Button
              style={{ backgroundColor: '#D2000D', marginLeft: 10, minWidth: 125 }}
              title="CANCEL"
              onClick={this.cancelCopies.bind(this)}
            />
            <br />
          </div>
          :
          <span></span>
        }

        {this.props.state.notes ?
          <div style={{ display: 'inline', marginLeft: 10 }}>
            <Button
              title="CONFIRM"
              style={{ minWidth: 125 }}
              onClick={this.uploadCopyNotes.bind(this)}
            />

            <Button
              style={{ backgroundColor: '#D2000D', marginLeft: 10, minWidth: 125 }}
              title="CANCEL"
              onClick={this.cancelCopies.bind(this)}
            />
            <br />
          </div>
          :
          <span></span>
        }

        <div id="rxPrint" style={{ 'display': 'none' }}>
          <h1>RX History</h1>
          {this.renderPatientInfo()}</div>
        {this.renderTable()}
        {scriptList}
      </div>
    )

  }
}

export default RXHistoryTab;
