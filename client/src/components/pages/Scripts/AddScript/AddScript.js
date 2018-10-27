import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import Medications from '../Medications.js'

import {
    PhysicianModal,
} from '../../../shared/'

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

import { Selector, Button, Header, Input, Body, Table, Form, } from '../../../common'
import styles from './AddScript.css';
import { runInThisContext } from 'vm';

class AddScript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pouch: false,
            homeCare: false,
            processedOn: '',
            medicationVal: '',
            status: 'Received',
            physicianId: '',
            physicianSet: false
        }

        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    openNoteModal() {
        this.setState({ physicianModal: {} })
    }

    onCloseModal() {
        this.setState({
            physicianModal: null
        })
    }

    onUpdate = (val) => {
        this.onCloseModal();
        this.setState({
            physicianId: val,
            physicianSet: true
        },
            this.getPhysician
        )
    };

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");

        axios.get('/api/current/search', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                this.setState({
                    currentPatientID: resp.data.response[0].patientId 
                })
                console.log(this.state.currentPatientID);

                axios.get('/api/patients/search?patientId=' + this.state.currentPatientID, { headers: { "Authorization": "Bearer " + loginToken } })
                    .then((resp) => {
                        console.log(resp);
                        const patient = resp.data.response[0]
                        this.setState({
                            patientId: patient.id,
                            patientName: patient.firstName + " " + patient.lastName,
                            patientDob: patient.dob,
                            patientPhone: patient.phone,
                            patientAddress: patient.address1 + "\n" + patient.address2  
                        })
                        console.log(this.state.patientName);
                    }).catch((error) => {
                        console.error(error);
                    })
            }).catch((error) => {
                console.error(error);
            })

        console.log(this.state.currentPatientID)
    }


    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getPhysician() {
        console.log(this.state.physicianId);
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        axios.get('/api/physicians/search?physicianId=' + this.state.physicianId,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                let physician = data.data.response[0]
                this.setState({
                    physicianName: "Dr. " + physician.firstName + " " + physician.lastName,
                    physicianGroup: physician.group,
                    physicianPhone: physician.phone,
                    physicianAddressStreet: physician.addressStreet,
                    physicianAddressCity: physician.addressCity,
                    physicianAddressState: physician.addressStreet,
                    physicianAddressZipCode: physician.addressZipCode
                })

                console.log(this.state);


            }).catch((error) => {
                console.error(error);
            })
    }

    submitscript = (event) => {
        event.preventDefault();
        this.state.status === "Received";
        const loginToken = window.localStorage.getItem("token");
        console.log(this.state.physicianId);
        let data = new FormData();
        axios.post('/api/scripts/add?patientId=' + this.state.patientId + '&physicianId=' + this.state.physicianId + '&processedOn=' + this.state.processedOn + '&pouch=' + this.state.pouch + '&patient=' + this.props.patient + "&medication=" + this.props.medication + "&status=" + this.state.status + "&pharmNPI=" + this.props.pharmNPI
            + "&priorAuth=" + this.state.priorAuth + "&location=" + this.props.location + "&pharmDate=" + this.props.pharmDate + "&writtenDate=" + this.props.writtenDate + "&salesCode=" + this.props.salesCode +
            "&billOnDate=" + this.props.billOnDate + "&cost=" + this.props.cost + "&rxNumber=" + this.props.rxNumber + "&primInsPay=" + this.props.primInsPay + "&diagnosis=" + this.state.diagnosis +
            "&secInsPay=" + this.props.secInsPay + "&secDiagnosis=" + this.state.secDiagnosis + "&patientPay=" + this.props.patientPay + "&refills=" + this.props.refills +
            "&refillsRemaining=" + this.props.refillsRemaining + "&quantity=" + this.props.quantity + "&daysSupply=" + this.props.daysSupply + "&directions=" + this.props.directions +
            "&copayApproval=" + this.state.copayApproval + "&copayNetwork=" + this.state.copayNetwork + "&homeCare=" + this.state.homeCare + '&hcHome=' + this.state.hcHome + '&hcPhone=' + this.state.hcPhone,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/scripts");
            }).catch((error) => {
                console.error(error);
            })
    }

    handleCheckbox(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleChangeValue = e => this.setState({ value: e.target.value });


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
            directionsChange
        } = this.props

        const {
            processedOn
        } = this.state

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

        const {
            physicianModal
        } = this.state


        return (
            <div>
                <Header>
                    <h2>Add A New Script</h2>
                    <div className="action">
                        <Button
                            cancel
                            type="button"
                            title="CANCEL"
                            link="/patients"
                            style={{ marginRight: 10 }}
                        />
                        <Button
                            onClick={this.submitscript}
                            title="CREATE SCRIPT"
                            className="submit btn btn-default"
                            type="submit"
                            value="Submit"
                            style={{ marginRight: 8 }}
                        />
                    </div>
                </Header>
                <Body className={styles.body} id="addScript">

                    <Form className={styles.form}>
                        <Table>
                            <tr className="checkboxRow">
                                <td>
                                    <Input
                                        type="date"
                                        label="Process On"
                                        value={processedOn}
                                        onChange={processedOn => this.setState({ processedOn })}
                                    />
                                </td>
                                <td className="check">
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="pouch"
                                            checked={this.state.pouch}
                                            onChange={this.handleCheckbox}
                                        />
                                        <label>POUCH</label>
                                    </div>
                                </td>
                            </tr>
                        </Table>

                        <h4 style={{ marginLeft: 30, marginBottom: 0 }}>Patient</h4>
                        <Table className="addScriptTable">
                            <thead>
                                <th>NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>PHONE NUMBER</th>
                                <th>ADDRESS</th>
                            </thead>
                            <tr>
                                <td>{this.state.patientName}</td>
                                <td>{this.state.patientDob}</td>
                                <td>{this.state.patientPhone}</td>
                                <td>{this.state.patientAddress}</td>
                            </tr>
                        </Table>

                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Medications
                                            placeholder="Medication"
                                            value={medication}
                                            onChange={medicationChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table className="addScriptTable">
                            <thead>
                                <th>PHYSICIAN NAME</th>
                                <th>GROUP</th>
                                <th>PHONE</th>
                                <th>ADDRESS</th>
                            </thead>

                            {this.state.physicianSet ?
                                <tr>
                                <td>{this.state.physicianName}</td>
                                <td>{this.state.physicianGroup}</td>
                                <td>{this.state.physicianPhone}</td>
                                
                                    <td>
                                        {this.state.physicianAddressStreet}<br />
                                        {this.state.physicianAddressCity}, {this.state.physicianAddressState}, {this.state.physicianAddressZipCode}
                                    </td>
                            </tr>
                                :
                                <tr>
                                <td className="add" onClick={() => this.openNoteModal()}>
                                    + Click here to add a physician
                            </td>
                            </tr>
                            }
                        </Table>

                        <Table>
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
                                            options={priorAuthOptions}
                                            onSelect={priorAuth => this.setState({ priorAuth })}
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
                                            value={location}
                                            onChange={locationChange}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            type="date"
                                            label="Transfer Pharmacy Date"
                                            placeholder="--/--/----"
                                            value={pharmDate}
                                            onChange={pharmDateChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table>
                            <tbody>
                                <tr>
                                    <td>
                                        <Input
                                            type="date"
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
                                            type="date"
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
                                            value={this.state.diagnosis}
                                            onChange={diagnosis => this.setState({ diagnosis })}
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
                                            value={this.state.secDiagnosis}
                                            onChange={secDiagnosis => this.setState({ secDiagnosis })}
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
                        </Table>

                        <Table>
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
                                            onSelect={copayApproval => this.setState({ copayApproval })}
                                        />
                                    </td>
                                    <td>
                                        <Selector
                                            wide
                                            label="Copay Network"
                                            placeholder="No Network"
                                            options={copayNetworkOptions}
                                            onSelect={copayNetwork => this.setState({ copayNetwork })}
                                        />

                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table>
                            <tbody>
                                <tr>
                                    <h4>Shipping</h4>
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
                        </Table>

                        <Table>
                            <tbody>
                                <tr>
                                    <td className="check">
                                        <input
                                            type="checkbox"
                                            name="homeCare"
                                            checked={this.state.homeCare}
                                            onChange={this.handleCheckbox}
                                        />
                                        <label>Home Care</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Home"
                                            value={this.state.hcHome}
                                            onChange={hcHome => this.setState({ hcHome })}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Phone"
                                            value={this.state.hcPhone}
                                            onChange={hcPhone => this.setState({ hcPhone })}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <PhysicianModal
                            content={physicianModal}
                            onClickAway={() => this.onCloseModal()}
                            // onSubmit={this.getPhysician}
                            onUpdate={this.onUpdate}
                        />
                    </Form>
                </Body>
            </div >
        );
    }
}



const mapStateToProps = ({ auth }) => {
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