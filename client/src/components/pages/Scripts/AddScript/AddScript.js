import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
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

import { Selector, Button, Header, Icon, Input, Body, Table, Form, } from '../../../common'
import styles from './AddScript.css';


class AddScript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pouch: false,
            priorAuth: '',
            homeCare: false,
            processedOn: moment().format("YYYY-MM-DD"),
            status: 'Received',
            physicianId: '',
            value: '',
            writtenDate: '',
            billOnDate: '',
            shipOn: '',
            ETA: '',
            copayApproval: '',
            copayNetwork: '',
            diagnosis: '',
            secDiagnosis: '',
            doNotRefill: false,
            setPhysician: 'inactive',
            setProduct: 'inactive',
            physSearch: false,
            prodSearch: false,
            productList: []
        }

        const field = {
            setProduct: 'inactive',
            id: '', name: '', NDC: '', packageSize: '', quantity: '', lot: '', expiration: '', cost: '', oldQuantity: '', oldCost: '', orderId: this.state.orderId
        }
        this.state.productList.push(field);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleDoNotRefill = this.handleDoNotRefill.bind(this)
    }


    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");

        axios.get('/api/current/search', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    currentPatientID: resp.data.response[0].patientId
                })

                axios.get('/api/patients/search?patientId=' + this.state.currentPatientID, { headers: { "Authorization": "Bearer " + loginToken } })
                    .then((resp) => {
                        const patient = resp.data.response[0]
                        this.setState({
                            patientId: patient.id,
                            patientName: patient.firstName + " " + patient.lastName,
                            patientDob: patient.dob,
                            patientPhone: patient.phone,
                            patientAddressStreet: patient.addressStreet,
                            patientAddressCity: patient.addressCity,
                            patientAddressState: patient.addressState,
                            patientZipCode: patient.addressZipCode
                        })
                    }).catch((error) => {
                        console.error(error);
                    })
            }).catch((error) => {
                console.error(error);
            })

        axios.get('/api/physicians/search', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    physicians: resp.data.response
                })
            }).catch((err) => {
                console.error(err)
            })


        axios.get('/api/products/search', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    products: resp.data.response
                })

            }).catch((error) => {
                console.error(error);
            })
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });

    };


    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDoNotRefill(e) {
        e.preventDefault();
        if (e.target.value === "true") {
            this.setState({
                doNotRefill: true
            })
        }
        else if (e.target.value === "false") {
            this.setState({
                doNotRefill: false
            })
        }
    }

    searchPhysicians() {
        this.setState({
            physSearch: true
        })
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/physicians/search?name=' + this.state.physicianName, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    physicians: resp.data.response
                })
            }).catch((err) => {
                console.error(err)
            })
    }

    searchProducts(i) {
        this.setState({
            prodSearch: true,
            i: i
        })
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/products/search?search=' + this.state.productSearch, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    products: resp.data.response
                })
            }).catch((err) => {
                console.error(err)
            })
    }

    submitscript = (event) => {
        event.preventDefault();
        this.state.productList.splice(-1, 1);
        const loginToken = window.localStorage.getItem("token");

        for (var i = 0; i < this.state.productList.length; i++) {
            let iVal = i;
            let data = new FormData();

            axios.post('/api/scripts/add?patientId=' + this.state.patientId + '&physicianId=' + this.state.physicianId + '&productId=' + this.state.productList[i].id + '&processedOn=' + this.state.processedOn + '&pouch=' + this.state.pouch + "&status=" + this.state.status + "&pharmNPI=" + this.props.pharmNPI
                + "&priorAuth=" + this.state.priorAuth + "&location=" + this.props.location + "&pharmDate=" + this.props.pharmDate + "&writtenDate=" + this.props.writtenDate + "&salesCode=" + this.props.salesCode +
                "&billOnDate=" + this.props.billOnDate + "&cost=" + this.state.cost + "&rxNumber=" + this.props.rxNumber + "&primInsPay=" + this.props.primInsPay + "&diagnosis=" + this.state.diagnosis +
                "&secInsPay=" + this.props.secInsPay + "&secDiagnosis=" + this.state.secDiagnosis + "&patientPay=" + this.props.patientPay + "&refills=" + this.props.refills +
                "&refillsRemaining=" + this.props.refillsRemaining + "&quantity=" + this.state.quantity + "&daysSupply=" + this.props.daysSupply + "&directions=" + this.props.directions +
                "&copayApproval=" + this.state.copayApproval + "&copayNetwork=" + this.state.copayNetwork + "&homeCare=" + this.state.homeCare + '&hcHome=' + this.state.hcHome + '&hcPhone=' + this.state.hcPhone + '&doNotRefill=' + this.state.doNotRefill,
                data, { headers: { "Authorization": "Bearer " + loginToken } })
                .then((res) => {
                    console.log(res)
                    if (res.status === 200 && iVal === this.state.productList.length - 1) {
                        window.location = `/patients/${this.state.patientId}`
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

    renderPhysician() {
        if (this.state.setPhysician === 'inactive') {
            return (
                <Table className="addScriptTable">
                    <thead>
                        <th>PHYSICIAN NAME</th>
                        <th>GROUP</th>
                        <th>SPECIALIZATION</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                    </thead>
                    <tr>
                        <td style={{ borderRight: 'none' }} className="add" onClick={() => this.setState({ setPhysician: 'search' })}>
                            + Click here to add a physician
                            </td>
                    </tr>
                </Table>
            )
        } else if (this.state.setPhysician === 'search') {
            return (
                <div>
                    <Input
                        style={{ marginLeft: 35 }}
                        placeholder="Type name of physician.."
                        value={this.state.physicianName}
                        onChange={physicianName => this.setState({ physicianName }, this.searchPhysicians)}
                    />
                    {this.state.physSearch ?
                        <div>


                            {this.renderPhysicianColumn()}
                        </div>
                        :
                        <div></div>}
                </div>
            )
        } else if (this.state.setPhysician === 'set') {
            return (
                <Table className="addScriptTable">
                    <thead>
                        <th>PHYSICIAN NAME</th>
                        <th>GROUP</th>
                        <th>SPECIALIZATION</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                    </thead>
                    <tr>
                        <td>{this.state.physicianName}</td>
                        <td>{this.state.physicianGroup}</td>
                        <td>{this.state.physicianSpec}</td>
                        <td>{this.state.physicianPhone}</td>
                        <td>
                            {this.state.physicianAddressStreet}<br />
                            {this.state.physicianAddressCity}, {this.state.physicianAddressState}, {this.state.physicianAddressZipCode}
                        </td>
                    </tr>
                </Table>
            )
        }
    }

    renderProducts() {
        return (
            <Table className="addScriptTable">
                <thead>
                    <th>Name</th>
                    <th>NDC</th>
                    <th>PACKAGE SIZE</th>
                    <th>QUANTITY</th>
                    <th>COST</th>
                </thead>
                {this.state.productList.map(this.renderProduct.bind(this))}
            </Table>
        )
    }

    setProductState(i) {
        this.state.productList[i].setProduct = 'search';
        this.setState({
            render: !this.state.render
        })
    }

    renderProduct(product) {
        const i = this.state.productList.indexOf(product);
        if (product.setProduct === 'inactive') {
            return (
                <tr>
                    <td style={{ borderRight: 'none' }} className="add" onClick={() => this.setProductState(i)}>
                        + Click here to add a medication
                        </td>
                </tr>
            )
        } else if (product.setProduct === 'search') {
            return (
                <div>
                    <Input
                        style={{ marginLeft: 35 }}
                        placeholder="Type name or NDC of medication.."
                        value={this.state.productSearch}
                        onChange={productSearch => this.setState({ productSearch }, this.searchProducts(i))}
                    />
                    {this.state.prodSearch ?
                        <div>
                            {this.renderProductColumn()}
                        </div>
                        :
                        <div></div>}
                </div>
            )
        } else if (product.setProduct === 'set') {
            return (
                <tr>
                    <td>{product.name} <Icon className="minus" name="minus" onClick={() => this.removeProductList(i)} /></td>
                    <td>{product.NDC}</td>
                    <td>{product.packageSize}</td>
                    <td>{product.quantity}</td>
                    <td>{product.cost}</td>
                </tr>
            )
        }
    }

    renderPhysicianColumn() {
        return (
            <div style={{ marginLeft: 35 }}>
                <Table className="addScriptSearch">
                    <thead>
                        <th>PHYSICIAN NAME</th>
                        <th>GROUP</th>
                        <th>SPECIALIZATION</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                    </thead>
                    {this.state.physicians.map(this.renderPhysicianRow.bind(this))}
                </Table>
            </div>
        )
    }

    renderProductColumn() {
        return (
            <div style={{ marginLeft: 35 }}>
                <Table className="addScriptSearch">
                    <thead>
                        <th>Name</th>
                        <th>NDC</th>
                        <th>PACKAGE SIZE</th>
                        <th>QUANTITY</th>
                        <th>COST</th>
                    </thead>
                    {this.state.products.map(this.renderProductRow.bind(this))}
                </Table>
            </div>
        )
    }


    renderPhysicianRow(physician) {
        return (
            <tr style={{ 'cursor': 'pointer' }} value={physician.id} onClick={() => this.setPhysician(physician.id)}>
                <td>{physician.firstName} {physician.lastName}</td>
                <td>{physician.group}</td>
                <td>{physician.specialization}</td>
                <td>{physician.phone}</td>
                <td>{physician.addressStreet}<br />
                    {physician.addressCity}, {physician.addressState}, {physician.addressZipCode}</td>
            </tr>
        )
    }

    renderProductRow(product) {
        return (
            <tr style={{ 'cursor': 'pointer', marginBottom: 2 }} value={product.id} onClick={() => this.setProduct(product.id)}>
                <td>{product.name}</td>
                <td>{product.NDC}</td>
                <td>{product.packageSize}</td>
                <td>{product.quantity}</td>
                <td>{product.cost}</td>
            </tr>
        )
    }

    renderRefillButton() {
        if (this.state.doNotRefill) {
            return (
                <Button
                    title="ALLOW REFILL"
                    value="false"
                    onClick={this.handleDoNotRefill}
                />
            )
        } else {
            return (
                <Button
                    title="DO NOT REFILL"
                    style={{ backgroundColor: 'red' }}
                    value="true"
                    onClick={this.handleDoNotRefill}
                />
            )
        }
    }

    setPhysician(value) {
        this.setState({
            physSearch: false,
            physicianId: value,
            setPhysician: 'set'
        }, this.getPhysician)
    }

    setProduct(value) {
        this.setState({
            prodSearch: false,
            productId: value,
            setProduct: 'set'
        }, this.getProduct(value))
    }

    removeProductList(i) {
        this.state.productList.splice(i, 1);
        this.setState({
            render: !this.state.render
        })
    }

    getPhysician() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/physicians/search?physicianId=' + this.state.physicianId,
            { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                let physician = resp.data.response[0];
                this.setState({
                    physicianName: physician.firstName + " " + physician.lastName,
                    physicianGroup: physician.group,
                    physicianSpec: physician.specialization,
                    physicianPhone: physician.phone,
                    physicianAddressStreet: physician.addressStreet,
                    physicianAddressCity: physician.addressCity,
                    physicianAddressState: physician.addressStreet,
                    physicianAddressZipCode: physician.addressZipCode
                })
            }).catch((error) => {
                console.error(error);
            })
    }

    getProduct(value) {
        const i = this.state.i;
        const field = {
            setProduct: 'inactive',
            id: '', name: '', NDC: '', packageSize: '', quantity: '', lot: '', expiration: '', cost: '', oldQuantity: '', oldCost: '', orderId: this.state.orderId
        }
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/products/search?productId=' + value,
            { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                let product = resp.data.response[0];
                let currentProduct = this.state.productList[i]
                currentProduct.id = product.id;
                currentProduct.name = product.name;
                currentProduct.NDC = product.NDC;
                currentProduct.packageSize = product.packageSize
                currentProduct.quantity = product.quantity
                currentProduct.cost = product.cost
                this.state.productList[i].setProduct = 'set';
                this.state.productList.push(field);

                this.setState({
                    productName: product.name,
                    productNDC: product.NDC,
                    productPackageSize: product.packageSize,
                    productQuantity: product.quantity,
                    productCost: product.cost,
                    productPackageSize: product.packageSize,
                    productSearch: ''
                }, this.calcTabletCost)
            }).catch((error) => {
                console.error(error);
            })
    }

    calcTabletCost() {
        this.setState({
            tabletCost: this.state.productCost.replace(",", "") / this.state.productPackageSize.replace(",", ""),
            quantity: this.state.productPackageSize
        }, this.updateCost)
    }

    updateCost() {
        this.setState({
            cost: this.state.tabletCost * this.state.quantity.replace(",", "")
        }, this.roundtoNearestCent)
    }

    roundtoNearestCent() {
        this.setState({
            cost: Math.floor(this.state.cost * 100) / 100
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
        console.log(this.state.productList)

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
            'Refill',
            'Renew'
        ]


        const {
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
            secInsPay,
            secInsPayChange,
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



        const priorAuthOptions = [
            'Approved',
            'Denied',
            'Payor Restriction',
            'Limited Distribution'
        ]

        const copayApprovalOptions = [
            '-',
            'Approved',
            'Denied'
        ]

        const copayNetworkOptions = [
            '-',
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
                                        placeholder="2018/11/12"
                                        selected={this.state.processedOn}
                                        value={this.state.processedOn}
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
                            <tr>
                                <td style={{ padding: '10px 0' }}>
                                    <Selector
                                        options={statusOptions}
                                        value={this.state.status}
                                        onSelect={status => this.setState({ status })}
                                    />
                                </td>
                                <td>
                                    {this.renderRefillButton()}
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
                                <td>{this.state.patientAddressStreet},<br />
                                    {this.state.patientAddressCity}, {this.state.patientAddressState}, {this.state.patientAddressZipCode}</td>
                            </tr>
                        </Table>

                        <h4 style={{ marginbottom: 0, marginLeft: 35 }}>Medication</h4>
                        {/* {this.renderProduct()} */}
                        {this.renderProducts()}


                        <h4 style={{ marginbottom: 0, marginLeft: 35 }}>Physician</h4>
                        {this.renderPhysician()}

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
                                            tabIndex="1"
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Sales Code"
                                            value={salesCode}
                                            onChange={salesCodeChange}
                                            tabIndex="11"
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
                                            tabIndex="2"
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Cost"
                                            placeholder={this.state.cost}
                                            value={this.state.cost}
                                            onChange={cost => this.setState({ cost })}
                                            tabIndex="12"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="RX Number"
                                            value={rxNumber}
                                            onChange={rxNumberChange}
                                            tabIndex="3"
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Primary Insurance Pay"
                                            value={primInsPay}
                                            onChange={primInsPayChange}
                                            tabIndex="13"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Diagnosis"
                                            value={this.state.diagnosis}
                                            onChange={diagnosis => this.setState({ diagnosis })}
                                            tabIndex="4"
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Secondary Insurance Pay"
                                            value={secInsPay}
                                            onChange={secInsPayChange}
                                            tabIndex="14"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Secondary Diagnosis"
                                            value={this.state.secDiagnosis}
                                            onChange={secDiagnosis => this.setState({ secDiagnosis })}
                                            tabIndex="5"
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            label="Patient Pay"
                                            value={patientPay}
                                            onChange={patientPayChange}
                                            tabIndex="15"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="# of Refills"
                                            value={refills}
                                            onChange={refillsChange}
                                            tabIndex="6"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="# of Refills Remaining"
                                            value={refillsRemaining}
                                            onChange={refillsRemainingChange}
                                            tabIndex="7"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Quantity"
                                            placeholder={this.state.quantity}
                                            value={this.state.quantity}
                                            onChange={quantity => this.setState({ quantity }, this.updateCost)}
                                            tabIndex="8"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Days Supply"
                                            value={daysSupply}
                                            onChange={daysSupplyChange}
                                            tabIndex="9"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            label="Directions"
                                            value={directions}
                                            onChange={directionsChange}
                                            tabIndex="10"
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
                                            options={copayApprovalOptions}
                                            placeholder="No Status"
                                            onSelect={copayApproval => this.setState({ copayApproval })}
                                        />
                                    </td>
                                    {this.state.copayApproval === "Approved" ?
                                        <td>
                                            <Selector
                                                wide
                                                label="Copay Network"
                                                placeholder="No Network"
                                                options={copayNetworkOptions}
                                                onSelect={copayNetwork => this.setState({ copayNetwork })}
                                            />

                                        </td>
                                        : <td></td>}
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