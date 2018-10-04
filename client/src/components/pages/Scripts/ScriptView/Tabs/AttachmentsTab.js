import React, { Component } from 'react';
import axios from 'axios'

import Moment from 'react-moment'

// Components
import { Button, Link, Table } from '../../../../common'

import {
  AttachmentModal,
} from '../../../../shared/'

class AttachmentsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateAttached: '',
      type: ''
    }
  }
  
  
  openNoteModal() {
    this.props.setState({ attachmentModal: {} })
  }

  componentDidMount() {
      const loginToken = window.localStorage.getItem("token");
        axios.get('/api/scripts/attachments/search/', { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp);
            console.log(resp.data);
            console.log(resp.data.response);
            this.setState({
                attachments: resp.data.response,
                // id: resp.data.response.id,
               
            })
            console.log(this.state.attachments)
          }).catch((error) => {
            console.error(error);
        })
  }

  

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>
            File
          </th>
          <th>
            Date Attached
          </th>
          <th>
            Attached By
          </th>
          <th>
            Type
          </th>
          <th/>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    console.log(this.state.attachments);
    // const { patients } = this.props
    return (
      <tbody>
        {this.state.attachments.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(attachment) {
    console.log(this.state.file);
    return (
      <tr key={attachment.id}>
        <td>
          {/* <Link to={'./attachment/' + attachment.id} activeClassName="active">
              <h3>View</h3>
          </Link> */}
          
        </td>
        

        <td>        
        <Moment format={"YYYY-MM-DD"}>{`${attachment.createdAt}`}</Moment>
        </td>

        <td>
          {attachment.User.username}
        </td>

        <td>
          {attachment.type}
        </td>

        {/* <td className={styles.detailsCell}>
          <Button
            title="DETAILS"
            link={`/patients/${patient.id}`}
            onClick={() => this.props.setPatient(patient)}
          />
        </td> */}
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

    if (this.state.attachments) {
      // const self = this;

var attachmentList = this.state.attachments.map(function (item, i) {
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

    console.log(this.state.attachments);
    
    const {
      state,
      className,
      onCloseModal,
      onCreateNote,
    } = this.props

    // const notes = patient.notes || []
    const {
      attachmentModal
    } = state

    
    return (
      <div className={className}>
  
        <Button
          icon="plus"
          title="ATTACH FILE"
          onClick={() => this.openNoteModal()}
        />

        <div className="notes">

        {this.renderTable()}
          {attachmentList}
  
        </div>
            

        <AttachmentModal
          content={attachmentModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
        />
      </div>
    )
  }
}

export default AttachmentsTab;
