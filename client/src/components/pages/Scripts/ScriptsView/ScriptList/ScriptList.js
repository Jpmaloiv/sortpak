import React from 'react';
import Moment from 'react-moment'
import {Span, Table} from '../../../../common'

var moment = require('moment');
moment().format();



class ScriptList extends React.Component {

    renderTableHead() {
        return (
        
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Age</th>
              <th>Note</th>
              <th>Physician</th>
              <th>Patient</th>
              <th>Medication</th>
              <th>Other</th>
            </tr>
          </thead>
        )
      }
    
      renderTableBody() {
        return (
          <tbody>
            {this.props.data.map(this.renderTableRow.bind(this))}
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
              {script.status}
            </td>
          
    
            <td>
              <Span icon="calendar">
                {script.dateDisplay || 'None'}
              </Span>
            </td>
    
            <td>
              <Moment fromNow>{`${script.updatedAt}`}</Moment>
            </td>
    
            <td>
    
            </td>
    
            <td>
    
            </td>
    
            <td>
              {script.patient}
            </td>
    
            <td>
              {script.medication}
            </td>
            
            <td>
            {/* <td className={styles.detailsCell}> */}
              <Span
                title="DETAILS"
                link={`/scripts/${script.id}`}
                onClick={() => this.props.setScript(script)}
              />
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
        

     /* const {
      script,
      date
    } = this.state 

    var username = this.state.username; */

    if (this.props.data) {
      // const self = this;

var scriptList = this.props.data.map(function (item, i) {
          
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
        return(
            <div>

                {this.renderTable()}
          {scriptList}
            </div>
        )
    }
}

export default ScriptList;