import React, { Component } from 'react';
import axios from 'axios';

import {Header, Body} from '../../../common'
import styles from './ScriptView.css'

// Components
import {
  SwitchTable
} from '../../../shared'

import DetailsTab from './Tabs/DetailsTab'
import NotesTab from './Tabs/NotesTab'
import AttachmentsTab from './Tabs/AttachmentsTab'



class ScriptView extends Component {

  constructor(props) {
    super(props)
    this.tabOptions = [
      {
        value: 'details',
        display: 'Details',
        renderComponent: () => this.renderDetailsTab(),
      },
      {
        value: 'notes',
        display: 'Notes',
        renderComponent: () => this.renderNotesTab(),
      },
      {
        value: 'attachments',
        display: 'Attachments',
        renderComponent: () => this.renderAttachmentsTab(),
      },
    ]

    this.state = {
      tab: this.tabOptions[0],
      ...this.initialState,
    }
  }

  state = {
    script: ''
}



  componentDidMount() {
    console.log(this.props);
      if (this.props.match.params.scriptId) {
        const loginToken = window.localStorage.getItem("token");

          axios.get('/api/scripts/search?scriptId=' + this.props.match.params.scriptId, { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp);
            let script = resp.data.response[0];
              this.setState({
                  status: script.status,
                  writtenDate: script.writtenDate,
                  patient: script.patient,
                  billOnDate: script.billOnDate,
                  rxNumber: script.rxNumber,
                  phone: script.phone,
                  diagnosis: script.diagnosis,
                  email: script.email,
                  secDiagnosis: script.secDiagnosis,
                  refills: script.refills,
                  refillsRemaining: script.refillsRemaining,
                  quantity: script.quantity,
                  daysSupply: script.daysSupply,
                  salesCode: script.salesCode,
                  cost: script.cost,
                  primInsPay: script.primInsPay,
                  secInsPay: script.secInsPay,
                  location: script.location,
                  copayApproval: script.copayApproval,
                  copayNetwork: script.copayNetwork,
                  patientPay: script.patientPay,
                  directions: script.directions
              }, () => console.log(this.state.status))

          }).catch((err) => {
              console.error(err)
          })
      }
  }

  renderSwitchTable() {
    const { tab } = this.state
    return (
      <SwitchTable
        tabs={this.tabOptions}
        selected={tab}
        onClick={tab => this.setState({ tab })}
      />
    )
  }

  renderDetailsTab() {
    return (
      <DetailsTab
        className={styles.detailsTab}
        sID={this.props}
      />
    )
  }

  renderNotesTab() {
    return (
      <NotesTab
        className={styles.notesTab}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
      />
    )
  }

  renderAttachmentsTab() {
    return (
      <AttachmentsTab
        className={styles.attachmentsTab}
        state={this.state}
        patient={this.props.patient}
        setState={this.setState.bind(this)}
        
      />
    )
  }

  

  render() {  
    return (
      <div>
        <Header id="scriptViewHead">
          <h2>Status: {this.state.status}</h2>
        </Header>

        <Body className={styles.body} id="scriptViewBody">

        {this.renderSwitchTable()}
        
          
        </Body>
      </div>
      
    );
  }
}

export default ScriptView;
