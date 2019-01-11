import React from 'react';

import Moment from 'react-moment'
import moment from 'moment'
import { Table } from '../../../../common'



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


  handleClick(value) {
    window.location = `/scripts/${value}`
  }

  renderOtherSection(script) {

    if (script.status === "Review") {
      return (
        <div>{script.location}</div>
      )
    } else if ((script.status === "QA") || (script.status === "Fill") || (script.status === "Shipped") || (script.status === "Done")) {
      return (
        <div>
          {script.shipOn ?
            <Moment format="MM/DD/YYYY">{script.shipOn || ''}</Moment>
            : <span></span>
          }
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderTableRow(script) {

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

        <td>{script.notesUpdated ?
          <Moment fromNow>{`${script.notesUpdated}`}</Moment>
          : <p></p>}
        </td>

        <td>
          {script.Physician.firstName} {script.Physician.lastName}
        </td>

        <td>
          {script.Patient.firstName} {script.Patient.lastName}
        </td>

        <td>
          {script.Product.name || ""}
        </td>

        <td>
          {this.renderOtherSection(script)}
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

    if (this.props.data) {

      var scriptList = this.props.data.sort(function (a, b) {
        return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
      });

      var scriptList = this.props.data.sort(function (a, b) {
        return new Date(a.shipOn).getTime() - new Date(b.shipOn).getTime()
      });

      var scriptList = this.props.data.sort(function (a, b) {
        return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
      });


      var scriptList = this.props.data.map(function (item, i) {

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
      <div>

        {this.renderTable()}
        {scriptList}
      </div>
    )
  }
}

export default ScriptList;