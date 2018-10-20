import React, { Component } from 'react';
import axios from 'axios'

import { Span, Table } from '../../../../common'

class PrescriptionsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: ''
    }
  }

  componentDidMount() {
    const patientNum = this.props.pID.match.params.patientId;
    const loginToken = window.localStorage.getItem("token");
        axios.get('/api/patients/search?patientId=' + patientNum, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
          // let patient = resp.data.response[0];
            this.setState({
                scripts: resp.data.response[0].Scripts          
              })
            }).catch((error) => {
              console.error(error);
          })
    }

        renderTableHead() {
          return (
            <thead>
              <tr>
                <th>
                  PROCESS ON
                </th>
                <th>
                  PHYSICIAN
                </th>
                <th>
                  MEDICATION
                </th>
                <th>
                  STATUS
                </th>
              </tr>
            </thead>
          )
        }
      
        renderTableBody() {
          
          return (
            <tbody>
              {this.state.scripts.map(this.renderTableRow.bind(this))}
            </tbody>
          )
        }

        handleClick(value) {
          window.location=`/scripts/${value}`
        }

        renderTableRow(script) {
          return (
            <tr value={script.id} onClick={() => this.handleClick(script.id)}>
              <td>
                <Span icon="calendar">
                  {script.processedOn}
                </Span>
              </td>
      
              <td>
                
              </td>
      
              <td>
                
              </td>

              <td>
                {script.status}
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

    if (this.state.scripts) {
      // const self = this;

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
}}



export default PrescriptionsTab;
