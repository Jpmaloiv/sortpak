import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import qs from 'query-string'
import { getDateObject } from '../../../lib'

import { Icon } from '../../common'

import {
  getVisits,
} from '../../../actions/main'

import styles from './NavBar.css'

class NavBar extends Component {
  callAgendaActions() {
    this.props.getVisits()
  }

  get agendaLink() {
    const { month, year } = getDateObject()
    const pathname = '/agenda'
    const search = qs.stringify({ month, year })
    return {
      pathname,
      search,
    }
  }

  get dashboardLink() {
    const pathname = '/dashboard'
    const view = 'day'
    const search = qs.stringify({ view })
    return {
      pathname,
      search,
    }
  }

  render() {
    // const isAdmin = 0;
    /* const { isAdmin, me } = this.props
    if (!me) {
      return (
        <div className={styles.navBar} />
      )
    } */

    return (
      <div className={styles.navBar}>

      <NavLink
        to="/scripts"
      >
        <Icon name="bookmark-o" />
        Scripts
      </NavLink>

      <NavLink
        to="/patients"
      >
        <Icon name="heart-o" />
        Patients
      </NavLink>

        <NavLink
          to={this.dashboardLink}
        >
          <Icon name="bar-chart" />
          Dashboard
        </NavLink>

        <NavLink
          to={this.agendaLink}
          onClick={() => this.callAgendaActions()}
        >
          <Icon name="th-large" />
          Agenda
        </NavLink>

        <NavLink
          to="/physicians"
        >
          <Icon name="stethoscope" />
          Physicians
        </NavLink>

        {/* {isAdmin && ( */}
          <NavLink
            to="/refills"
          >
            <Icon name="tint" />
            Refills
          </NavLink>
        


        {/* {isAdmin && ( */}
          <NavLink
            to="/products"
          >
            <Icon name="tint" />
            Products
          </NavLink>
        

        {/* {isAdmin && ( */}
          <NavLink
            to="/team"
          >
            <Icon name="user-o" />
            My Team
          </NavLink>
        
      </div>
    )
  }
}

const actions = {
  getVisits,
}

const mapStateToProps = ({router, auth}) => {
  const {
    isAdmin,
    me,
  } = auth

  return {
    isAdmin,
    router,
    me,
  }
}

export default connect(mapStateToProps, actions)(NavBar)
