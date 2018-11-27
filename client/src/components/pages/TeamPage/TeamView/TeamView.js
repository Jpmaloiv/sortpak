import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from 'axios'
import Moment from 'react-moment'
import { TablePagination } from 'react-pagination-table';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


// Components
import {
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

const th = ['NAME', 'USERNAME', 'EMAIL ADDRESS', 'ROLE', 'DATE ADDED']

class TeamView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchType: '',
      search: '',
    }
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    console.log(loginToken);
    axios.get('api/user/search/')
      .then((resp) => {
        console.log(resp);
        this.setState({
          users: resp.data.response
        })
      }).catch((err) => {
        console.error(err)
      })
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

  renderTable() {
    return (
      <Table className="userTable" hoverable>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Username
          </th>
          <th>
            Email Address
          </th>
          <th>
            Role
          </th>
          <th>Date Added</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.users.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location = `/team/${value}/edit`
  }

  renderTableRow(user) {
    return (
      <tr value={user.id} onClick={() => this.handleClick(user.id)}>
        <td>
          {user.name || ''}
        </td>

        <td>
          {user.username || ''}
        </td>

        <td>
          {user.email || ''}
        </td>

        <td>
          {user.role || ''}
        </td>
        <td><Moment format="MM/DD/YYYY">{user.createdAt || ''}</Moment></td>
      </tr>
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

  submitSearch() {
    let roles = ''
    if (this.state.searchAdmin) roles += ',Admin'
    if (this.state.searchReps) roles += ',Rep'
    if (this.state.searchPhysicians) roles += ',Physician'
    var roleFilter = roles.substring(1);
    const loginToken = window.localStorage.getItem("token");
    axios.get('api/user/search?userRole=' + roleFilter, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp)
        this.setState({
          users: resp.data.response
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  userSearch(e) {
    this.setState({ searchAdmin: e.includes(1) }, this.submitSearch)
    this.setState({ searchReps: e.includes(2) }, this.submitSearch)
    this.setState({ searchPhysicians: e.includes(3) }, this.submitSearch)
  }



  render() {

    if (this.state.users) {
      var userList = this.state.users.map(function (item, i) {
        console.log(item);
        return (
          <div key={i}>
          </div>
        )
      })
    }
    else {
      return <div>
        <p></p>
      </div>
    }

    return (
      <div className={styles.app}>


        <div className="body" style={{ marginTop: 1 }}>

          <ActionBox>

            <div className="main">

              {/* <Button
                style={{ backgroundColor: 'gray', minWidth: 80, minHeight: 40, marginRight: 20 }}
                title='Admin'

              />

              <Button
                style={{ backgroundColor: 'lightGray', minWidth: 80, minHeight: 40, marginRight: 20 }}
                title='Sales'
              />

              <Button
                style={{ backgroundColor: 'lightGray', minWidth: 80, minHeight: 40, marginRight: 20 }}
                title='Physicians'
              /> */}

              <ToggleButtonGroup
                name='teamSearch'
                type='checkbox'
                className="teamSearch"
                value={this.state.value}
                onChange={this.userSearch.bind(this)}
              >
                <ToggleButton value={1}>Admin</ToggleButton>
                <ToggleButton value={2}>Sales</ToggleButton>
                <ToggleButton value={3}>Physicians</ToggleButton>
              </ToggleButtonGroup>

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
          {/* {this.state.users ?
            <TablePagination
              headers={th}
              data={this.state.users}
              columns={"name.username.email.role.createdAt"}
              perPageItemCount={10}
              totalCount={this.state.users.length}
            // arrayOption={ [["size", 'all', ' ']] }
            />
            
            :
            <div></div>} */}
          {this.renderTable()}
          {userList}

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
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
