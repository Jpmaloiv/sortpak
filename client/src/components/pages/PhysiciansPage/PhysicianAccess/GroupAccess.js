import React, { Component } from 'react';
import axios from 'axios'

import { Icon, Table, Header, Input, ActionBox, Button } from '../../../common'

import styles from '../PhysicianView/PhysicianView.css'

class GroupAccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            physicianUsers: [],
            render: false
        }
        this.giveAccess = this.giveAccess.bind(this);
    }

    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/user/search?role=Physician', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    users: resp.data.response
                })
            }).catch((error) => {
                console.error(error);
            })

        axios.get('/api/physicians/search?group=' + this.props.match.params.group, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.setState({
                    physicians: resp.data.response
                }, this.groupPhysicians)
            }).catch((error) => {
                console.error(error);
            })
    }

    groupPhysicians() {
        let physicianIds = []
        for (var i = 0; i < this.state.physicians.length; i++) {
            physicianIds.push(this.state.physicians[i].id)
        }
        this.setState({
            physicianIds: physicianIds
        })
    }

    searchQuery() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('api/users/search?role=Physician' + '&name=' + this.state.searchName, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp.data.response);
                this.setState({
                    users: resp.data.response,
                })
            }).catch((error) => {
                console.error(error);
            })
    }

    removeAccess(value) {
        const loginToken = window.localStorage.getItem("token");
        for (var i = 0; i < this.state.physicianIds.length; i++) {
        let data = new FormData();
        axios.delete('/api/user/userPhysicians/delete?userId=' + value + '&physicianId=' + this.state.physicianIds[i],
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.reRender();
            }).catch((error) => {
                console.error(error);
            })
        }
    }

    removalConfirm(value) {
        if (window.confirm('Remove access from this user?')) {
            this.removeAccess(value);
        } else {
            return;
        }
    }

    giveAccess(value) {
        const loginToken = window.localStorage.getItem("token");
        for (var i = 0; i < this.state.physicianIds.length; i++) {
            let data = new FormData();
            axios.post('/api/user/userPhysicians?userId=' + value + '&physicianId=' + this.state.physicianIds[i],
                data, { headers: { "Authorization": "Bearer " + loginToken } })
                .then((resp) => {
                    console.log(resp)
                    this.reRender();
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

    accessConfirm(value) {
        if (window.confirm('Give access to this user?')) {
            this.giveAccess(value);
        } else {
            return;
        }
    }

    reRender() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/user/search?role=Physician', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp)
                this.setState({
                    users: resp.data.response
                })
            }).catch((error) => {
                console.error(error);
            })
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            this.searchQuery();
        }
    }

    renderTableHead() {
        return (
            <thead>
                <tr>
                    <th>Username</th>
                    <th></th>
                    <th> Give Access</th>
                </tr>
            </thead>
        )
    }

    renderTableBody() {
        if (this.state.physicianIds) {
            return (
                <tbody>
                    {this.state.users.map(this.renderTableRow.bind(this))}
                </tbody>
            )
        }
    }




    renderTableRow(user) {
        const userPhysicians = user.physicians;
        const { physicianIds } = this.state
        const userIds = [];
        console.log(userPhysicians)
        for (var i = 0; i < userPhysicians.length; i++) {
            let userPhys = userPhysicians[i]
            userIds.push(userPhys.id)
        }
        
        const found = physicianIds.every(id => userIds.includes(id))

        return (
            <tr key={user.id} value={user.id}>

                <td>
                    {user.username}
                </td>

                <td style={{ 'width': '60%' }}>

                </td>

                <td>

                    {found ?

                        <div>
                            Access Granted <Icon className="minus" name="minus" onClick={() => this.removalConfirm(user.id)} />
                        </div>
                        :

                        <Button
                            className="access"
                            search
                            icon="lock"
                            title="GIVE ACCESS"
                            style={{ marginLeft: 8 }}
                            onClick={() => this.accessConfirm(user.id)}
                        />
                    }
                </td>

            </tr>
        )
    }

    renderTable() {
        return (
            <Table className={styles.table}>
                {this.renderTableHead()}
                {this.renderTableBody()}
            </Table>
        )
    }

    render() {
        console.log(this.state.users)

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
            <div className={styles.app}>

                <Header className={styles.header}>

                    <h2 style={{ marginBottom: 25 }}>
                        Group Access
                        <span className="group">
                            {this.props.match.params.group || 'No Group Available'}
                        </span>
                    </h2>
                    <div className="action">
                        <Button
                            cancel
                            title="CANCEL"
                            link={`/physicians/${this.props.match.params.physicianId}`}
                        />


                    </div>
                </Header>

                <div className="body">
                    <p style={{ marginBottom: -15, marginLeft: 40 }}>Give a user access to this group</p>

                    <ActionBox className='searchBar'>
                        <div className="main">

                            <Input
                                label="Search By Name"
                                placeholder="First or Last Name..."
                                value={this.state.searchName}
                                onChange={searchName => this.setState({ searchName })}
                                onKeyPress={this.enterPressed.bind(this)}
                            />



                            <Button
                                search
                                icon="search"
                                title="SEARCH"
                                onClick={this.searchQuery}
                            />

                        </div>

                    </ActionBox>

                    {this.renderTable()}
                    {userList}

                </div>
            </div>
        );
    }
}

export default GroupAccess;
