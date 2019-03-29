import React, { Component } from 'react';
import axios from 'axios'

import { Span, Table } from '../../../../common'

class ScriptsTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: '',
            scripts: []
        }
    }

    componentDidMount() {
        const { group } = this.props.pID.match.params
        encodeURIComponent(group);

        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/physicians/search?physGroup=' + group, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
                console.log(resp);
                this.setState({
                    physicians: resp.data.response,
                }, this.sortScripts)
            }).catch((error) => {
                console.error(error);
            })

    }

    async sortScripts() {
        const { physicians } = this.state
        const scriptIDs = []
        for (var i = 0; i < physicians.length; i++) {
            for (var j = 0; j < physicians[i].Scripts.length; j++) {
                scriptIDs.push(physicians[i].Scripts[j].id)
            }
        }
        const scripts = []

        for (var k = 0; k < scriptIDs.length; k++) {

            try {
                const loginToken = window.localStorage.getItem("token");
                await axios.get('/api/scripts/search?scriptId=' + scriptIDs[k], { headers: { "Authorization": "Bearer " + loginToken } })
                    .then((resp) => {
                        console.log(resp);
                        scripts.push(resp.data.response[0])
                    }).catch((error) => {
                        console.error(error);
                    })

                if (k === scriptIDs.length - 1) this.setState({ scripts: scripts }, this.renderTableBody)
            } catch (e) {
                console.log(e);
            }
        }


    }

    renderTableHead() {
        return (
            <thead>
                <tr>
                    <th>
                        STATUS
                </th>
                    <th>
                        DATE
                </th>
                    <th>
                        PATIENT
                </th>
                    <th>
                        MEDICATION
                </th>
                    <th>
                        OTHER
                    </th>
                </tr>
            </thead>
        )
    }

    renderTableBody() {
        console.log(this.state.scripts)

        return (
            <tbody>
                {this.state.scripts.map(this.renderTableRow.bind(this))}
            </tbody>
        )
    }

    handleClick(value) {
        window.location = `/scripts/${value}`
    }

    renderTableRow(script) {
        console.log("YEP")
        return (
            <tr value={script.id} onClick={() => this.handleClick(script.id)}>
                <td>
                    {script.status}
                </td>

                <td>
                    <Span icon="calendar">
                        {script.processedOn}
                    </Span>
                </td>

                <td>
                    {script.Patient.firstName} {script.Patient.lastName}
                </td>

                <td>
                    {script.Product.name}
                </td>

                <td>

                </td>

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
        console.log(this.state.scripts)

        if (this.state.scripts) {
            // const self = this;
            console.log(this.state.scripts[1])

            var scriptList = this.state.scripts.map(function (item, i) {
                console.log(item);
                return (
                    <div key={i}>
                        {/* <div className="story-title-author">
                          <h3 className="story-title">{item.patient}</h3>
                
                      <h5 className="story-author">
                          {!(self.props.match.params.username)
                              ?
                              <div style={{ marginLeft: "5px" }} className="btn-group" role="group">
                                  <button onClick={() => self.showUpdForm(item)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil"></span></button>
                                  <button onClick={() => self.deleteBook(item.id)} type="button" className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-remove"></span></button>
                              </div>
                              : null
                          }
                      </h5>
                  </div>
                  
                  <p>{item.description}</p>
                  <br /> */}
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
                {scriptList}
            </div>
        )
    }
}


export default ScriptsTab;
