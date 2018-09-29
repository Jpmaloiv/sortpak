import React, { Component } from 'react';

// Components
import {
  Span,
  Button,
  DateBox,
} from '../../../../common'

import {
  AttachmentModal,
} from '../../../../shared/'

class AttachmentsTab extends Component {
  openNoteModal() {
    this.props.setState({ attachmentModal: {} })
  }

  render() {
    const {
      patient,
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
      attachmentModal,
    } = state
    return (
      <div className={className}>
        <h2>
          More Info
        </h2>
        <Span
          type="textarea"
          editing={editing}
          label="Patient Warning"
          placeholder="Patient Warning"
          value={warning}
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

        <AttachmentModal
          content={attachmentModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
        />
      </div>
    )
  }
}

export default AttachmentsTab;
