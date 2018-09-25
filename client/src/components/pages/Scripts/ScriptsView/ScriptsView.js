import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

// import { hasAuthTokenAsync } from '../../../../lib'

import {Span, Table, Header, Button} from '../../../common'

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
      userID: ''
    }
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

  renderTableRow(script) {
    return (
      
      <tr key={script.id}>
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
          <Button
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
     /* const {
      script,
      date
    } = this.state 

    var username = this.state.username; */

    if (this.state.scripts) {
      // const self = this;

var scriptList = this.state.scripts.map(function (item, i) {
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
                <p>None found</p>
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
