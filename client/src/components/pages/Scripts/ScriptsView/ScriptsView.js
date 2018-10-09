import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'


// import { hasAuthTokenAsync } from '../../../../lib'

import {Span, Selector, Table, Header, Button, ActionBox, ToggleSwitch, SearchBar} from '../../../common'

import {
  getScripts,
  /* filterScriptsByName,
  filterScriptsByDob, */
} from '../../../../actions/main'

import {
  setScript,
} from '../../../../actions/scripts'

import styles from './ScriptsView.css'

class ScriptsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: '',
      status: '',
      date: '',
      age: '',
      note: '',
      physician: '',
      patient: '',
      medication: '',
      other: '',
      username: '',
      userID: '',
      
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    /* hasAuthTokenAsync()
      .then(() => {
        this.props.getScripts()
      })
      .catch(console.log) */

      const loginToken = window.localStorage.getItem("token");
        axios.get('api/scripts/search/', { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp);
            console.log(resp.data);
            console.log(resp.data.scripts);
            this.setState({
                scripts: resp.data.response,
                // id: resp.data.response.id,
                patient: resp.data.patient,
                medication: resp.data.medication,
                status: resp.data.status,
                pharmNPI: resp.data.pharmNPI,
                location: resp.data.location,
                pharmDate: resp.data.pharmDate
            })
            console.log(this.state.scripts);
          }).catch((error) => {
            console.error(error);
        })
        console.log(this.state.scripts);
        

        /* let searchsearchScripts(searchParams);Params = "?";
        console.log("TEST");
        if (this.state.salesCode) searchParams += "&salesCode=" + this.state.salesCode; */
        
      }

        

  renderTableHead() {
    return (
    
      <thead>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Age</th>
          <th>Note</th>
          <th>Physician</th>
          <th>Patient</th>
          <th>Medication</th>
          <th>Other</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.scripts.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  handleClick(value) {
    window.location=`/scripts/${value}`
  }

  renderTableRow(script) {
    
    
    
    return (
      
      <tr value={script.id} onClick={() => this.handleClick(script.id)}>
    
        <td>
          {script.status}
        </td>
      

        <td>
          <Span icon="calendar">
            {script.dateDisplay || 'None'}
          </Span>
        </td>

        {/* <td>
          <Span icon="phone">
            {patient.phoneDisplay || 'None'}
          </Span>
        </td> */}

       {/*  <td>
          {address}
        </td> */}

        <td>

        </td>

        <td>

        </td>

        <td>

        </td>

        <td>
          {script.patient}
        </td>

        <td>
          {script.medication}
        </td>

        <td className={styles.detailsCell}>
          <Span
            title="DETAILS"
            link={`/scripts/${script.id}`}
            onClick={() => this.props.setScript(script)}
          />
        </td>
      </tr>  
      
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
    console.log(this.state.scripts);

    const {
      medicare
    } = this.state

    const {
      filterValue,
      searchValue,
    } = this.state

    const Type1Options = [
      'RX',
      'HC',
    ]

    const Type2Options = [
      'SP',
      'Third Party',
    ]

    const SpecialOptions = [
      'Medicare',
    ]

    const RepOptions = [
      'All Reps',
      'No Reps',
      'EE',
    ]

    const SpecializationOptions = [
      'All Specializations',
      'No Specialization',
      'EE'
    ]

    const StatusValues = [
      "Received",
      "Review",
      "Prior Auth",
      "Process",
      "Copay Assistance",
      "Schedule",
      "QA",
      "Fill",
      "Shipped",
      "Done",
      "Cancelled",
      "Refill",
    ]

     /* const {
      script,
      date
    } = this.state 

    var username = this.state.username; */

    if (this.state.scripts) {
      // const self = this;

var scriptList = this.state.scripts.map(function (item, i) {
          
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
            Select a Script
          </h2>

          <div className="action">

            <Button
              link="/scripts/add"
              icon="plus"
              title="ADD A NEW SCRIPT"
              style={{ marginRight: 8 }}
            />

        </div>

        </Header>

        <div className="body">

           <ActionBox>
              <div className='main'>
                <ToggleSwitch
                  label="Type"
                  options={Type1Options}
                  selected={filterValue}
                  onSelect={filterValue => this.setState({ filterValue })}
                />
                  <ToggleSwitch
                    label="Special"
                    options={SpecialOptions}
                    selected={filterValue}
                    onSelect={medicare => this.setState({ medicare })}
                    onClick={this.submitSearch}
                  />
                <ToggleSwitch
                    label="Type"
                    options={Type2Options}
                    selected={filterValue}
                    onSelect={filterValue => this.setState({ filterValue })}
                />
              <SearchBar
                selected={searchValue}
                onSelect={searchValue => this.setState({ searchValue })}
                label="Search"
                placeholder="Search..."
              />
              </div>
            </ActionBox>
            <ActionBox>
              <div className="main">
                <Selector
                  label="Rep"
                  options={RepOptions}
                  selected={filterValue}
                  onSelect={filterValue => this.setState({ searchValue })}
                />
                  <Selector
                    label="Specialization"
                    options={SpecializationOptions}
                    selected={filterValue}
                    onSelect={filterValue => this.setState({ searchValue })}
                  />
              </div>
            </ActionBox>
            <ActionBox>
              <div className="main">
                <ToggleSwitch
                  label="Type"
                  options={StatusValues}
                  selected={filterValue}
                  onSelect={filterValue => this.setState({ searchValue })}
                  allowsMultipleSelection
                />
              </div>
            </ActionBox>

          {this.renderTable()}
          {scriptList}

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    // scripts,
    scriptsDisplay,
    loading,
    error,
  } = main

  return {
    scripts: scriptsDisplay,
    loading,
    error,
  }
}

const actions = {
  getScripts,
  setScript,
  /* filterScriptsByName,
  filterScriptsByDob, */
}

export default connect(mapStateToProps, actions)(ScriptsView);
