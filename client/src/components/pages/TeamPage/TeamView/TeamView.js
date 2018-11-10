import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from 'axios'
import Moment from 'react-moment'
import { TablePagination } from 'react-pagination-table';


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
    axios.get('/api/user/search/', { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp);
        // for (let i = 0; i < resp.data.response.length; i++) {
        // moment(resp.data.response[0].createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD')
        // console.log(resp.data.response[0].createdAt);
        // this.setState({
        //   user: moment(resp.data.response[0].createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD')
        // },() => console.log(this.state.user))

        this.setState({
          users: resp.data.response
        })



      }).catch((err) => {
        console.error(err)
      })
  }

  handleClick(value) {
    window.location = `/team/${value}`
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
      <Table className={styles.table} hoverable>
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
                style={{ backgroundColor: 'lightGray', minWidth: 80, minHeight: 40, marginRight: 20 }}
                title='Sales'
              />

              <Button
                style={{ backgroundColor: 'lightGray', minWidth: 80, minHeight: 40, marginRight: 20 }}
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
