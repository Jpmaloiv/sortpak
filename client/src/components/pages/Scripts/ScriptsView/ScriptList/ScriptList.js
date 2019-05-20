import React from 'react';

import Moment from 'react-moment'
import ReactTable from "react-table";
import { Span, Table } from '../../../../common'
import moment from 'moment'



class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scripts: [],
      scriptSort: false,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      scriptSort: false,
      scripts: []
    })
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
            <Moment format="MM/DD/YYYY">{script.shipOn}</Moment>
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

  sortScripts() {
    this.setState({
      scripts: this.props.data
      }, this.filterScripts)
    // }, this.formatDates)

  }

  filterScripts() {
    const scripts = [];
    const sortReceived = [];
    const sortReview = [];
    const sortPriorAuth = [];
    const sortProcess = [];
    const sortCopayAssistance = [];
    const sortSchedule = [];
    console.log(this.props)
    console.log(this.state.scripts)

    const scriptsReceived = this.props.data.filter(function (event) {
      return event.status === 'Received';
    });
    let noNoteScriptsReceived = scriptsReceived.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsReceived.length; i++) {
      sortReceived.push(noNoteScriptsReceived[i])
    }
    let noteScriptsReceived = scriptsReceived.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsReceived = noteScriptsReceived.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsReceived.length; i++) {
      sortReceived.push(sortedNoteScriptsReceived[i])
    }

    sortReceived.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortReceived.length; i++) {
      scripts.push(sortReceived[i])
    }


    const scriptsReview = this.props.data.filter(function (event) {
      return event.status === 'Review';
    });
    let noNoteScriptsReview = scriptsReview.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsReview.length; i++) {
      sortReview.push(noNoteScriptsReview[i])
    }
    let noteScriptsReview = scriptsReview.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsReview = noteScriptsReview.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsReview.length; i++) {
      sortReview.push(sortedNoteScriptsReview[i])
    }

    sortReview.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortReview.length; i++) {
      scripts.push(sortReview[i])
    }


    const scriptsPriorAuth = this.props.data.filter(function (event) {
      return event.status === 'Prior Auth';
    });
    let noNoteScriptsPriorAuth = scriptsPriorAuth.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsPriorAuth.length; i++) {
      sortPriorAuth.push(noNoteScriptsPriorAuth[i])
    }
    let noteScriptsPriorAuth = scriptsPriorAuth.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsPriorAuth = noteScriptsPriorAuth.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsPriorAuth.length; i++) {
      sortPriorAuth.push(sortedNoteScriptsPriorAuth[i])
    }

    sortPriorAuth.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortPriorAuth.length; i++) {
      scripts.push(sortPriorAuth[i])
    }


    const scriptsProcess = this.props.data.filter(function (event) {
      return event.status === 'Process';
    });
    let noNoteScriptsProcess = scriptsProcess.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsProcess.length; i++) {
      sortProcess.push(noNoteScriptsProcess[i])
    }
    let noteScriptsProcess = scriptsProcess.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsProcess = noteScriptsProcess.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsProcess.length; i++) {
      sortProcess.push(sortedNoteScriptsProcess[i])
    }

    sortProcess.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortProcess.length; i++) {
      scripts.push(sortProcess[i])
    }


    const scriptsCopayAssistance = this.props.data.filter(function (event) {
      return event.status === 'Copay Assistance';
    });
    let noNoteScriptsCopayAssistance = scriptsCopayAssistance.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsCopayAssistance.length; i++) {
      sortCopayAssistance.push(noNoteScriptsCopayAssistance[i])
    }
    let noteScriptsCopayAssistance = scriptsCopayAssistance.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsCopayAssistance = noteScriptsCopayAssistance.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsCopayAssistance.length; i++) {
      sortCopayAssistance.push(sortedNoteScriptsCopayAssistance[i])
    }

    sortCopayAssistance.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortCopayAssistance.length; i++) {
      scripts.push(sortCopayAssistance[i])
    }


    const scriptsSchedule = this.props.data.filter(function (event) {
      return event.status === 'Schedule';
    });
    let noNoteScriptsSchedule = scriptsSchedule.filter(function (event) {
      return event.notesUpdated === null;
    });
    for (var i = 0; i < noNoteScriptsSchedule.length; i++) {
      sortSchedule.push(noNoteScriptsSchedule[i])
    }
    let noteScriptsSchedule = scriptsSchedule.filter(function (event) {
      return event.notesUpdated != null;
    })
    let sortedNoteScriptsSchedule = noteScriptsSchedule.sort(function (a, b) {
      return new Date(a.notesUpdated).getTime() - new Date(b.notesUpdated).getTime()
    });
    for (var i = 0; i < sortedNoteScriptsSchedule.length; i++) {
      sortSchedule.push(sortedNoteScriptsSchedule[i])
    }

    sortSchedule.sort(function (script1, script2) {

      if (script1.processedOn > script2.processedOn) return 1;
      if (script1.processedOn < script2.processedOn) return -1;

    });

    for (var i = 0; i < sortSchedule.length; i++) {
      scripts.push(sortSchedule[i])
    }


    const scriptsQA = this.props.data.filter(function (event) {
      return event.status === 'QA';
    });
    let noDateScriptsQA = scriptsQA.filter(function (event) {
      return event.shipOn === null;
    });
    for (var i = 0; i < noDateScriptsQA.length; i++) {
      scripts.push(noDateScriptsQA[i])
    }
    let dateScriptsQA = scriptsQA.filter(function (event) {
      return event.shipOn != null;
    });
    let sortedDateScriptsQA = dateScriptsQA.sort(function (a, b) {
      return new Date(a.shipOn).getTime() - new Date(b.shipOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsQA.length; i++) {
      scripts.push(sortedDateScriptsQA[i])
    }

    const scriptsFill = this.props.data.filter(function (event) {
      return event.status === 'Fill';
    });
    let noDateScriptsFill = scriptsFill.filter(function (event) {
      return event.shipOn === null;
    });
    for (var i = 0; i < noDateScriptsFill.length; i++) {
      scripts.push(noDateScriptsFill[i])
    }
    let dateScriptsFill = scriptsFill.filter(function (event) {
      return event.shipOn != null;
    });
    let sortedDateScriptsFill = dateScriptsFill.sort(function (a, b) {
      return new Date(a.shipOn).getTime() - new Date(b.shipOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsFill.length; i++) {
      scripts.push(sortedDateScriptsFill[i])
    }

    const scriptsShipped = this.props.data.filter(function (event) {
      return event.status === 'Shipped';
    });
    let noDateScriptsShipped = scriptsShipped.filter(function (event) {
      return event.shipOn === null;
    });
    for (var i = 0; i < noDateScriptsShipped.length; i++) {
      scripts.push(noDateScriptsShipped[i])
    }
    let dateScriptsShipped = scriptsShipped.filter(function (event) {
      return event.shipOn != null;
    });
    let sortedDateScriptsShipped = dateScriptsShipped.sort(function (a, b) {
      return new Date(b.shipOn).getTime() - new Date(a.shipOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsShipped.length; i++) {
      scripts.push(sortedDateScriptsShipped[i])
    }

    const scriptsDone = this.props.data.filter(function (event) {
      return event.status === 'Done';
    });
    let noDateScriptsDone = scriptsDone.filter(function (event) {
      return event.shipOn === null;
    });
    for (var i = 0; i < noDateScriptsDone.length; i++) {
      scripts.push(noDateScriptsDone[i])
    }
    let dateScriptsDone = scriptsDone.filter(function (event) {
      return event.shipOn != null;
    });
    let sortedDateScriptsDone = dateScriptsDone.sort(function (a, b) {
      return new Date(b.shipOn).getTime() - new Date(a.shipOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsDone.length; i++) {
      scripts.push(sortedDateScriptsDone[i])
    }

    const scriptsCancelled = this.props.data.filter(function (event) {
      return event.status === 'Cancelled';
    });
    let noDateScriptsCancelled = scriptsCancelled.filter(function (event) {
      return event.processedOn === null;
    });
    for (var i = 0; i < noDateScriptsCancelled.length; i++) {
      scripts.push(noDateScriptsCancelled[i])
    }
    let dateScriptsCancelled = scriptsCancelled.filter(function (event) {
      return event.processedOn != null;
    });
    let sortedDateScriptsCancelled = dateScriptsCancelled.sort(function (a, b) {
      return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsCancelled.length; i++) {
      scripts.push(sortedDateScriptsCancelled[i])
    }

    const scriptsRefill = this.props.data.filter(function (event) {
      return event.status === 'Refill';
    });
    let noDateScriptsRefill = scriptsRefill.filter(function (event) {
      return event.processedOn === null;
    });
    for (var i = 0; i < noDateScriptsRefill.length; i++) {
      scripts.push(noDateScriptsRefill[i])
    }
    let dateScriptsRefill = scriptsRefill.filter(function (event) {
      return event.processedOn != null;
    });
    let sortedDateScriptsRefill = dateScriptsRefill.sort(function (a, b) {
      return new Date(a.processedOn).getTime() - new Date(b.processedOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsRefill.length; i++) {
      scripts.push(sortedDateScriptsRefill[i])
    }

    const scriptsRenew = this.props.data.filter(function (event) {
      return event.status === 'Renew';
    });
    let noDateScriptsRenew = scriptsRenew.filter(function (event) {
      return event.processedOn === null;
    });
    for (var i = 0; i < noDateScriptsRenew.length; i++) {
      scripts.push(noDateScriptsRenew[i])
    }
    let dateScriptsRenew = scriptsRenew.filter(function (event) {
      return event.processedOn != null;
    });
    let sortedDateScriptsRenew = dateScriptsRenew.sort(function (a, b) {
      return new Date(a.processedOn).getTime() - new Date(b.processedOn).getTime()
    });
    for (var i = 0; i < sortedDateScriptsRenew.length; i++) {
      scripts.push(sortedDateScriptsRenew[i])
    }


    this.setState({
      scripts: scripts
    }, this.formatDates)
  }

  formatDates() {
    const { scripts } = this.state
    for (var i = 0; i < scripts.length; i++) {
      let date = moment(scripts[i].notesUpdated).fromNow();
      if (date === 'Invalid date') date = ''
      scripts[i].notesUpdated = date
    }
    this.setState({ render: !this.state.render })
  }


  render() {

    const columns = [{
      Header: 'Status',
      Cell: props =>
        <span>
          {props.original.status}
        </span>
    }, {
      Header: 'Date',
      Cell: props =>
        <Span icon="calendar">
          <Moment format="MM/DD/YYYY">{props.original.processedOn || 'None'}</Moment>
        </Span>
    }, {
      Header: 'Age',
      Cell: props =>
        <Moment fromNow>{props.original.updatedAt}</Moment>
    }, {
      Header: 'Note',
      Cell: props =>
        <span>{this.state.scripts[props.index].notesUpdated}</span>
    },
    {
      Header: 'Physician',
      Cell: props =>
        <span>{props.original.Physician.firstName} {props.original.Physician.lastName}</span>
    },
    {
      Header: 'Patient',
      Cell: props =>
        <span>{props.original.Patient.firstName} {props.original.Patient.lastName}</span>
    },
    {
      Header: 'Medication',
      minWidth: 225,
      Cell: props =>
        <span>{props.original.Product.name}</span>
    },
    {
      Header: 'Other',
      Cell: props =>
        <span>{this.renderOtherSection(props.original)}</span>
    },
    ]

    console.log(this.props)

    if ((this.props.data.length > 0) && (this.state.scriptSort === false)) {
      this.sortScripts();
      this.setState({
        scriptSort: true
      })
    }


    if (this.props.data) {
      var scriptList = this.state.scripts.map(function (item, i) {

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

        {/* {this.renderTable()}
        {scriptList} */}

        <ReactTable
          className="reactTable"
          data={this.state.scripts}
          columns={columns}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: e => window.location = `/scripts/${rowInfo.original.id}`
          })}
        />
      </div>
    )
  }
}

export default ScriptList;