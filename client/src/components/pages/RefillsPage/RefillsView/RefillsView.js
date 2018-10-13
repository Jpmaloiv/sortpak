import React, { Component } from 'react';

import {
  Table,
  Header,
  ActionBox,
  Button,
  SearchBar,
  Selector,
  ToggleSwitch
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
            Process On
          </th>
          <th>
            Physician
          </th>
          <th>
            Patient
          </th>
          <th>
            Medication
          </th>
          <th>
            Rx Number
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

    const typeOptions = [
      'OK to Refill',
      'Refill Request'
    ]

    const reps = [
      'All Reps'
    ]

    const specOptions = [
      'Internal Medicine',
      'Home Health',
      'Hospice',
      'Skilled Nursing Center',
      'Assisted Living',
      'Hospital',
      'Residential Living',
      'Oncology',
      'Rheumatology',
      'Dermatology',
      'Nephrology',
      'Neurology',
      'Gastroenterology',
      'Allergy',
      'Infectious Disease',
      'Transplant',
      'Orthopedic',
      'Endocrinology',
      'Urology',
      'Cardiology',
      'Hepatology'  
    ]

    return (
      <div className={styles.app}>
        <Header>
          <h2>
            Refills
          </h2>
        </Header>
        <div className="body">
          <ActionBox>
            <div className="main">
              <ToggleSwitch
                  label="Type"
                  options={typeOptions}
                  /* selected={filterValue}
                  onSelect={filterValue => this.setState({ filterValue })} */
                />
            </div>
          </ActionBox>
          
          <ActionBox>
            <div className="main">
              <SearchBar
                selected={searchValue}
                onSelect={searchValue => this.setState({ searchValue })}
                label="Search"
                placeholder="Search..."
              />
              <Selector
                wide
                label="Rep"
                options={reps}
              />
              <Selector
                wide
                label="Specialization"
                placeholder="Specialization"
                options={specOptions}
                /* value={specialization}
                onSelect={specialization => this.setState({ specialization })} */
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
