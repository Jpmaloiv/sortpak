import React, { Component } from 'react';

import {
  Table,
  Header,
  ActionBox,
  Button,
  SearchBar,
} from '../../../common'

import styles from './RefillsView.css'

class RefillsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: 'Any',
    }
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            Ok To Refill
          </th>
          <th>
            Refill On
          </th>
          <th>
            Physician
          </th>
          <th>
            Group
          </th>
          <th>
            Patient
          </th>
          <th>
            DOB
          </th>
          <th>
            Medication
          </th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
      </tbody>
    )
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  render() {
    const { searchValue } = this.state
    const searchOptions = [
      'Any',
      'Name',
      'Email',
    ]

    return (
      <div className={styles.app}>
        <Header>
          <h2>
            Select a Patient
          </h2>
        </Header>
        <div className="body">
          <ActionBox>
            <div className="main">
              <SearchBar
                options={searchOptions}
                selected={searchValue}
                onSelect={searchValue => this.setState({ searchValue })}
                label="Search"
                placeholder="First or Last Name..."
              />
              <Button
                search
                icon="search"
                title="SEARCH"
              />
            </div>
            <div className="action">
              <Button
                icon="check"
                title="OK TO REFILL"
              />
            </div>
          </ActionBox>
          {this.renderTable()}
        </div>
      </div>
    );
  }
}

export default RefillsView;
