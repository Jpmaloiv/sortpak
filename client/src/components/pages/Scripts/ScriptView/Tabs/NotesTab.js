import React, { Component } from 'react';

import axios from 'axios'
import Moment from 'react-moment'

// Components
import {
  Span,
  Button,
  Table
} from '../../../../common'

import {
  NoteModal,
} from '../../../../shared'



class NotesTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: ''
    }
  }

  openNoteModal() {
    this.props.setState({ noteModal: {} })
  }

  componentWillReceiveProps() {
    this.componentUpdate();
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/notes/search/?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        this.setState({
          notes: resp.data.response,
        })
        console.log(this.state)
      }).catch((error) => {
        console.error(error);
      })
  }

  handleCheckbox = (e, note) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    if (value === true) {
      this.state.noteIds.push(note)
    } else {
      this.state.noteIds.splice(this.state.noteIds.indexOf(note), 1)
    }

    console.log(this.state.noteIds)
  }

  componentUpdate() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/scripts/notes/search/?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        this.setState({
          notes: resp.data.response,
        }, () => console.log(this.state.notes))
      }).catch((error) => {
        console.error(error);
      })
  }

  copyConfirm() {
    if (window.confirm('Select the note(s) you would like to copy.')) {
      return;
    } else {
      this.setState({
        copyToAll: false
      })
    }
  }

  setCopyNotes() {
    if (this.state.noteIds.length) {
      this.props.setState({
        noteIds: this.state.noteIds
      }, () => this.props.copyNotes())
    } else {
      window.alert('Please select at least one note')
    }
  }

  renderTableHead() {
    return (
      <thead>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.notes.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(note) {
    return (<div>
    </div>
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

    if (this.state.notes) {
      var noteList = this.state.notes.sort(function (a, b) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      });
      var noteList =
        this.state.notes.map((note, i) =>
          <div key={i}>
            <Table className="nt">
              <thead><th>
                <div className="userImage" style={{ 'background-image': `url(/images/${note.UserId}/${note.userImage}` }}></div>
                <div className='noteName'>{note.name}</div></th></thead>
              <tr>
                <td>{note.note}</td>
              </tr>
            </Table>
            {this.state.copyToAll ?
              <input
                name="note"
                id={note}
                className="checkbox"
                style={{ position: 'absolute', marginLeft: '-4%' }}
                type="checkbox"
                onChange={((e) => this.handleCheckbox(e, note))}
              />
              :
              <span></span>
            }

            <Table className="noteDateTime" key={note.id}>
              <td>
                <Span icon="calendar" />
                <Moment format={"MM/DD/YY"}>{note.createdAt}</Moment>
                &nbsp;&nbsp;
                <Span icon="clock-o" />
                <Moment format={"hh:mm A"}>{note.createdAt}</Moment>
              </td>
            </Table>
          </div>
        );

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
      noteModal
    } = state

    return (
      <div id="notesTab" className={className}>

        <Button
          icon="plus"
          title="ADD NOTE"
          onClick={() => this.openNoteModal()}
        />

        {/* {this.state.notes.length ?
          <div style={{ display: 'inline' }}>
            <Button
              icon="copy"
              className="orange"
              title="COPY TO ALL"
              style={{ marginLeft: 10 }}
              inactive={this.state.copyToAll}
              onClick={() => this.setState({ copyToAll: true }, this.copyConfirm)}
            />
            {this.state.copyToAll ?
              <div style={{ display: 'inline', marginLeft: 10 }}>
                <Button
                  title="CONFIRM"
                  style={{ minWidth: 125 }}
                  onClick={this.setCopyNotes.bind(this)}
                />

                <Button
                  style={{ backgroundColor: '#D2000D', marginLeft: 10, minWidth: 125 }}
                  title="CANCEL"
                  onClick={() => this.setState({ copyToAll: false })}
                />
              </div>
              :
              <span></span>
            }
          </div>
          :
          <span></span>
        } */}

        <div className="notes">
          {this.renderTable()}
          {noteList}
        </div>

        <NoteModal
          content={noteModal}
          state={this.state}
          props={this.props}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
        />
      </div>
    )
  }
}

export default NotesTab;