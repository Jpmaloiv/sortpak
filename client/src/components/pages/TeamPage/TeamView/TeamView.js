import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import { hasAuthTokenAsync } from '../../../../lib'

// 3rd Party Components
import FontAwesome from 'react-fontawesome'

// Components
import {
  Tr,
  Header,
  ActionBox,
  Button,
  SearchBar,
  Table,
} from '../../../common'

// Actions
import {
  getTeamMembers,
  filterTeamMembers,
} from '../../../../actions/main'

import {
  setMember,
} from '../../../../actions/team'

import styles from './TeamView.css'

class TeamView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: '',
      search: '',
    }
  }

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        this.props.getTeamMembers()
      })
      .catch(console.log)
  }

  filterUsers(search) {
    const { searchType } = this.state
    this.props.filterTeamMembers(search, searchType)
    this.setState({ search, searchType })
  }

  viewMember(e, user) {
    e.stopPropagation()
    this.props.setMember(user)
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Email Address
          </th>
          <th>
            Role
          </th>
          <th>
            Date Added
          </th>
          <th />
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    const { users } = this.props
    return (
      <tbody>
        {users.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(user) {
    const link = `/team/${user.id}`
    const date = moment(user.created_at).format('MM/DD/YYYY')
    return (
      <Tr
        to={link}
        key={user.id}
      >
        <td className="bold">
          {user.nameDisplay}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {user.roleDisplay}
        </td>
        <td>
          <FontAwesome style={{ marginRight: '10px' }} name="calendar" />
          {date}
        </td>
        <td className={styles.detailsCell}>
          <Button
            title="DETAILS"
            link={`/team/${user.id}`}
            onClick={e => this.viewMember(e, user)}
          />
        </td>
      </Tr>
    )
  }

  renderTable() {
    return (
      <Table className={styles.table} hoverable>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  get placeholderText() {
    switch (this.state.searchType) {
      case 'name':
        return 'Search By First or Last Name...'
      case 'email':
        return 'Search By Email...'
      default:
        return 'Search By Name or Email...'
    }
  }

  get searchOptions() {
    return [
      {
        value: '',
        display: 'Any',
      },
      {
        value: 'name',
        display: 'Name',
      },
      {
        value: 'email',
        display: 'Email',
      },
    ]
  }


  render() {
    // const { searchType } = this.state

    return (
      <div className={styles.app}>

        <Header>
          <h2>
            Team Members
          </h2>
        </Header>

        <div className="body">

          <ActionBox>

            <div className="main">

              <Button
                style={{ backgroundColor: 'gray', minWidth: 80, minHeight: 40, marginRight: 20 }}
                title='Admin'

              />

              <Button
                style={{ backgroundColor: 'lightGray' , minWidth: 80, minHeight: 40, marginRight: 20  }}
                title='Sales'
              />

              <Button
                style={{ backgroundColor: 'lightGray' , minWidth: 80, minHeight: 40, marginRight: 20  }}
                title='Physicians'
              />

              <SearchBar
                label="Search By Name"
                placeholder="First or Last Name..."
              />

            {/* COMMENTED TO MATCH DESIGN
              <SearchBar
                options={this.searchOptions}
                selected={searchType}
                onSelect={searchType => this.setState({ searchType })}
                label="Search"
                placeholder={this.placeholderText}
                value={this.state.search}
                onChange={this.filterUsers.bind(this)}
              />


              <Button
                search
                icon="search"
                title="SEARCH"
              />

            */}

            <Button
              link='/team/add'
              icon="plus"
              title="ADD A NEW USER"
            />

            </div>

          </ActionBox>

          {this.renderTable()}

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({main}) => {
  const {
    adminsDisplay,
  } = main
  return {
    users: adminsDisplay,
  }
}

const actions = {
  getTeamMembers,
  filterTeamMembers,
  setMember,
}

export default connect(mapStateToProps, actions)(TeamView);
