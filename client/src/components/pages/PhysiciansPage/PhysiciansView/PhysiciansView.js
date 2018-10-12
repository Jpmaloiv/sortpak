import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import {
  Table,
  Header,
  ActionBox,
  Button,
  // Selector,
  SearchBar,
} from '../../../common'

import {
  getPhysicians,
  filterPhysicians,
} from '../../../../actions/main'

import {
  setPhysician,
} from '../../../../actions/physicians'

import styles from './PhysiciansView.css'

class PhysiciansView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: 0,
      searchType: '',
      search: '',
      physicians: ''
    }
  }

  componentDidMount() {
    /* hasAuthTokenAsync()
      .then(() => {
        this.props.getPhysicians()
      })
      .catch(console.log) */

      const loginToken = window.localStorage.getItem("token");
        axios.get('api/physicians/search/', { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp);
            console.log(resp.data);
            console.log(resp.data.response);
            this.setState({
                physicians: resp.data.response,
                // id: resp.data.response.id,
               
            })
            console.log(this.state.physicians)
          }).catch((error) => {
            console.error(error);
        })
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            Physician Name
          </th>
          <th>
            Group
          </th>
          <th>
            Rep
          </th>
          <th>
            Specialty
          </th>
          <th>
            Phone
          </th>
          <th>
            Address
          </th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.physicians.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location=`/physicians/${value}`
  }

  renderTableRow(physician) {
    return (
      <tr value={physician.id} onClick={() => this.handleClick(physician.id)}>

        <td>
            Dr. {physician.firstName} {physician.lastName}
          
        </td>

        <td>
          {physician.group || 'None'}
        </td>

        <td>
          {physician.rep || 'None'}
        </td>

        <td>
          {physician.specialization || 'None'}
        </td>

        <td>
          {physician.phone || 'None'}
        </td>

        <td>
          {physician.address1} {physician.address3}
          <br />
          {physician.address2}
        </td>
   
      </tr>
    )
  }

  renderTable() {
    return (
      <Table className={styles.table}>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  render() {
    /* const {
      filterValue,
      searchType,
      search,
    } = this.state */

    /* const {
      reps,
    } = this.props */

    /* const filterOptions = [
      {
        value: '',
        display: 'All',
      },
      ...reps.map(rep => ({
        value: rep.id,
        display: rep.nameDisplay,
      })),
    ]

    const searchOptions = [
      {
        value: '',
        display: 'Any',
      },
      {
        value: 'name',
        display: 'Name',
      },
    ] */

    if (this.state.physicians) {
      // const self = this;

var physicianList = this.state.physicians.map(function (item, i) {
          console.log(item);
          return (
              <div key={i}>
                  {/* <div className="story-title-author">
                          <h3 className="story-title">{item.patient}</h3>
                
                      <h5 className="story-author">
                          {!(self.props.match.params.username)
                              ?
                              <div style={{ marginLeft: "5px" }} className="btn-group" role="group">
                                  <button onClick={() => self.showUpdForm(item)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>
                                  <button onClick={() => self.deleteBook(item.id)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
                              </div>
                              : null
                          }
                      </h5>
                  </div>
                  
                  <p>{item.description}</p>
                  <br /> */}
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
            Select a Physician
          </h2>

          <div className="action">
            <Button
              title="MERGE PHYSICIAN"
              style={{backgroundColor: "#ff7d38", marginRight: 10 }}
            />

            <Button
              link="physicians/add"
              icon="plus"
              title="ADD A NEW PHYSICIAN"
              style={{ marginRight: 8 }}
            />
        </div>

        </Header>

        <div className="body">

          <ActionBox>
            <div className="main">

              <SearchBar
                label="Search By Name"
                placeholder="First or Last Name..."
                type='name'
              />

              <SearchBar
                label="Search By Group"
                placeholder="Group Name..."
                type='groupName'
              />

              <SearchBar
                label="Search By Address"
                placeholder="Adress or City..."
                type='address'
              />

              <SearchBar
                label="Search By Phone"
                placeholder="(---) --- ---"
                type='phone'
              />

              <SearchBar
                label="Search By Specialty"
                placeholder="Specialty..."
                type='specialty'
              />

            {/*
              TODO: Automatic filter, no search button
              <Button
                search
                icon="search"
                title="SEARCH"
              />
            */}

              {/* TODO: Filter Select */}
              {/* WARNING: : PREVIOUS CODE
              <Selector
                label="Filter"
                selected={filterValue}
                options={filterOptions}
                onSelect={filterValue => this.setState({ filterValue })}
              />
              <SearchBar
                options={searchOptions}
                selected={searchType}
                onSelect={searchType => this.setState({ searchType })}
                label="Search"
                placeholder="First or Last Name..."
                value={search}
                onChange={this.filterPhysicians.bind(this)}
              />
              <Button
                search
                icon="search"
                title="SEARCH"
              />

              */}

            </div>

          </ActionBox>

          {this.renderTable()}
          {physicianList}

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    physiciansDisplay,
    reps,
  } = main

  return {
    physicians: physiciansDisplay,
    reps,
  }
}

const actions = {
  setPhysician,
  getPhysicians,
  filterPhysicians,
}

export default connect(mapStateToProps, actions)(PhysiciansView);
