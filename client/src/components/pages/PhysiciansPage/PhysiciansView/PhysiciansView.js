import React, { Component } from 'react';
import { connect } from 'react-redux'

import { hasAuthTokenAsync } from '../../../../lib'

import {
  Table,
  Header,
  ActionBox,
  Button,
  Selector,
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
    }
  }

  componentDidMount() {
    hasAuthTokenAsync()
      .then(() => {
        this.props.getPhysicians()
      })
      .catch(console.log)
  }

  filterPhysicians(search) {
    const { searchType } = this.state

    this.setState({ search })
    this.props.filterPhysicians(search, searchType)
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            Physician Name
          </th>
          <th>
            Specialty
          </th>
          <th>
            Group
          </th>
          <th>
            Rep
          </th>
          <th>
            City
          </th>
          <th/>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    const { physicians } = this.props
    return (
      <tbody>
        {physicians.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(physician) {
    const { rep } = physician
    const { address } = physician
    return (
      <tr key={physician.id}>
        <td className="bold">
          {physician.nameDisplay}
        </td>
        <td>
          {physician.specialty || 'None'}
        </td>
        <td>
          {physician.group || 'None'}
        </td>
        <td>
          {rep ? rep.nameDisplay : 'Unassigned'}
        </td>
        <td>
          {address ? address.city : 'None'}
        </td>
        <td className={styles.detailsCell}>
          <Button
            title="DETAILS"
            link={`/physicians/${physician.id}`}
            onClick={() => this.props.setPhysician(physician)}
          />
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
    const {
      filterValue,
      searchType,
      search,
    } = this.state

    const {
      reps,
    } = this.props

    const filterOptions = [
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
    ]

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
