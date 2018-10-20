import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import Medications from '../Medications.js'

import {Selector, Button, Header, Input, Body, Table, ToggleSwitch, Form,} from '../../../common'
import styles from './EditScript.css';
import { checkCredentials } from '../../../../lib/index.js';

class EditScript extends Component {

    constructor(props) {
        super(props)
        this.state = {
          processedOn: '',
          physicians: '',
          physicianOptions: [],
          medicationVal: ''
        }

        this.handleCopayApproval = this.handleCopayApproval.bind(this);
        this.handleHomeInfusion = this.handleHomeInfusion.bind(this);
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
                  id: script.id,
                  processedOn: script.processedOn,
                  patient: script.patient,
                  status: script.status,
                  priorAuth: script.priorAuth,
                  location: script.location,
                  transNPI: script.transNPI,
                  transDate: script.transDate,
                  writtenDate: script.writtenDate,
                  salesCode: script.salesCode,
                  billOn: script.billOn,
                  cost: script.cost,
                  rxNumber: script.rxNumber,
                  primInsPay: script.primInsPay,
                  secInsPay: script.secInsPay,
                  patientPay: script.patientPay,
                  refills: script.refills,
                  refillsRemaining: script.refillsRemaining,
                  quantity: script.quantity,
                  daysSupply: script.daysSupply,
                  directions: script.directions,
                  copayApproval: script.copayApproval,
                  copayNetwork: script.copayNetwork,
                  shipOn: script.shipOn,
                  deliveryMethod: script.deliveryMethod,
                  trackNum: script.trackNum,
                  ETA: script.ETA,
                  paymentOption: script.paymentOption,
                  homeInfusion: script.homeInfusion,
                  phone: script.phone,
                  email: script.email        
              }, () => console.log(this.state.status))
            
              this.handleCopayApproval();

          }).catch((err) => {
              console.error(err)
          })
      }  
    } 


    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCopayApproval = (event) => {
        if (this.state.copayApproval === "Approved") {
        this.state.copayApproved = true;
        } else {
            this.state.copayApproved =  false;
        }
        this.forceUpdate();
    }

    handleHomeInfusion() {
        this.setState(prevState => ({
          homeInfusion: !prevState.homeInfusion 
        }));
        console.log(this.state.homeInfusion)
      }

    updateScript = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.put('/api/scripts/update?id=' + this.state.id +'&processedOn=' + this.state.processedOn + '&patient=' + this.state.patient + "&medication=" + this.state.medication +
        '&status=' + this.state.status + '&priorAuth=' + this.state.priorAuth + '&location=' + this.state.location + '&transNPI=' + this.state.transNPI + '&transDate=' + this.state.transDate +
        '&writtenDate=' + this.state.writtenDate + '&salesCode=' + this.state.salesCode + '&billOn=' + this.state.billOn + '&cost=' + this.state.cost + '&rxNumber=' +
        this.state.rxNumber + '&primInsPay=' + this.state.primInsPay + '&secInsPay=' + this.state.secInsPay + '&patientPay=' + this.state.patientPay + '&refills=' + this.state.refills + '&refillsRemaining' +
        this.state.refillsRemaining + '&quantity=' + this.state.quantity + '&daysSupply=' + this.state.daysSupply + '&directions=' + this.state.directions + '&copayApproval=' + this.state.copayApproval + '&copayNetwork=' +
        this.state.copayNetwork + '&shipOn=' + this.state.shipOn + '&deliveryMethod=' + this.state.deliveryMethod + '&trackNum=' + this.state.trackNum + '&ETA=' + this.state.ETA + '&paymentOption=' + this.state.paymentOption + 
        '&homeInfusion=' + this.state.homeInfusion + '&phone=' + this.state.phone + '&email=' + this.state.email,
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push(`/scripts/${this.state.id}`);              
            }).catch((error) => {
                console.error(error);
            })
    }

    render() {

        const statusOptions = [
            'Received',
            'Review',
            'Prior Auth',
            'Process',
            'Copay Assistance',
            'Schedule',
            'QA',
            'Fill',
            'Shipped',
            'Done',
            'Cancelled',
            'Refill'
        ]

        const priorAuthOptions = [
            'Approved',
            'Denied',
            'Payor Restriction',
            'Limited Distribution'
        ]

        const copayApprovalOptions = [
            'Approved',
            'Denied'
        ]

        const copayNetworkOptions = [
            'Cancer Care Foundation',
            'Chronice Disease Fund',
            'Health Well',
            'LLS',
            'Patient Access Network',
            'Patient Advocate',
            'Patient Service Inc',
            'Safety Net Foundation',
            'Good Days',
            'Coupon',
            'Voucher',
            'Copay Card'
        ]

        const deliveryOptions = [
            'UPS',
            'Fedex',
            'GSO',
            'Deliver-it',
            'US Postal',
            'Delivery Driver'
          ]

        const paymentOptions = [
            'Collect on Delivery',
            'Mail in Check',
            'Credit Card',
            'No Copay'
        ]

        const {
            homeInfusion
        } = this.state

        return (
            <div>
                <Header>
                    <h2>Edit Script</h2>
                    <Button
                        onClick={this.updateScript} 
                        title="SAVE" 
                        className="submit btn btn-default" 
                        type="submit" 
                        value="Submit"
                        style={{ marginRight: 8 }}
                    />
                </Header>
                <Body className={styles.body} id="editScript">

                    <Form className={styles.form}>
                    <Table>
                        <thead><h3>GENERAL INFORMATION</h3></thead>
                        <tr>
                            <td>                 
                                 <Input
                                    type="date"
                                    label="Processed On"
                                    value={this.state.processedOn}
                                    onChange={processedOn => this.setState({ processedOn })}
                                />
                            </td>
                            <td>
                                <Button
                                    title="DO NOT REFILL"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    placeholder={this.state.patient}
                                    label="Patient"
                                    value={this.state.patient}
                                    onChange={patient => this.setState({ patient })}
                                />
                            </td>
                            <td>
                                <Input
                                    label="Physician"
                                    value={this.state.physician}
                                    onChange={physician => this.setState(( physician ))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Medications 
                                    placeholder="Medication"
                                />
                            </td>
                            <td>
                                <Selector
                                    options={statusOptions}
                                    selected={this.state.status}
                                    onSelect={status => this.setState({ status })}
                                />
                            </td>
                        </tr>
                    </Table>

                    <Table>
                        <thead><h3>PRIOR AUTHORIZATION</h3></thead>
                        <tr>
                            <td>
                                <Selector
                                    options={priorAuthOptions}
                                    selected={this.state.priorAuth}
                                    onSelect={priorAuth => this.setState({ priorAuth })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Location"
                                    value={this.state.location}
                                    onChange={location => this.setState({ location })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Transfer Pharmacy NPI"
                                    placeholder={this.state.transNPI}
                                    value={this.state.transNPI}
                                    onChange={transNPI => this.setState({ transNPI })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    type="date"
                                    label="Transfer Pharamcy Date"
                                    placeholder={this.state.transDate}
                                    value={this.state.transDate}
                                    onChange={transDate => this.setState({ transDate })}
                                />
                            </td>
                        </tr>
                    </Table>

                    <Table>
                        <thead><h3>PROCESSING</h3></thead>
                        <tr>
                            <td>
                                <Input
                                    type="date"
                                    label="Written Date"
                                    placeholder={this.state.writtenDate}
                                    value={this.state.writtenDate}
                                    onChange={writtenDate => this.setState({ writtenDate })}
                                />
                            </td>
                            <td>
                                <Input
                                    label="Sales Code"
                                    placeholder={this.state.salesCode}
                                    value={this.state.salesCode}
                                    onChange={salesCode => this.setState({ salesCode })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    type="date"
                                    label="Bill On"
                                    placeholder={this.state.billOn}
                                    value={this.state.billOn}
                                    onChange={billOn => this.setState({ billOn })}
                                />
                            </td>
                            <td>
                                <Input
                                    label="Cost"
                                    placeholder={this.state.cost}
                                    value={this.state.cost}
                                    onChange={cost => this.setState({ cost })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="RX Number"
                                    placeholder={this.state.rxNumber}
                                    value={this.state.rxNumber}
                                    onChange={rxNumber => this.setState({ rxNumber })}
                                />
                            </td>
                            <td>
                                <Input
                                    label="Primary Insurance Pay"
                                    placeholder={this.state.primInsPay}
                                    value={this.state.primInsPay}
                                    onChange={primInsPay => this.setState({ primInsPay })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Patient Pay"
                                    placeholder={this.state.patientPay}
                                    value={this.state.patientPay}
                                    onChange={patientPay => this.setState({ patientPay })}
                                />
                            </td>
                            <td>
                                <Input
                                    label="Secondary Insurance Pay"
                                    placeholder={this.state.secInsPay}
                                    value={this.state.secInsPay}
                                    onChange={secInsPay => this.setState({ secInsPay })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Refill #"
                                    placeholder={this.state.refills}
                                    value={this.state.refills}
                                    onChange={refills => this.setState({ refills })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Refills Remaining"
                                    placeholder={this.state.refillsRemaining}
                                    value={this.state.refillsRemaining}
                                    onChange={refillsRemaining => this.setState({ refillsRemaining })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Quantity"
                                    placeholder={this.state.quantity}
                                    value={this.state.quantity}
                                    onChange={quantity => this.setState({ quantity })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Days Supply"
                                    placeholder={this.state.daysSupply}
                                    value={this.state.daysSupply}
                                    onChange={daysSupply => this.setState({ daysSupply })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Directions"
                                    placeholder={this.state.directiions}
                                    value={this.state.directions}
                                    onChange={directions => this.setState({ directions })}
                                />
                            </td>
                        </tr>
                    </Table>

                    <Table>
                        <thead><h3>COPAY ASSISTANCE</h3></thead>
                        <tr>
                            <td>
                                <Selector
                                    label="Status"
                                    options={copayApprovalOptions}
                                    selected={this.state.copayApproval}
                                    value={this.state.copayApproval}
                                    onSelect={copayApproval => this.setState({ copayApproval }, this.handleCopayApproval )}
                                    
                                />
                            </td>
                            { this.state.copayApproved ? 
                            <td>
                                <Selector
                                    label="Copay Network"
                                    options={copayNetworkOptions}
                                    selected={this.state.copayNetwork}
                                    value={this.state.copayNetwork}
                                    onSelect={copayNetwork => this.setState({ copayNetwork })}
                                />
                                
                            </td> : <td></td> }
                        </tr>
                    </Table>

                    <Table>
                        <thead><h3>SHIPPING</h3></thead>
                        <tr>
                            <td>
                                <Input
                                    type="date"
                                    label="Ship On"
                                    placeholder={this.state.shipOn}
                                    value={this.state.shipOn}
                                    onChange={shipOn => this.setState({ shipOn })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Selector
                                    label="Delivery Method"
                                    options={deliveryOptions}
                                    selected={this.state.deliveryMethod}
                                    value={this.state.deliveryMethod}
                                    onSelect={deliveryMethod => this.setState({ deliveryMethod })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Tracking Number"
                                    placeholder={this.state.trackNum}
                                    value={this.state.trackNum}
                                    onChange={trackNum => this.setState({ trackNum })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    type="date"
                                    label="ETA"
                                    placeholder={this.state.ETA}
                                    value={this.state.ETA}
                                    onChange={ETA => this.setState({ ETA })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Selector
                                    label="Payment Option"
                                    options={paymentOptions}
                                    selected={this.state.paymentOption}
                                    value={this.state.paymentOption}
                                    onSelect={paymentOption => this.setState({ paymentOption })}
                                />
                            </td>
                        </tr>
                    </Table>

                    <Table>
                        <thead><h3>HOME INFUSION</h3></thead>
                        <tr>
                            <td>
                            <input className="checkbox" type="checkbox"  checked={this.state.homeInfusion} onChange={this.handleHomeInfusion} />
                            Home Infusion
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Phone"
                                    placeholder={this.state.phone}
                                    value={this.state.phone}
                                    onChange={phone => this.setState({ phone })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Input
                                    label="Email"
                                    placeholder={this.state.email}
                                    value={this.state.email}
                                    onChange={email => this.setState({ email })}
                                />
                            </td>
                        </tr>
                    </Table>

                    </Form>
                </Body>
            </div>
        );
    }
}



export default EditScript;