import React, { Component } from 'react';
import cn from 'classnames'
import calendarJs from 'calendar-js'
import axios from 'axios'
import moment from 'moment'
import Moment from 'react-moment'
import FontAwesome from 'react-fontawesome'

// Components
import {
  Icon,
  Button,
  Overlay,
  DateBox,
  Table,
  Span,
} from '../../../common'

import {
  VisitNoteModal,
} from '../../../shared'

import styles from './SideBar.css'


class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getPhysician: true,
      visitNoteModal: '',
      visits: [],
    }
    this.renderVisit = this.renderVisit.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({
      visitNotes: this.props.state.visitNotes,
      getPhysician: true
    })
  }

  openVisitNoteModal(visitId, physicianId) {
    console.log(visitId, physicianId)
    this.setState({ visitNoteModal: {}, visitId: visitId, physicianId: physicianId })
  }

  closeModal() {
    this.setState({
      visitNoteModal: null
    })
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
        {this.state.visitNotes.reverse().map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(visitNote) {
    return (
      <div></div>
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

  getPhysicianInfo() {
    const loginToken = window.localStorage.getItem("token");

    const {
      rep
    } = this.props

    const group = []
    const addressStreet = []
    const addressCity = []
    const addressState = []
    const addressZipCode = []
    const notes = []
    const bigArray = []

    const visits = this.props.rep.reps

    for (var i = 0; i < visits.length; i++) {

      // const visit = { rep }.rep.rep
      let firstName = visits[i].Physician.split(' ').slice(0, -1).join(' ');
      let lastName = visits[i].Physician.split(' ').slice(-1).join(' ');

      axios.get('api/physicians/search?dupFirstName=' + firstName + '&dupLastName=' + lastName, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          let physician = resp.data.response[0]
          group.push(physician.group)
          addressStreet.push(physician.addressStreet)
          addressCity.push(physician.addressCity)
          addressState.push(physician.addressState)
          addressZipCode.push(physician.addressZipCode)
        }).catch((error) => {
          console.error(error);
        })

      let visitId = visits[i].id

      axios.get('/api/visits/notes/search/?VisitId=' + visitId, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp.data.response)

          bigArray.push(resp.data.response)

          this.setState({
            bigArray: bigArray,
            visitNotes: resp.data.response,
          })

        }).catch((error) => {
          console.error(error);
        })



      this.setState({
        visits: { rep }.rep.reps
      }, this.filterReps)

    }

    this.setState({
      group: group,
      addressStreet: addressStreet,
      addressCity: addressCity,
      addressState: addressState,
      addressZipCode: addressZipCode
    })
  }

  filterReps() {
    const isThisRep = visit => {

      return visit.Rep === this.props.rep.rep.Rep
    }
    this.setState({
      visits: this.state.visits.filter(isThisRep)

    })
  }

  renderVisits() {
    return (
      <div>
        {this.state.visits.map(this.renderVisit.bind(this))}
      </div>
    )
  }


  renderVisit(visit) {
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

    const i = this.state.visits.indexOf(visit);
    const visitId = visit.id
    const physicianId = visit.PhysicianId;
    console.log(this.state.bigArray[1])
    // const visit = { rep }.rep.rep

    const calendar = calendarJs().of(year, month)
    const time = moment(visit.dateTime).format('h:mm A')
    const bigArray = this.state.bigArray[i]

    return (

      <div key={visit.id} className="visits">
        <div className="visit">
          <div className="physician">
            <div className="line">
              <span>
                <FontAwesome style={{ marginRight: '7px' }} name="clock-o" />
                {time}
              </span>
            </div>
            <div className="line">
              <span className="name">
                {visit.Physician}
              </span>
              {/* <div>  {this.getVisitInfo.call(this, visit)}</div> */}
              <span className="group">
                {this.state.group[i]}
              </span>
              <br />
              {this.state.addressStreet[i]},<br />
              {this.state.addressCity[i]}, {this.state.addressState[i]}, {this.state.addressZipCode[i]}
            </div>
          </div>


          <div className="header" style={{ backgroundColor: '#f6f8fa', padding: 20 }}>
            <h6 style={{ 'display': 'inline', 'color': '#8d959a', fontWeight: 'lighter', fontSize: '14px' }}>Notes</h6>
            <Button
              style={{ marginLeft: 5 }}
              icon="plus"
              className="addVisitNote"
              onClick={() => this.openVisitNoteModal(visitId, physicianId)}
            />
          </div>
        <div className="notes">
          {this.renderVisitNotes(bigArray)}
          </div>

          {/* <div className="notes" className={className}>
              {this.renderTable()}
              {visitNoteList}
            </div> */}
        </div>
      </div>
    )
  }

  renderVisitNotes(bigArray) {
    console.log(bigArray)
    if (bigArray) {
      return (
        bigArray.map((item, i) =>
          <div id="visitNotesTab" key={i}>
            <Table className="vt">
              <thead><th>
                <div className="userImage" style={{ 'background-image': `url(/images/${item.UserId}/${item.userImage}` }}></div>
                <div className='visitNoteName'>{item.name}</div></th></thead>
              <tr>
                <td>{item.note}</td>
              </tr>
            </Table>

            <Table className="visitNoteDateTime" key={item.id}>
              <td>
                <Span icon="calendar" />
                <Moment format={"MM/DD/YY"}>{item.createdAt}</Moment>
                &nbsp;&nbsp;
                <Span icon="clock-o" />
                <Moment format={"hh:mm A"}>{item.createdAt}</Moment>
              </td>
            </Table>
          </div>
        ))
    }
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

    if (this.state.visits) {
      var visitList = this.state.visits.map(function (item, i) {
        return (
          <div key={i}>
          </div>
        )
      })
    }
    if (this.state.visitNotes) {
      var visitNoteList = this.state.visitNotes.reverse().map((item, i) =>
        <div id="visitNotesTab" key={i}>
          <Table className="vt">
            <thead><th>
              <div className="userImage" style={{ 'background-image': `url(/images/${item.UserId}/${item.userImage}` }}></div>
              <div className='visitNoteName'>{item.name}</div></th></thead>
            <tr>
              <td>{item.note}</td>
            </tr>
          </Table>

          <Table className="visitNoteDateTime" key={item.id}>
            <td>
              <Span icon="calendar" />
              <Moment format={"MM/DD/YY"}>{item.createdAt}</Moment>
              &nbsp;&nbsp;
                <Span icon="clock-o" />
              <Moment format={"hh:mm A"}>{item.createdAt}</Moment>
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
      visitNoteModal
    } = this.state

    const visit = { rep }.rep

    // const renderVisit = visit => {
    //   const { physician, notes } = visit
    //   const time = moment(visit.dateTime).format('h:mm A')
    //   return (
    //     <div key={visit.id} className="visit">
    //       <div className="physician">
    //         <div className="line">
    //           <span>
    //             <FontAwesome name="clock-o" />
    //             {time}
    //           </span>
    //         </div>
    //         <div className="line">
    //           <span className="name">
    //             {physician.nameDisplay}
    //           </span>
    //           <span className="group">
    //             {this.state.group}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="notes">
    //         <div className="title">
    //           Notes
    //       </div>
    //         <DateBox visit={visit} />
    //         {notes.map(note => (
    //           <DateBox key={note.id} note={note} />
    //         ))}
    //       </div>
    //     </div>
    //   )
    // }

    const calendar = calendarJs().of(year, month)

    // const time = moment(visit.dateTime).format('h:mm A')
    return (
      <div className={styles.sideBar}>
        <div className={cn("body", { flipped })}>
          <div className="header" >
            <h2>{this.props.rep.rep.Rep}</h2>
            <span className="date">
              {calendar.month} {day}, {year}
            </span>
            <span style={{ color: '#333', textAlign: 'left' }} className="label">
              SCHEDULE
          </span>
            <Icon
              name="times"
              button
              onClick={onClickAway}
            />
          </div >
          {this.renderVisits()}
          <div style={{textAlign: 'center'}}>
          <Button style={{ width: '75%', margin: '20px auto' }} onClick={() => onViewModal({ rep, day })}>
            <FontAwesome name="plus" />
            SCHEDULE A NEW VISIT
        </Button>
        </div>
        </div>
        <Overlay
          active
          className="overlay"
          onClick={onClickAway}
        />

        <VisitNoteModal
          content={visitNoteModal}
          onClickAway={this.closeModal.bind(this)}
          state={this.state}
          props={this.props}
          visitId={this.state.visitId}
          physicianId={this.state.physicianId}
          onSubmit={onCreateNote}
          onCloseModal={() => this.closeModal()}
        />
      </div >
    )
  }
}

export default SideBar
