import React, { Component } from 'react';

// Components
import {
  Span,
  Button
} from '../../../../common'

import {
  NoteModal,
} from '../../../../shared'

class NotesTab extends Component {
  openNoteModal() {
    this.props.setState({ noteModal: {} })
  }

  render() {
    const {
      setState,
      className,
      onCloseModal,
      onCreateNote,
    } = this.props

    // const notes = patient.notes || []
    /* const {
      // warning,
      // editing,
      // noteModal,
    } = state */
    return (
      <div style={{margin: 25, padding: 10}} className={className}>
        <h2>
          More Info
        </h2>
        <Span
          type="textarea"
          // editing={editing}
          label="Patient Warning"
          placeholder="Patient Warning"
          // value={warning}
          onChange={warning => setState({ warning })}
        >
          {/* {patient.warning || 'None'} */}
        </Span>

        <h2>
          Notes
        </h2>
        <Button
          icon="plus"
          title="ADD NOTE"
          onClick={() => this.openNoteModal()}
        />

        <div className="notes">
          {/* {notes.map(note => (
            <DateBox
              key={note.id}
              note={note}
            />
          ))} */}
        </div>

        <NoteModal
          // content={noteModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
        />
      </div>
    )
  }
}

export default NotesTab;
