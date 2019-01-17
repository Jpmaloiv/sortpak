import React, { Component } from 'react';
import { Header, Span, Table } from '../../../common';

import axios from 'axios';
import Moment from 'react-moment'

import styles from '../AddProduct/AddProduct'

class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventory: []
        }
    }

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        const inventory = [];

        axios.get('/api/scripts/search?productId=' + this.props.match.params.productId + '&status=Shipped,Done', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                let array = resp.data.response;
                array.forEach(function (element) { element.type = "Script"; });
                for (var i = 0; i < array.length; i++) {
                    inventory.push(array[i])
                }
            }).catch((err) => {
                console.error(err)
            })

        axios.get('/api/products/orders/search?productId=' + this.props.match.params.productId, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp)
                let array = resp.data.response;
                array.forEach(function (element) { element.type = "Order"; });
                for (var i = 0; i < resp.data.response.length; i++) {
                    inventory.push(resp.data.response[i])
                }
                this.setState({
                    inventory: inventory
                })
            }).catch((err) => {
                console.error(err)
            })

        axios.get('/api/products/adjustments/search?productId=' + this.props.match.params.productId, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp)
                let array = resp.data.response;
                array.forEach(function (element) { element.type = "Adjust"; });
                for (var i = 0; i < resp.data.response.length; i++) {
                    inventory.push(resp.data.response[i])
                }
                this.setState({
                    inventory: inventory
                })
            }).catch((err) => {
                console.error(err)
            })

    }

    renderTableHead() {
        return (
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Qty Change</th>
                    <th>Memo</th>
                    <th>Lot #</th>
                    <th>Expires</th>
                    <th>By</th>
                </tr>
            </thead>
        )
    }

    renderTableBody() {
        return (
            <tbody>
                {this.state.inventory.map(this.renderTableRow.bind(this))}
            </tbody>
        )
    }

    handleClick(value, type) {
        if (type === 'Script') {
            window.location = `/scripts/${value}`
        } else if (type === 'Order') {
            window.location = `/products/orders/${value}`
        } else if (type === 'Adjust') {
            window.location = `/products/adjustments/${value}`
        }
    }

    renderTableRow(inv) {
        console.log(inv.expiration)
        return (
            <tr value={inv.id} type={inv.type} onClick={(e) => this.handleClick(inv.id, inv.type)}>
                <td><Moment format='MM/DD/YYYY'>{inv.processedOn || inv.orderDate}</Moment></td>
                <td>{inv.type}</td>
                <td>{inv.type === 'Script' ?
                    '-' + inv.quantity : inv.qtyChange
                }</td>
                <td>{inv.memo}</td>
                <td>{inv.lot}</td>
                <td>
                    <Span icon="calendar">
                        {inv.expiration ?
                            <Moment format="MM/DD/YYYY">{inv.expiration}</Moment>
                            :
                            <span></span>
                        }
                    </Span>
                </td>
                <td>{inv.writtenBy}</td>
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
        if (this.state.inventory) {
            console.log(this.state.inventory)
            var inventoryList = this.state.inventory.map(function (item, i) {
                return (
                    <div key={i}>
                    </div>
                )
            })
            console.log(inventoryList)
        }
        else {
            return <div>
                <p></p>
            </div>
        }

        return (
            <div className={styles.app}>
                <Header>
                    <h2>Inventory</h2>
                </Header>
                <div className="body">
                    {this.renderTable()}
                    {inventoryList}
                </div>
            </div >
        )
    }
}

export default Inventory;