import React, { Component } from 'react';
import { connect } from 'react-redux'

import calendarJs from 'calendar-js'

import { getDateObject } from '../../../../lib'

// Components
import Day from './Day/Day'

import styles from './Agenda.css'

class Agenda extends Component {
  renderWeekday(day) {
    return (
      <div key={day} className="day">
        {day}
      </div>
    )
  }

  renderWeekdaysHead() {
    const weekdays = calendarJs().weekdaysAbbr()
    return (
      <div className="weekdays">
        {weekdays.map(this.renderWeekday.bind(this))}
      </div>
    )
  }

  renderDay(weekIndex, day, dayIndex) {
    const { date, month, year } = getDateObject()

    const isCurrentDay = (
      date === day
      && month === this.props.month
      && year === this.props.year
    )

    const key = `${weekIndex}-${dayIndex}`
    const isToday = visit => {
      const visitDate = new Date(visit.dateTime)
      const visitDay = visitDate.getDate()
      return visitDay === day
    }
    const { visits } = this.props
    const filteredVisits = day ? visits.filter(isToday) : []
    const reduceVisitsToReps = (acc, curr) => {
      const existingRep = acc.find(el => el.id === curr.rep.id)
      if (existingRep) {
        existingRep.visits.push(curr)
      } else {
        const rep = { ...curr.rep, visits: [curr] }
        acc.push(rep)
      }
      return acc
    }

    const reps = filteredVisits.reduce(reduceVisitsToReps, [])

    return (
      <Day
        onClick={rep => this.props.onSelectRep({rep, day})}
        key={key}
        day={day}
        reps={reps}
        today={isCurrentDay}
      />
    )
  }

  renderWeek(week, weekIndex) {
    const { month, year } = this.props
    const key = `${year}-${month}-${weekIndex}`
    return (
      <div className="week" key={key}>
        {week.map((day, dayIndex) => this.renderDay(weekIndex, day, dayIndex))}
      </div>
    )
  }

  renderWeeks() {
    const { month, year } = this.props
    const weeks = calendarJs().of(year, month).calendar
    return (
      <div className="weeks">
        {weeks.map(this.renderWeek.bind(this))}
      </div>
    )
  }

  render() {
    const { year } = this.props
    if (!year) {
      return null
    } else {
      return (
        <div className={styles.calendar}>
          {this.renderWeekdaysHead()}
          {this.renderWeeks()}
        </div>
      )
    }
  }
}

const mapStateToProps = ({ main }) => {
  return {
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(Agenda);
