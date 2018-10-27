import React from 'react';
import Moment from 'react-moment'
import { Span, Table } from '../../../../common'
import { GET_PHYSICIAN } from '../../../../../actions/types/physicians';

import axios from 'axios'

var moment = require('moment');
moment().format();



class ScriptList extends React.Component {

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
        {this.props.data.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  // getPhysician() {
  //   axios.get('/api/physicians/search?physicianId=', { headers: { "Authorization": "Bearer " + loginToken } })
  //     .then((resp) => {
  //       console.log(resp);

  //       this.setState({

  //       })

  //     }).catch((error) => {
  //       console.error(error);
  //     })

  // }

  handleClick(value) {
    window.location = `/scripts/${value}`
  }

  renderTableRow(script) {
    console.log(this.props);
    console.log(this.state);
    

    return (

      <tr value={script.id} onClick={() => this.handleClick(script.id)}>

        <td>
          {script.status}
        </td>


        <td>
          <Moment format="MM/DD/YYYY">{script.processedOn || 'None'}</Moment>
        </td>

        <td>
          <Moment fromNow>{`${script.updatedAt}`}</Moment>
        </td>

        <td>

        </td>

        <td>
          Dr. {script.Physician.firstName} {script.Physician.lastName}
        </td>

        <td>
          {script.Patient.firstName} {script.Patient.lastName}
        </td>

        <td>
          {script.medication}
        </td>

        <td>
          {/* <td className={styles.detailsCell}> */}
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


    /* const {
     script,
     date
   } = this.state 

   var username = this.state.username; */

    if (this.props.data) {
      // const self = this;

      var scriptList = this.props.data.map(function (item, i) {

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
      <div>

        {this.renderTable()}
        {scriptList}
      </div>
    )
  }
}

export default ScriptList;