import React, { Component } from 'react';
import cn from 'classnames'
import calendarJs from 'calendar-js'
import axios from 'axios'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'

// Components
import {
  Icon,
  Button,
  Overlay,
  DateBox,
} from '../../../common'

import styles from './SideBar.css'


class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getPhysician: true
    }
  }

  getPhysicianInfo() {
    
    const {
      visible,
      flipped,
      onClickAway,
      onViewModal,
      rep,
      day,
      month,
      year,
    } = this.props
    console.log(this.props);
    const visit = { rep }.rep
    const firstName = visit.Physician.split(' ').slice(0, -1).join(' ');
    const lastName = visit.Physician.split(' ').slice(-1).join(' ');
  
    const loginToken = window.localStorage.getItem("token");
      axios.get('api/physicians/search?dupFirstName=' + firstName + '&dupLastName=' + lastName, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
          this.setState({
            group: resp.data.response[0].group,
            addressStreet: resp.data.response[0].addressStreet,
            addressCity: resp.data.response[0].addressCity,
            addressState: resp.data.response[0].addressState,
            addressZipCode: resp.data.response[0].addressZipCode
          })
         
        }).catch((error) => {
          console.error(error);
        })
      }

  render() {
  
  const {
    visible,
    flipped,
    onClickAway,
    onViewModal,
    rep,
    day,
    month,
    year,
  } = this.props

  if (!visible) {
    return null
  }
  if (this.state.getPhysician) {
    this.getPhysicianInfo();
    this.setState({
      getPhysician: false
    })
  }

  const visit = { rep }.rep

  const renderVisit = visit => {
    const { physician, notes } = visit
    const time = moment(visit.dateTime).format('h:mm A')
    return (
      <div key={visit.id} className="visit">
        <div className="physician">
          <div className="line">
            <span>
              <FontAwesome name="clock-o" />
              {time}
            </span>
          </div>
          <div className="line">
            <span className="name">
              {physician.nameDisplay}
            </span>
            <span className="group">
              {this.state.group}
            </span>
          </div>
        </div>
        <div className="notes">
          <div className="title">
            Notes
          </div>
          <DateBox visit={visit} />
          {notes.map(note => (
            <DateBox key={note.id} note={note} />
          ))}
        </div>
      </div>
    )
  }

  const calendar = calendarJs().of(year, month)

  

  const time = moment(visit.dateTime).format('h:mm A')

  return (
    <div className={styles.sideBar}>
      <div className={cn("body", { flipped })}>
        <div className="header">
          <h2>{visit.Rep}</h2>
          <span className="date">
            {calendar.month} {day}, {year}
          </span>
          <span style={{color: '#333', textAlign: 'left'}} className="label">
            SCHEDULE
          </span>
          <Icon
            name="times"
            button
            onClick={onClickAway}
          />
        </div>

        <div className="visits">
        <div key={visit.id} className="visit">
        <div className="physician">
          <div className="line">
            <span>
              <FontAwesome name="clock-o" />
              {time}
            </span>
          </div>
          <div className="line">
            <span className="name">
              {visit.Physician}
            </span>
            <span className="group">
              {this.state.group}
            </span>
            <br />
            {this.state.addressStreet},<br />
            {this.state.addressCity}, {this.state.addressState}, {this.state.addressZipCode}
          </div>
        </div>
        {/* <div className="notes">
          <div className="title">
            Notes
          </div>
          <DateBox visit={visit} /> */}
          {/* {notes.map(note => (
            <DateBox key={note.id} note={note} />
          ))} */}
        {/* </div> */}
      </div>
          
        </div>

        <Button style={{width: '75%', margin: '20px auto'}} onClick={() => onViewModal({rep, day})}>
          <FontAwesome name="plus"/>
          SCHEDULE A NEW VISIT
        </Button>
      </div>
      <Overlay
        active
        className="overlay"
        onClick={onClickAway}
      />
    </div>
  )
}}

export default SideBar
