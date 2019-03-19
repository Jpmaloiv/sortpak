import React, { Component } from 'react';
import axios from 'axios'

import { Icon, Table, Header, Input, ActionBox, Button } from '../../../common'

import styles from '../PhysicianView/PhysicianView.css'

class PhysicianAccess extends Component {
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

        axios.get('/api/physicians/search?physicianId=' + this.props.match.params.physicianId, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                let physician = resp.data.response[0]
                this.setState({
                    name: physician.firstName + ' ' + physician.lastName,
                    group: physician.group
                })

            }).catch((error) => {
                console.error(error);
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
        let data = new FormData();
        axios.delete('/api/user/userPhysicians/delete?userId=' + value + '&physicianId=' + this.props.match.params.physicianId,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.reRender();
            }).catch((error) => {
                console.error(error);
            })
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
        let data = new FormData();
        axios.post('/api/user/userPhysicians?userId=' + value + '&physicianId=' + this.props.match.params.physicianId,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                this.reRender();
            }).catch((error) => {
                console.error(error);
            })
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
        return (
            <tbody>
                {this.state.users.map(this.renderTableRow.bind(this))}
            </tbody>
        )
    }



    renderTableRow(user) {
        console.log(user.physicians)
        return (
            <tr key={user.id} value={user.id}>

                <td>
                    {user.username}
                </td>

                <td style={{ 'width': '60%' }}>

                </td>

                <td>

                    {user.physicians.some(el => el['id'] == this.props.match.params.physicianId) ?

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

    groupAccess() {
        window.location = `/physicians/groups/${this.state.group}/access`;
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
                        {this.state.name}
                        <span onClick={this.groupAccess.bind(this)} className="group">
                            {this.state.group || 'No Group Available'}
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
                    <p style={{ marginBottom: -15, marginLeft: 40 }}>Give a user access to this physician</p>

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

export default PhysicianAccess;
