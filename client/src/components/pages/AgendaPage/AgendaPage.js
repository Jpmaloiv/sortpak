import React, { Component } from 'react';
import { connect } from 'react-redux'
import qs from 'query-string'

import { hasAuthTokenAsync, getDateObject } from '../../../lib'

import { formatDate } from '../../../lib/dateHelper'

import Agenda from './Agenda/Agenda'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'

import {
  VisitModal,
} from '../../shared'

import {
  createVisit,
} from '../../../actions/main'

import styles from './AgendaPage.css'

class AgendaPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRepId: '',
      visitModal: null,
      rep: null,
      day: null,
      sideBarFlipped: false,
    }
  }

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        if (!this.params.month || !this.params.year) {
          console.log('setting current date');
          this.setToCurrentDate()
        }
      })
      .catch(console.log)
  }

  get params() {
    const params = qs.parse(this.props.location.search)
    return params
  }

  get month() {
    return Number(this.params.month)
  }

  get year() {
    return Number(this.params.year)
  }

  get selectedRepId() {
    return Number(this.params.rep) || 0
  }

  setParams(newParams) {
    const search = qs.stringify({...this.params, ...newParams})
    this.props.history.push({
      search,
    })
  }

  setToCurrentDate() {
    const { month, year } = getDateObject()
    this.setParams({month, year})
  }

  setMonth(newParams) {
    this.setParams(newParams)
  }

  setRep(rep) {
    this.setParams({ rep: rep || null })
  }

  viewRep({rep, day}) {
    const dayOfWeek = (new Date(this.year, this.month, day)).getDay()
    const sideBarFlipped = dayOfWeek > 3
    this.setState({ rep, day, sideBarFlipped })
  }

  viewModal({ rep, day }) {
    const date = formatDate(new Date(this.year, this.month, day))
    const visitModal = {
      rep,
      date,
    }
    this.setState({ visitModal, rep: null, day: null})
  }

  closeSideBar() {
    this.setState({ rep: null, day: null })
  }

  render() {
    const { reps } = this.props
    const {
      selectedRepId,
      month,
      year,
    } = this

    // filter visits by checking the current month
    /* const isThisMonth = visit => {
      const visitDate = new Date(visit.dateTime)
      const visitMonth = visitDate.getMonth()
      const visitYear = visitDate.getFullYear()
      return (visitMonth === month) && (visitYear === year)
    } */
    // let filteredVisits = this.props.visits.filter(isThisMonth)

    /* if (selectedRepId) {
      // filter by rep if one is selected
      filteredVisits = filteredVisits.filter(visit => {
        return visit.rep.id === selectedRepId
      })
    } */

    return (
      <div className={styles.body}>
        {/* Header */}
        <Header
          reps={reps}
          month={month}
          year={year}
          onRepChange={this.setRep.bind(this)}
          onMonthChange={this.setMonth.bind(this)}
          onViewModal={() => this.setState({ visitModal: {} })}
          selectedRepId={selectedRepId}
        />

        {/* Agenda */}
        <Agenda
          month={month}
          year={year}
          // visits={filteredVisits}
          onSelectRep={this.viewRep.bind(this)}
        />

        {/* Modal */}
        <VisitModal
          content={this.state.visitModal}
          onClickAway={() => this.setState({visitModal: null})}
          onSubmit={this.props.createVisit.bind(this)}
        />

        {/* SideBar */}
        <SideBar
          rep={this.state.rep}
          day={this.state.day}
          month={month}
          year={year}
          flipped={this.state.sideBarFlipped}
          visible={this.state.rep && this.state.day}
          onClickAway={this.closeSideBar.bind(this)}
          onViewModal={this.viewModal.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    visits,
    reps,
  } = main

  return {
    visits,
    reps,
  }
}

const actions = {
  createVisit,
}

export default connect(mapStateToProps, actions)(AgendaPage);
