import React from 'react';
import cn from 'classnames'
import calendarJs from 'calendar-js'
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

const SideBar = props => {
  const {
    visible,
    flipped,
    onClickAway,
    onViewModal,
    rep,
    day,
    month,
    year,
  } = props

  if (!visible) {
    return null
  }

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
              {physician.group}
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

  return (
    <div className={styles.sideBar}>
      <div className={cn("body", { flipped })}>
        <div className="header">
          <h2>{rep.nameDisplay}</h2>
          <span className="date">
            {calendar.month} {day}, {year}
          </span>
          <span className="label">
            SCHEDULE
          </span>
          <Icon
            name="times"
            button
            onClick={onClickAway}
          />
        </div>

        <div className="visits">
          {rep.visits.map(renderVisit)}
        </div>

        <Button wide onClick={() => onViewModal({rep, day})}>
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
}

export default SideBar
