import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import {
    patientChange,
    medicationChange,
    pharmNPIChange,
    locationChange,
    pharmDateChange,
    writtenDateChange,
    salesCodeChange,
    billOnDateChange,
    costChange,
    rxNumberChange,
    primInsPayChange,
    diagnosisChange,
    secInsPayChange,
    secDiagnosisChange,
    patientPayChange,
    refillsChange,
    refillsRemainingChange,
    quantityChange,
    daysSupplyChange,
    directionsChange,
    phoneChange,
    emailChange
} from '../../../../actions/auth'

import {Selector, Button, Header, Input, Body, Form,} from '../../../common'
import styles from './AddScript.css';

class AddScript extends React.Component {

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitscript = (event) => {
        event.preventDefault();
        console.log(this.state.copayApproval);
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.post('/api/scripts/add?patient=' + this.props.patient + "&medication=" + this.props.medication + "&status=" + this.state.status + "&pharmNPI=" + this.props.pharmNPI
        + "&location=" + this.props.location + "&pharmDate=" + this.props.pharmDate + "&writtenDate=" + this.props.writtenDate + "&salesCode=" + this.props.salesCode +
        "&billOnDate=" + this.props.billOnDate + "&cost" + this.props.cost + "&rxNumber=" + this.props.rxNumber + "&primInsPay=" + this.props.primInsPay + "&diagnosis=" + this.props.diagnosis +
        "&secInsPay=" + this.props.secInsPay + "&secDiagnosis" + this.props.secDiagnosis + "&patientPay=" + this.props.patientPay + "&refills=" + this.props.refills +
        "&refillsRemaining=" + this.props.refillsRemaining + "&quantity=" + this.props.quantity + "&daysSupply" + this.props.daysSupply + "&directions=" + this.props.directions +
        "&copayApproval=" + this.state.copayApproval + "&copayNetwork=" + this.state.copayNetwork + "&homeInfusion" + this.props.homeInfusion + "&phone=" + this.props.phone + "&email=" + this.props.email, 
        data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/scripts");              
            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        const {
            patient,
            patientChange,
            medication,
            medicationChange,
            pharmNPI,
            pharmNPIChange,
            location,
            locationChange,
            pharmDate,
            pharmDateChange,
            writtenDate,
            writtenDateChange,
            salesCode,
            salesCodeChange,
            billOnDate,
            billOnDateChange,
            cost,
            costChange,
            rxNumber,
            rxNumberChange,
            primInsPay,
            primInsPayChange,
            diagnosis,
            diagnosisChange,
            secInsPay,
            secInsPayChange,
            secDiagnosis,
            secDiagnosisChange,
            patientPay,
            patientPayChange,
            refills,
            refillsChange,
            refillsRemaining,
            refillsRemainingChange,
            quantity,
            quantityChange,
            daysSupply,
            daysSupplyChange,
            directions,
            directionsChange,
            homeInfusion,
            phone,
            phoneChange,
            email,
            emailChange
        } = this.props

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

       

        return (
            <div>
                <Header>
                    <h2>Add A New Script</h2>
                    <Button
                        onClick={this.submitscript} 
                        title="CREATE SCRIPT" 
                        className="submit btn btn-default" 
                        type="submit" 
                        value="Submit"
                        style={{ marginRight: 8 }}
                    />
                </Header>
                <Body className={styles.body} id="addScript">
                    <Form className={styles.form}>
                        <Input
                            placeholder="Patient"
                            value={patient}
                            onChange={patientChange}
                        />
                        <Input
                            placeholder="Medication"
                            value={medication}
                            onChange={medicationChange}
                        />

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h4>Prior Authorization</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Selector
                                            wide
                                            label="Status"
                                            placeholder="No Status"
                                            options={statusOptions}
                                            onSelect={status => this.setState({status})}
                                        />
                                    </td>
                                    <td>                                   
                                        <Input
                                            className={styles.input}
                                            label="Transfer Pharmacy NPI"
                                            value={pharmNPI}
                                            onChange={pharmNPIChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Location"
                                            placeholder="--/--/----"
                                            value={location}
                                            onChange={locationChange}
                                        />
                                    </td>
                                   <td>
                                        <Input
                                            label="Transfer Pharmacy Date"
                                            placeholder="--/--/----"
                                            value={pharmDate}
                                            onChange={pharmDateChange}
                                        />
                                    </td>
                                </tr>                                        
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input
                                            label="Written Date"
                                            placeholder="--/--/----"
                                            value={writtenDate}
                                            onChange={writtenDateChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Sales Code"
                                            value={salesCode}
                                            onChange={salesCodeChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Bill on Date"
                                            placeholder="--/--/----"
                                            value={billOnDate}
                                            onChange={billOnDateChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Cost"
                                            value={cost}
                                            onChange={costChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="RX Number"
                                            value={rxNumber}
                                            onChange={rxNumberChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Primary Insurance Pay"
                                            value={primInsPay}
                                            onChange={primInsPayChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Diagnosis"
                                            value={diagnosis}
                                            onChange={diagnosisChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Secondary Insurance Pay"
                                            value={secInsPay}
                                            onChange={secInsPayChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Secondary Diagnosis"
                                            value={secDiagnosis}
                                            onChange={secDiagnosisChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Patient Pay"
                                            value={patientPay}
                                            onChange={patientPayChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="# of Refills"
                                            value={refills}
                                            onChange={refillsChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="# of Refills Remaining"
                                            value={refillsRemaining}
                                            onChange={refillsRemainingChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Quantity"
                                            value={quantity}
                                            onChange={quantityChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Days Supply"
                                            value={daysSupply}
                                            onChange={daysSupplyChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Directions"
                                            value={directions}
                                            onChange={directionsChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h4>Copay Assistance</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Selector
                                             wide
                                            //  label="Status"
                                             options={copayApprovalOptions}
                                             placeholder="No Status"
                                             onSelect={copayApproval => this.setState({copayApproval})}
                                        />
                                    </td>
                                    <td>
                                        <Selector
                                            wide
                                            label="Copay Network"
                                            placeholder="No Network"
                                            options={copayNetworkOptions}
                                            onSelect={copayNetwork => this.setState({copayNetwork})}
                                        />  
                                                                                  
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <h4>Shipping</h4>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <Button
                                            title="CREATE SHIPPING" 
                                            className="" 
                                            type="" 
                                            value=""                                     
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                    <label>Home Infusion</label>
                                    <input type="checkbox" onChange={status => this.setState({homeInfusion})} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Phone"
                                            value={phone}
                                            onChange={phoneChange}
                                        />   
                                    </td>
                                    <td>
                                        <Input
                                            label="Email"
                                            value={email}
                                            onChange={emailChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    
                    </Form>
                </Body>
            </div>
        );
    }
}



const mapStateToProps = ({auth}) => {
    const {
      patient,
      medication,
      pharmNPI,
      location,
      pharmDate,
      writtenDate,
      salesCode,
      billOnDate,
      cost,
      rxNumber,
      primInsPay,
      diagnosis,
      secInsPay,
      secDiagnosis,
      patientPay,
      refills,
      refillsRemaining,
      quantity,
      daysSupply,
      directions,
      phone,
      email,
      loading
    } = auth
  
    return {
      patient,
      medication,
      pharmNPI,
      location,
      pharmDate,
      writtenDate,
      salesCode,
      billOnDate,
      cost,
      rxNumber,
      primInsPay,
      diagnosis,
      secInsPay,
      secDiagnosis,
      patientPay,
      refills,
      refillsRemaining,
      quantity,
      daysSupply,
      directions,
      phone,
      email,
      loading
    }
  }

const actions = {
    patientChange,
    medicationChange,
    pharmNPIChange,
    locationChange,
    pharmDateChange,
    writtenDateChange,
    salesCodeChange,
    billOnDateChange,
    costChange,
    rxNumberChange,
    primInsPayChange,
    diagnosisChange,
    secInsPayChange,
    secDiagnosisChange,
    patientPayChange,
    refillsChange,
    refillsRemainingChange,
    quantityChange,
    daysSupplyChange,
    directionsChange,
    phoneChange,
    emailChange
}


export default connect(mapStateToProps, actions)(AddScript)