import React, { Component } from 'react';
import axios from 'axios'
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import Moment from 'react-moment'
import moment from 'moment'

import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

import styles from './FaxModal.css'

// Components
import {
  Button,
  FormModal,
  Table,
  Input,
  TextArea
} from '../../common'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: fixed;
`;


class FaxModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      loading: false,
      updateFaxNum: false
    }
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }


  componentWillReceiveProps() {
    if (this.props.state.scriptValue) {
      const loginToken = window.localStorage.getItem("token");
      axios.get('/api/scripts/search?scriptId=' + this.props.state.scriptValue, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          let script = resp.data.response[0]
          this.setState({
            patientId: script.PatientId,
            physicianId: script.PhysicianId,
            scriptId: script.id,
            physicianName: script.Physician.firstName + " " + script.Physician.lastName,
            physicianPhone: script.Physician.phone,
            physicianFax: script.Physician.fax,
            physAddressStreet: script.Physician.addressStreet,
            physAddressCity: script.Physician.addressCity,
            physAddressState: script.Physician.addressState,
            physAddressZipCode: script.Physician.addressZipCode,
            patientName: script.Patient.firstName + " " + script.Patient.lastName,
            patientDOB: script.Patient.dob,
            patientPhone: script.Patient.phone,
            patientAddressStreet: script.Patient.addressStreet,
            patientAddressCity: script.Patient.addressCity,
            patientAddressState: script.Patient.addressState,
            patientAddressZipCode: script.Patient.addressZipCode,
          })

          axios.get('/api/scripts/search?patientId=' + this.state.patientId + '&physicianId=' + this.state.physicianId + '&status=Renew', { headers: { "Authorization": "Bearer " + loginToken } })
            .then((resp) => {
              this.setState({
                scripts: resp.data.response
              }, this.addCheckOption)
            }).catch((err) => {
              console.error(err)
            })

        }).catch((err) => {
          console.error(err)
        })
    }
  }

  handleCheckbox(event, i) {

    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const scripts = this.state.scripts;
    if (value) {
      scripts[i].checked = true;
    } else if (!value) {
      scripts[i].checked = false;
    }
    this.setState({
      render: !this.state.render
    })
  }

  addCheckOption() {
    const scripts = this.state.scripts;

    for (var i = 0; i < scripts.length; i++) {
      scripts[i].checked = false;
    }
  }

  cancelDocument(e) {
    window.location.reload();
  }

  previewDocument(e) {
    e.preventDefault();

    const input = document.getElementById('divToPrint');
    html2canvas(input, {
      scale: "3"
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const logoData = 'data:image/png;base64,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'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 0, 297);
        pdf.addImage(logoData, 'PNG', 12, 18, 20, 20);

        pdf.save("Fax_Preview.pdf");

      })
  }

  printDocument(e) {
    e.preventDefault();
    const scripts = this.state.scripts
    const filteredScripts = scripts.filter(function (item) {
      return item.checked;
    });

    if (filteredScripts.length === 0) {
      window.alert('Fax has 0 scripts attached, please check the document');
      return;
    }

    this.props.loading();
    const physicianFax = this.state.physicianFax;
    const input = document.getElementById('divToPrint');
    html2canvas(input, {
      scale: "3"
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const logoData = 'data:image/png;base64,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'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 0, 297);
        pdf.addImage(logoData, 'PNG', 12, 18, 20, 20);

        var fax = pdf.output('blob');
        var data = new FormData();
        data.append("faxFile", fax)
        const loginToken = window.localStorage.getItem("token");

        if (window.confirm(`This will send a fax of the below document to ${physicianFax}, Continue?`)) {

          var blob = pdf.output('blob');
          var blobFile = new File([blob], "filename.pdf", { type: 'application/pdf' });
          var dataAWS = blobFile;
          this.submitS3(dataAWS);

          axios.post('/api/faxes/upload?patientId=' + this.state.patientId + '&scriptId=' + this.state.scriptId + '&faxNumber=' + physicianFax,
            data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((res) => {
              console.log(res)
              if (res.status === 200) {

                const date = moment().format('YYYY-MM-DD')
                console.log(date);

                for (var i = 0; i < filteredScripts.length; i++) {

                  filteredScripts[i].faxNum++;
                  var data = new FormData();
                  const loginToken = window.localStorage.getItem("token");
                  axios.put('/api/scripts/fax?id=' + filteredScripts[i].id + '&faxNum=' + filteredScripts[i].faxNum + '&lastFaxed=' + date,
                    data, { headers: { "Authorization": "Bearer " + loginToken } })
                    .then((data) => {
                      window.alert('Fax successfully sent!');
                      window.location.reload();
                    }).catch((error) => {
                      console.error(error);
                    })
                }
              }
              else {
                window.alert('Fax failed to send. Please make sure the fax number provided is valid.');
              }
            })
        } else {
          this.props.cancelLoading();
        }
      })
  }

  submitS3(dataAWS) {
    const file = dataAWS;
    // const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  };

  getSignedRequest(file) {
    const date = moment().format('MM-DD-YYYY')
    const loginToken = window.localStorage.getItem("token");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/faxes/sign-s3?file-name=testFile.pdf&file-type=application/pdf`,
      { headers: { "Authorization": "Bearer " + loginToken } });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }

  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // document.getElementById('preview').src = url;
          // document.getElementById('avatar-url').value = url;
          this.props.onClickAway()
          window.open(url)
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>RX NUMBER</th>
          <th>MEDICATION</th>
          <th>QTY</th>
          <th>LAST FILL</th>
          <th>DIRECTIONS</th>
          <th></th>
        </tr>
      </thead>
    )
  }

  renderTablePreHead() {
    return (
      <thead>
        <tr>
          <th>REFILL ON</th>
          <th>MEDICATION</th>
          <th>PHYSICIAN</th>
          <th>GROUP</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    var filteredScripts = this.state.scripts.filter(function (event) {
      return event.checked == true;
    });
    return (
      <tbody>
        {filteredScripts.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTablePreBody() {
    return (
      <tbody>
        {this.state.scripts.map(this.renderTablePreRow.bind(this))}
      </tbody>
    )
  }


  renderTableRow(script) {
    return (
      <tr value={script.id}>
        <td>{script.rxNumber}</td>
        <td>{script.Product.name}</td>
        <td>{script.quantity}</td>
        <td>{script.lastFill ?
          <Moment format="MM/DD/YYYY">{script.lastFill}</Moment>
          : <span></span>
        }</td>
        <td>{script.directions}</td>
        <td><div className='check'><input type="checkbox"></input><label>AUTHORIZED</label></div>
          WITH ______<br />
          ADDITIONAL REFILLS</td>
      </tr>
    )
  }

  renderTablePreRow(script) {
    const i = this.state.scripts.indexOf(script);
    return (
      <tr value={script.id}>
        <td>
          <div style={{ 'display': 'flex' }}>
            <input style={{ marginTop: 4, width: 20 }} type="checkbox" value={script.id} onChange={(e) => this.handleCheckbox(e, i)}></input><Moment format="MM/DD/YYYY">{script.processedOn}</Moment>
          </div>
        </td>
        <td>{script.Product.name}</td>
        <td>{script.Physician.firstName + " " + script.Physician.lastName}</td>
        <td>{script.Physician.group}</td>
      </tr>
    )
  }



  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderTable() {
    return (
      <Table className='faxTable'>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  renderTablePre() {
    return (
      <Table className='faxTable'>
        {this.renderTablePreHead()}
        {this.renderTablePreBody()}
      </Table>
    )
  }


  render() {

    const {
      content,
      onClickAway,
    } = this.props

    if (this.state.updateFaxNum === true) {
      this.updateFaxNum();
      this.setState({
        updateFaxNum: false
      })
    }



    if (this.state.scripts) {
      var scriptList = this.state.scripts.map(function (item, i) {
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

      <FormModal
        onClickAway={onClickAway}
        visible={!!content}
      >

        <div>
          <div className="mb5">
            {/* <button onClick={this.printDocument}>Print</button> */}
          </div>
          <div style={{
            backgroundColor: '#fff',
            width: '210mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10
          }}>
            <div className="main">
              <div style={{ width: '50%', margin: '0 auto' }}>

                <Input
                  label="FAX NUMBER"
                  placeholder={this.state.physicianFax}
                  value={this.state.physicianFax}
                  onChange={physicianFax => this.setState({ physicianFax })}
                />
                <br />
                <label>Comments</label>
                <TextArea
                  value={this.state.comments}
                  onChange={comments => this.setState({ comments })}
                />
              </div>
              {this.renderTablePre()}
              {scriptList}
            </div>

          </div>
          <div>
            <h1 style={{ textAlign: 'center' }}>FAX PREVIEW</h1>
          </div>
          <div id="divToPrint" className="mt4" style={{
            backgroundColor: '#fff',
            width: '210mm',
            minHeight: '297mm',
            marginLeft: 'auto',
            marginRight: 'auto',
            'font-weight': 'bold'
          }}>
            <div className="main">
              <div className='flex' style={{ marginTop: 50 }}>
                <div className='flex-col' style={{ textAlign: 'left' }}>
                  <img style={{ width: '75px', height: 'auto', marginLeft: 30 }} alt="SortPak" src="http://www.sortpak.com/site-uploadz/2018/05/sortpak-logo-lg.png" />
                </div>
                <div className='flex-col'>
                  <h2 style={{ marginTop: 0 }}>REFILL AUTHORIZATION REQUEST</h2>
                  <p>Sent on <Moment format="MM/DD/YYYY" /></p>
                </div>
                <div className='flex-col'>
                  <div style={{ textAlign: 'right', fontSize: 12, width: '90%' }}>
                    124 S. GLENDALE AVE<br />
                    GLENDALE, CA 91205<br />
                    TEL: (877) 570-7787<br />
                    FAX: (877) 475-2382
                  </div>
                </div>
              </div>
              <br />
              <table style={{ marginLeft: 30 }} className='infoTable'>
                <th>PATIENT NAME</th>
                <th>DATE OF BIRTH</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <tbody>
                  <tr>
                    <td style={{ width: 150 }}>{this.state.patientName}</td>
                    <td style={{ width: 125 }}><Moment format="MM/DD/YYYY">{this.state.patientDOB}</Moment></td>
                    <td style={{ width: 125 }}>{this.state.patientPhone}</td>
                    <td style={{ width: 200 }}>{this.state.patientAddressStreet},<br />
                      {this.state.patientAddressCity}, {this.state.patientAddressState}. {this.state.patientAddressZipCode}</td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginLeft: 30 }} className='infoTable'>
                <th>PHYSICIAN NAME</th>
                <th>PHONE</th>
                <th>FAX</th>
                <th>ADDRESS</th>
                <tbody>
                  <tr>
                    <td style={{ width: 150 }}>{this.state.physicianName}</td>
                    <td style={{ width: 125 }}>{this.state.physicianPhone}</td>
                    <td style={{ width: 125 }}>{this.state.physicianFax}</td>
                    <td style={{ width: 200 }}>{this.state.physAddressStreet},<br />
                      {this.state.physAddressCity}, {this.state.physAddressState}. {this.state.physAddressZipCode}</td>
                  </tr>
                </tbody>
              </table>

              {this.renderTable()}
              {scriptList}

              <Table className='faxTable'>
                <thead>
                  <tr>
                    <th>PLEASE CHECK ONE:</th>
                    <th>DOCTORS REMARKS:</th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={{ 'background-color': '#fff !important' }}>
                    <td style={{ background: '#f6f8fa' }}><div className="check"><input type="checkbox"></input>
                      <label>ALL ABOVE SCRIPTS ARE AUTHORIZED FOR ______ ADDITIONAL REFILLS</label></div></td>
                    <td rowspan={3} style={{ 'max-width': '300px', background: '#fff' }}>{this.state.comments}</td>
                  </tr>
                  <tr>
                    <td><div className="check"><input type="checkbox"></input>
                      <label>SCRIPTS ARE INDIVIDUALLY AUTHORIZED IN THE ABOVE LIST</label></div></td>
                  </tr>
                  <tr>
                    <td style={{ background: '#f6f8fa' }}><div className="check"><input type="checkbox"></input>
                      <label>NOT AUTHORIZED. PATIENT NEEDS TO CALL DOCTORS OFFICE</label></div></td>
                  </tr>
                </tbody>
              </Table>

              <div style={{ width: '90%', margin: '0 auto' }} className='signatures'>
                <div>
                  <p>AUTHORIZED BY</p>
                  <p>__________________________</p>
                </div>
                <div>
                  <p>SIGNATURE</p>
                  <p>__________________________</p>
                </div>
                <div>
                  <p>DATE</p>
                  <p>_________________________</p>
                </div>
              </div>

              <div style={{ width: '90%', margin: '0 auto' }}>
                <h5>CONFIDENTIALITY NOTICE</h5>
                <p>The information contained in this transmittal belongs to SortPak Pharmacy and may include information that is confidential, privileged, and protected
                  from disclosure under applicable law. It is intended only for the use of the above physicians. If you are not the intended recipient of this information,
                  you are hereby notified that any disclosure, copying, or distribution of this information is strictly prohibited. If you have received this transmittal in error,
                  please immediately notify us by telephone at (877) 570-7787. Thank you.
              </p>
              </div>

            </div>
          </div>
          <div className="actions" style={{ textAlign: 'right', margin: 20 }}>
            <Button
              cancel
              title="CANCEL"
              style={{ marginRight: 10 }}
              onCLick={this.cancelDocument.bind(this)}
            />
            <Button
              style={{ backgroundColor: 'blue', color: '#fff', marginRight: 10 }}
              title="PREVIEW"
              onClick={this.previewDocument.bind(this)}
            />
            <Button
              title="SEND FAX"
              onClick={this.printDocument.bind(this)}
            />
          </div>
        </div>

      </FormModal >


    )
  }
}

export default FaxModal;
