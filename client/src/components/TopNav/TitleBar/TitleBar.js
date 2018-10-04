import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import FontAwesome from 'react-fontawesome'
import Spinner from 'react-spinner'

// Components
import {
  Overlay,
} from '../../common'

import { logout } from '../../../actions/auth'

import styles from './TitleBar.css'

class TitleBar extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      showDropdown: false,
    }
  }

  renderDropdown() {
    const { nameDisplay } = this.props
    const { showDropdown } = this.state
    return (
      <div
        className={cn("options", {show: showDropdown})}
        onClick={() => this.setState({showDropdown: !showDropdown})}
      >
        {/* Clickable Section */}
        <span>{nameDisplay}</span>
        <FontAwesome name="caret-down" />

        {/* Dropdown */}
        <div className={cn("dropdown", {show: showDropdown})}>
          <div className="option">
            <NavLink to="/profile">
              <FontAwesome name="cog" />
              Settings
            </NavLink>
          </div>
          <div
            className="option"
            onClick={() => this.props.logout()}
          >
            <span>
              <FontAwesome name="sign-out" />
              Log Out
            </span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading } = this.props
    const { showDropdown } = this.state
    return (
      <div className={styles.titleBar}>
        {/* Title */}
        <div className="title">
          <NavLink to="/">
            {/* <img alt="SortPak" src="http://www.sortpak.com/site-uploadz/2018/05/sortpak-logo-lg.png" style={imageStyle.logo}/> */}
            SortPak
          </NavLink>
          <Spinner className={cn({loading})} />
        </div>

        {/* Dropdown */}
        {this.renderDropdown()}

        {/* Dropdown Overlay */}
        <Overlay
          active={showDropdown}
          onClick={() => this.setState({showDropdown: false})}
        />
      </div>
    )
  }
};

const imageStyle = {
  logo: {
    padding:'10px',
    width: '50px'
  },
}

const mapStateToProps = props => {
  const {
    auth,
  } = props

  const loading = auth.loading

  const { me } = auth
  const nameDisplay = (me && me.nameDisplay) || 'User'

  return {
    loading,
    nameDisplay,
  }
}

const actions = {
  logout,
}

export default connect(mapStateToProps, actions)(TitleBar)
