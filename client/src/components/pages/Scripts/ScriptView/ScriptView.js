import React, { Component } from 'react';
import axios from 'axios';

import {Header, Body, Table, ToggleSwitch} from '../../../common'
import styles from './ScriptView.css'


// Components
import {
  SwitchTable
} from '../../../shared'

import DetailsTab from './Tabs/DetailsTab'
import NotesTab from './Tabs/NotesTab'
import AttachmentsTab from './Tabs/AttachmentsTab'
import RXHistoryTab from './Tabs/RXHistoryTab'
import FaxesTab from './Tabs/FaxesTab'
import StatusesTab from './Tabs/StatusesTab'
import PaymentsTab from './Tabs/PaymentsTab'



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
        renderComponent: () => this.renderNotesTab()
      },
      {
        value: 'attachments',
        display: 'Attachments',
        renderComponent: () => this.renderAttachmentsTab()
      },
      {
        value: 'rxHistory',
        display: 'RX History',
        renderComponent: () => this.renderRXHistoryTab()
      },
      {
        value: 'faxes',
        display: 'Faxes',
        renderComponent: () => this.renderFaxesTab()
      },
      {
        value: 'statuses',
        display: 'Statuses',
        renderComponent: () => this.renderStatusesTab()
      },
      {
        value: 'payments',
        display: 'Payments',
        renderComponent: () => this.renderPaymentsTab()
      }
    ]

    this.state = {
      tab: this.tabOptions[0],
      ...this.initialState
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

  closeModal() {
    this.setState({
      attachmentModal: null
    })
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
        onCloseModal={() => this.closeModal()}       
      />
    )
  }

  renderRXHistoryTab() {
    return (
      <RXHistoryTab
        className={styles.rxHistoryTab}
        state={this.state}
        patient={this.props.patients}
        setState={this.setState.bind(this)} 
      />
    )
  }

  renderFaxesTab() {
    return (
      <FaxesTab />
    )
  }

  renderStatusesTab() {
    return (
    <StatusesTab />
    )
  }

  renderPaymentsTab() {
    return (
      <PaymentsTab />
    )
  }

  

  render() {

    const {
      filterValue,
      searchValue,
    } = this.state

    const statusValues = [
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

    return (
      <div>
        <Header className={styles.header} id="scriptViewHead">
          <Table>
            <tr>
              <td>
              <ToggleSwitch
                options={statusValues}
                selected={filterValue}
                onSelect={filterValue => this.setState({ searchValue })}
                allowsMultipleSelection
              /> 
              </td>
            </tr>
            <tr>
              <td><h2>Status: {this.state.status}</h2></td>
            </tr>
          </Table>
         
       
          
          
          
        </Header>

        <Body className={styles.body} id="scriptViewBody">


          {this.renderSwitchTable()}
        
          
        </Body>
      </div>
      
    );
  }
}

export default ScriptView;
