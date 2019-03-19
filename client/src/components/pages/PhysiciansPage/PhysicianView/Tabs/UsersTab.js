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
        console.log(this)
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/user/search?role=Physician', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    users: resp.data.response
                }, this.filterUsers)
            })
    }

    filterUsers() {
        const physicianId = this.props.pID.match.params.physicianId
        const users = [];
        for (var i = 0; i < this.state.users.length; i++) {
            let userPhysicians = this.state.users[i].physicians
            var result = userPhysicians.filter(obj => {
                return obj.id == physicianId
            })
            if (result.length > 0) {
                users.push(this.state.users[i])
            }
        }
        console.log(users)
        this.setState({
            users: users
        })

        //   console.log(result, this.state.users)

        //   this.setState({
        //       user: users
        //   })
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
        return (
            <tr value={user.id} key={user.id} onClick={() => this.handleClick(user.id)}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email} </td>
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
