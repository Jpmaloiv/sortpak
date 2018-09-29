import React, { Component } from 'react';

// Components
import {
  Button,
  TextArea,
  FormModal,
} from '../../common'

import styles from './AttachmentModal.css'

export default class AttachmentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  get inactive() {
    const {
      text,
    } = this.state

    return !text
  }

  submit(e) {
    e.preventDefault()
    const {
      text,
    } = this.state

    const {
      visit,
    } = this.props.content

    const data = {
      text,
      visitId: visit ? visit.id : null,
    }

    this.props.onSubmit(data)
    this.props.onClickAway()
    this.setState({ text: '' })
  }

  render() {
    const {
      content,
      onClickAway,
    } = this.props

    const {
      text,
    } = this.state

    return (
      <FormModal
        title="Add"
        onClickAway={onClickAway}
        visible={!!content}
        onSubmit={this.submit.bind(this)}
        className={styles.modal}
      >
        {/* Rep */}
        <label>
          Note
        </label>
        <label htmlFor="scriptFile">Select PDF:</label>
        <input name="scriptFile" onChange={this.onChangeHandler} accept=".pdf" id="pdf-file" type="file" />

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
