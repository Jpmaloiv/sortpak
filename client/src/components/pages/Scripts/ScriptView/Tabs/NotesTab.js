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

import styles from './NotesTab.css'

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

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
      axios.get('/api/scripts/notes/search/', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
              notes: resp.data.response,
              // id: resp.data.response.id,
             
          })
          console.log(this.state)
        }).catch((error) => {
          console.error(error);
      })
}

renderTableHead() {
  console.log(this.state);
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
  console.log(this.state.note);
  return (<div>

    <Table className="nt" key={note.id}>   
      <thead><th>{note.User.username}</th></thead>
        
      
      <tr>
        <td>{note.note}</td>
      </tr>
    </Table>

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
    console.log(this.state.notes);

    if (this.state.notes) {
      // const self = this;

var noteList = this.state.notes.map(function (item, i) {
          console.log(item);
          return (
              <div key={i}>
                  {/* <div className="story-title-author">
                          <h3 className="story-title">{item.patient}</h3>
                
                      <h5 className="story-author">
                          {!(self.props.match.params.username)
                              ?
                              <div style={{ marginLeft: "5px" }} className="btn-group" role="group">
                                  <button onClick={() => self.showUpdForm(item)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>
                                  <button onClick={() => self.deleteBook(item.id)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
                              </div>
                              : null
                          }
                      </h5>
                  </div>
                  
                  <p>{item.description}</p>
                  <br /> */}
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
      setState,
      className,
      onCloseModal,
      onCreateNote,
    } = this.props

    // const notes = patient.notes || []
    const {
      warning,
      editing,
      noteModal,
    } = state

    return (
      <div id="notesTab" className={className}>
        
        <Button
          icon="plus"
          title="ADD NOTE"
          onClick={() => this.openNoteModal()}
        />

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
