import React, { Component } from 'react';
import { Body, Button, Form, Header, Icon, Input, Table } from '../../../common';

import axios from 'axios'
import moment from 'moment'
import jwt_decode from 'jwt-decode'

import styles from './OrderProduct.css'


class OrderProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDate: moment().format("YYYY-MM-DD"), invoiceNum: '', vendor: '', memo: '', setProduct: 'inactive', render: false, products: [], productList: [], productMed: [], orderId: Math.floor(Math.random() * 9000000) + 1000000
        }

        const field = {
            setProduct: 'inactive',
            id: '', name: '', NDC: '', packageSize: '', quantity: '', lot: '', expiration: '', cost: '', oldQuantity: '', oldCost: '', orderId: this.state.orderId
        }
        this.state.productList.push(field);
        this.removeProductList = this.removeProductList.bind(this);

    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        var decoded = jwt_decode(token);
        this.setState({
            username: decoded.username
        })
    }


    async submitProductOrder() {
        this.state.productList.splice(-1, 1);
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        const confirmText = [];

        for (var i = 0; i < this.state.productList.length; i++) {
            let product = this.state.productList[i];

            let num = product.quantity / product.packageSize;
            let newCost = (product.cost / num).toFixed(2)

            confirmText.push(`${product.name}
                Quantity: ${product.oldQuantity} -> ${+product.oldQuantity + +product.quantity}\n
                Cost: $${product.oldCost} -> $${newCost} per ${product.packageSize}(package size)`)
        }

        if (window.confirm(
            `This will update the on hand quantity and/or cost of the following medications:\n${confirmText}`
        )) {
            for (var i = 0; i < this.state.productList.length; i++) {
                console.log(this.state.productList.length)
                console.log(i)


                let product = this.state.productList[i]
                let newQuantity = +product.oldQuantity + +product.quantity
                let num = product.quantity / product.packageSize;
                let newCost = (product.cost / num).toFixed(2)

                axios.put('/api/products/update?id=' + product.id + '&quantity=' + newQuantity + '&name=' + product.name + '&cost=' + newCost,
                    data, { headers: { "Authorization": "Bearer " + loginToken } })
                    .then((data) => {
                    }).catch((error) => {
                        console.error(error);
                    })

                try {
                    const response = await axios.post('/api/products/orders/add?productId=' + product.id + '&orderDate=' + this.state.orderDate + '&orderId=' + this.state.orderId + '&invoiceNum=' + this.state.invoiceNum +
                        '&vendor=' + this.state.vendor + '&memo=' + this.state.memo + '&qtyChange=' + product.quantity + '&lot=' + product.lot + '&expiration=' + product.expiration + '&writtenBy=' + this.state.username,
                        data, { headers: { "Authorization": "Bearer " + loginToken } });
                    console.log(response)
                } catch (e) {
                    console.log(e);
                }
            }

            if (i === this.state.productList.length - 1) {
                window.alert(`${this.state.productList.length} product orders have been uploaded for Order Id #${this.state.orderId}`);
            }

            window.location.reload();
        } else {
            let field = {
                setProduct: 'inactive',
                id: '', name: '', NDC: '', packageSize: '', quantity: '', lot: '', expiration: '', cost: '', oldQuantity: '', oldCost: '', orderId: this.state.orderId
            }
            this.state.productList.push(field);
            return;
        }
    }


    searchProducts(i) {
        this.setState({
            prodSearch: true,
            i: i
        })
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/products/search?search=' + this.state.productName, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    products: resp.data.response
                })
            }).catch((err) => {
                console.error(err)
            })
    }

    renderProducts() {
        return (
            <Table className="addScriptTable">
                <thead>
                    <th>Name</th>
                    <th>NDC</th>
                    <th>PACKAGE SIZE</th>
                    <th>QUANTITY</th>
                    <th>LOT #</th>
                    <th>EXPIRATION</th>
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

    updateQuantity(quantity, i) {
        this.state.productList[i].quantity = quantity;
        this.setState({
            render: !this.state.render
        })
    }

    updateLot(lot, i) {
        this.state.productList[i].lot = lot;
        this.setState({
            render: !this.state.render
        })
    }

    updateExpiration(expiration, i) {
        this.state.productList[i].expiration = expiration;
        this.setState({
            render: !this.state.render
        })
    }

    updateCost(cost, i) {
        this.state.productList[i].cost = cost;
        this.setState({
            render: !this.state.render
        })
    }

    removeProductList(i) {
        this.state.productList.splice(i, 1);
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
                        value={this.state.productName}
                        onChange={productName => this.setState({ productName }, this.searchProducts(i))}
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
                    <td>
                        <Input
                            className="orderField"
                            value={this.state.productList[i].quantity}
                            onChange={quantity => this.updateQuantity(quantity, i)}
                        />
                    </td>
                    <td>
                        <Input
                            className="orderField"
                            value={this.state.productList[i].lot}
                            onChange={lot => this.updateLot(lot, i)}
                        />
                    </td>
                    <td>
                        <Input
                            type="date"
                            className="orderField"
                            value={this.state.productList[i].expiration}
                            onChange={expiration => this.updateExpiration(expiration, i)}
                        />
                    </td>
                    <td>
                        <Input
                            className="orderField"
                            value={this.state.productList[i].cost}
                            onChange={cost => this.updateCost(cost, i)}
                        />
                    </td>
                </tr>
            )
        }
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

    setProduct(value) {
        this.setState({
            prodSearch: false,
            productId: value,
            setProduct: 'set'
        }, this.getProduct(value))
    }

    getProduct(value) {
        const i = this.state.i;
        const field = {
            setProduct: 'inactive', id: '',
            name: '', NDC: '', packageSize: '', quantity: '', cost: '', orderId: this.state.orderId
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
                currentProduct.oldQuantity = product.quantity
                currentProduct.oldCost = product.cost
                this.state.productList[i].setProduct = 'set';
                this.state.productList.push(field);

                this.setState({
                    render: !this.state.render
                })
            }).catch((error) => {
                console.error(error);
            })
    }


    render() {

        return (
            <div className={styles.body} id="addScript">
                <Header>
                    <h2>Order</h2>
                    <div className='action'>
                        <Button
                            large
                            cancel
                            link="/products"
                            title="CANCEL"
                            style={{ marginRight: 10 }}
                        />
                        <Button
                            onClick={this.submitProductOrder.bind(this)}
                            title="SAVE"
                            className="submit btn btn-default"
                            type="submit"
                            value="Submit"
                            style={{ marginRight: 8 }}
                        />
                    </div>
                </Header>
                <Body className={styles.body}>
                    <Form
                        className="form"
                        onSubmit={this.submitProductOrder.bind(this)}
                    >
                        <Input
                            type="date"
                            label="Order Date"
                            value={this.state.orderDate}
                            onChange={orderDate => this.setState({ orderDate })}
                        />

                        <Input
                            label="Invoice #"
                            value={this.state.invoiceNum}
                            onChange={invoiceNum => this.setState({ invoiceNum })}
                        />

                        <Input
                            label="Vendor"
                            value={this.state.vendor}
                            onChange={vendor => this.setState({ vendor })}
                        />

                        <Input
                            label="Memo"
                            value={this.state.memo}
                            onChange={memo => this.setState({ memo })}
                        />

                        <h4 style={{ marginbottom: 0, marginLeft: 35 }}>Medication</h4>
                        {this.renderProducts()}

                    </Form>
                </Body>
            </div >
        )
    }
}

export default OrderProduct;