import React, { Component } from 'react';
import axios from 'axios'

import { Table } from '../../../../common'

class UsersTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/user/search?role=Physician', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    users: resp.data.response
                })
            })

        axios.get('/api/physicians/search?group=' + this.props.pID.match.params.group, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    physicians: resp.data.response
                }, this.filterUsers)
            })
    }

    filterUsers() {
        const { physicians } = this.state
        const groupIDs = []
        for (var i = 0; i < physicians.length; i++) {
            groupIDs.push(physicians[i].id)
        }

        this.setState({
            groupIDs: groupIDs
        })
    }

    renderTableHead() {
        return (
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>USERNAME</th>
                    <th>EMAIL ADDRESS</th>
                </tr>
            </thead>
        )
    }

    renderTableBody() {

        return (
            <tbody>
                {this.state.users.map(this.renderTableRow.bind(this))}
            </tbody>
        )
    }

    handleClick(value) {
        window.location = `/team/${value}/edit`
    }

    renderTableRow(user) {
        if (this.state.groupIDs) {

            const userPhysicians = user.physicians;
            const { groupIDs } = this.state
            const userIDs = [];
            console.log(userPhysicians)
            for (var i = 0; i < userPhysicians.length; i++) {
                let userPhys = userPhysicians[i]
                userIDs.push(userPhys.id)
            }

            const found = groupIDs.every(id => userIDs.includes(id))

            if (found) {
                return (
                    <tr value={user.id} key={user.id} onClick={() => this.handleClick(user.id)}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email} </td>
                    </tr>
                )
            } else {
                return (
                    <div></div>
                )
            }
        } else {
            return (<div></div>)
        }
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

        if (this.state.users) {
            var userList = this.state.users.map(function (item, i) {
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
                {userList}
            </div>
        )
    }
}


export default UsersTab;
