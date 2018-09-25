import React, { Component } from 'react';
import { connect } from 'react-redux'

// Helpers
import { formatCurrencyOptions } from '../../../../lib'

// Components
import {
  SummaryItem,
  Table,
  Span,
} from '../../../common'

import styles from './AdminDashboard.css'

class AdminDashboard extends Component {
  renderCard({title, content}) {
    return (
      <SummaryItem
        className="card"
        key={title}
        title={title}
        content={content}
      />
    )
  }

  renderCards() {
    const patients = this.props.patients.length
    const repeatPatients = this.props.patients.filter(el => el.scripts).length
    const newPhysicians = this.props.physicians.filter(el => !el.repId).length
    const cardData = [
      { title: 'Avg. Daily Revenue' },
      { title: 'Avg. Daily Profit' },
      { title: 'Cost' },
      { title: 'Sales (scripts)' },
      {
        title: 'Patients',
        content: patients,
      },
      {
        title: 'Repeat Patients',
        content: repeatPatients,
      },
      {
        title: 'New Physicians',
        content: newPhysicians,
      },
    ]

    return (
      <div className="cards">
        {cardData.map(this.renderCard.bind(this))}
      </div>
    )
  }

  renderRepRow(rep) {
    return (
      <tr key={rep.id}>
        <td>
          <Span
            link={`/team/${rep.id}`}
            icon='user-circle'
          >
            {rep.nameDisplay}
          </Span>
        </td>
        <td>
          {rep.bonus.toLocaleString(...formatCurrencyOptions)}
        </td>
      </tr>
    )
  }

  renderRepScorecard() {
    const { reps } = this.props
    return (
      <div className="card-container">
        <h2>
          Rep Scorecard
        </h2>
        <Table
          className={styles.repsTable}
          borderless
        >
          <thead>
            <tr>
              <th>
                Rep
              </th>
              <th>
                Bonus
              </th>
            </tr>
          </thead>
          <tbody>
            {reps.map(this.renderRepRow.bind(this))}
          </tbody>
        </Table>
      </div>
    )
  }

  renderPhysicianRow(physician) {
    return (
      <tr key={physician.id}>
        <td>
          <Span icon='user-circle' />
          <div className="physician">
            <Span
              className="name"
              link={`/physicians/${physician.id}`}
            >
              {physician.nameDisplay}
            </Span>
            <span className="group">
              {physician.group || 'No Group Found'}
            </span>
          </div>
        </td>
      </tr>
    )
  }

  renderUnassignedPhysicians() {
    const physicians = this.props.physicians.filter(el => !el.repId)
    return (
      <div className="card-container">
        <h2>
          Unassigned Physicians
        </h2>
        <Table
          className={styles.physiciansTable}
          borderless
        >
          <thead>
            <tr>
              <th>
                Physician
              </th>
            </tr>
          </thead>
          <tbody>
            {physicians.map(this.renderPhysicianRow.bind(this))}
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.body}>
        <div className="graph">
        </div>
        {this.renderCards()}

        <div className="cards">
          {this.renderRepScorecard()}
          {this.renderUnassignedPhysicians()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    physicians,
    patients,
    reps,
  } = main
  return {
    physicians,
    patients,
    reps,
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(AdminDashboard);
