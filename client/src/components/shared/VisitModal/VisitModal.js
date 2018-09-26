import React, { Component } from 'react';
import { connect } from 'react-redux'

import moment from 'moment'

// Components
import {
  Span,
  Input,
  Button,
  Selector,
  FormModal,
} from '../../common'

import styles from './VisitModal.css'

class VisitModal extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    const date = moment().add(1, 'day').format('YYYY-MM-DD')
    const initialState = {
      rep: '',
      date,
      time: '10:00',
      physician: '',
    }
    return initialState
  }

  static getDerivedStateFromProps(newProps) {
    return newProps.content || null
  }

  get inactive() {
    const {
      date,
      time,
      physician,
    } = this.state
    const rep = this.props.isAdmin ? this.state.rep : this.props.me
    return !rep || !date || !time || !physician
  }

  submit(e) {
    e.preventDefault()
    const {
      date,
      time,
      physician,
    } = this.state

    const rep = this.props.isAdmin ? this.state.rep : this.props.me

    // combine date and time
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString()
    const data = {
      repId: rep.id || rep,
      dateTime,
      physicianId: physician.id || physician,
    }

    this.props.onSubmit(data)
    this.props.onClickAway()
  }

  renderSelectByType(type) {
    const { content } = this.props
    let staticOption = content && content[type]

    let defaultOption
    let dataSource

    switch(type) {
      case 'physician':
        defaultOption = 'Select Physician'
        dataSource = this.props.physicians
        break
      case 'rep':
        if (!this.props.isAdmin) {
          staticOption = this.props.me
        }
        defaultOption = 'Select Rep'
        dataSource = this.props.reps
        break
      default:
        // unknown type
        return null
    }

    const options = [
      {
        key: 0,
        value: '',
        display: defaultOption,
      },
      ...dataSource.map(data => ({
        key: data.id,
        value: data.id,
        display: data.nameDisplay,
      })),
    ]

    if (staticOption) {
      return (
        <div>
          <Span>
            {staticOption.nameDisplay || type}
          </Span>
        </div>
      )
    } else {
      return (
        <Selector
          selected={this.state[type]}
          options={options}
          onSelect={value => this.setState({ [type]: value })}
        />
      )
    }
  }

  render() {
    const {
      content,
      onClickAway,
    } = this.props

    const { date, time } = this.state

    return (
      <FormModal
        title="Schedule New Visit"
        onClickAway={onClickAway}
        visible={!!content}
        onSubmit={this.submit.bind(this)}
        className={styles.modal}
      >
        {/* Rep */}
        <label>
          Rep
        </label>
        {this.renderSelectByType('rep')}

        <br />

        {/* Date */}
        <label>
          Date
        </label>
        <Input
          type="date"
          value={date}
          onChange={date => this.setState({ date })}
        />

        <br />

        {/* Time */}
        <label>
          Time
        </label>
        <Input
          type="time"
          value={time}
          onChange={time => this.setState({ time })}
        />

        <br />

        {/* Physician */}
        <label>
          Physician
        </label>
        {this.renderSelectByType('physician')}

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
            title="Schedule"
          />
        </div>
      </FormModal>
    )
  }
}

const mapStateToProps = ({auth, main}) => {
  const {
    reps,
    physicians,
  } = main

  const {
    me,
    isAdmin,
  } = auth

  return {
    me,
    isAdmin,
    reps,
    physicians,
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(VisitModal);
