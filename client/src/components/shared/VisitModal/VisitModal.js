import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

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

      this.setDateTime = this.setDateTime.bind(this);
    // this.submit = this.submit.bind(this);
  }

  get initialState() {
    const date = moment().add(1, 'day').format('YYYY-MM-DD')
    const initialState = {
      Rep: '',
      date,
      time: '10:00',
      Physician: '',
    }
    return initialState
  }

  static getDerivedStateFromProps(newProps) {
    return newProps.content || null
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/user/search?role=Rep', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        this.setState({
          reps: resp.data.response
        })
      }).catch((err) => {
        console.error(err)
      })

    axios.get('/api/physicians/search', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        this.setState({
          physicians: resp.data.response
        })
      }).catch((err) => {
        console.error(err)
      })
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

  setDateTime(e) {
    e.preventDefault();
    this.setState({
      dateTime: moment(`${this.state.date} ${this.state.time}`, 'YYYY-MM-DD HH:mm').toISOString()
    }, this.submitVisit)
  }

  submitVisit() {
    /* const {
      date,
      time,
      physician,
    } = this.state

    const rep = this.props.isAdmin ? this.state.rep : this.props.me */

    /* // combine date and time
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString()
    const data = {
      // repId: rep.id || rep,
      dateTime,
      // physicianId: physician.id || physician,
    }
    console.log(dateTime); */
    console.log(this.state.Rep)

    const loginToken = window.localStorage.getItem("token");
    let data = new FormData();
    axios.post('/api/visits/add?dateTime=' + this.state.dateTime + '&Rep=' + this.state.Rep + '&Physician=' + this.state.Physician,
      data, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((data) => {
        console.log(data);
        window.location.reload();
        // this.props.onClickAway();
        
      }).catch((error) => {
        console.error(error);
      })
  }


  renderSelectByType(type) {
    const { content } = this.props
    let staticOption = content && content[type]

    let defaultOption
    let dataSource

    switch (type) {
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
    console.log(this.state);
    const {
      content,
      onClickAway,
    } = this.props

    const { date, time } = this.state

    if (this.state.reps && this.state.physicians) {
      const repOptions = [
        {
          key: '',
          value: '',
          display: '--',
        },
        ...this.state.reps.map(rep => ({
          key: rep.id,
          value: rep.name,
          display: rep.name,
        })),
      ]

      const physicianOptions = [
        {
          key: '',
          value: '',
          display: '--',
        },
        ...this.state.physicians.map(physician => ({
          key: physician.id,
          value: physician.firstName + ' ' + physician.lastName,
          display: physician.firstName + ' ' + physician.lastName
        })),
      ]




      return (
        <FormModal
          title="Schedule New Visit"
          onClickAway={onClickAway}
          visible={!!content}
          onSubmit={this.setDateTime}
          className={styles.modal}
        >
          {/* Rep */}
          <label>
            Rep
        </label>
          <Selector
            wide
            options={repOptions}
            value={this.state.Rep}
            // onSelect={this.props.on ChangeValue}
            onSelect={Rep => this.setState({ Rep })}
          />

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
          <Selector
            wide
            options={physicianOptions}
            value={this.state.Physician}
            // onSelect={this.props.on ChangeValue}
            onSelect={Physician => this.setState({ Physician })}
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
              // inactive={this.inactive}
              type="submit"
              title="Schedule"
            />
          </div>
        </FormModal>
      )
    } else { return (<div></div>) }
  }
}

const mapStateToProps = ({ auth, main }) => {
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
