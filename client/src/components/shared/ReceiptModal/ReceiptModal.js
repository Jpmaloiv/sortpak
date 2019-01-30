import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import Moment from 'react-moment'

// Components
import {
  Button,
  FormModal,
  Icon,
  Table
} from '../../common'
import moment from 'moment'


class ReceiptModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receiptUpload: false
    }
  }


  cancelDocument(e) {
    window.location.reload();
  }

  previewDocument(e) {
    e.preventDefault();

    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const logoData = 'data:image/png;base64,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'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 0, 297);
        pdf.addImage(logoData, 'PNG', 20, 20, 20, 20);

        pdf.save("Receipt.pdf");

      })
  }

  // printDocument(e) {
  //   e.preventDefault();

  //   const input = document.getElementById('divToPrint');

  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const logoData = 'data:image/png;base64,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'
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 0, 0, 0, 297);
  //       pdf.addImage(logoData, 'PNG', 20, 20, 20, 20);
  //       pdf.autoPrint();
  //       var blob = pdf.output('blob');
  //       var blobFile = new File([blob], "filename.pdf", { type: 'application/pdf' });
  //     });
  // }

  uploadDocument(e) {
    e.preventDefault();

    const input = document.getElementById('divToPrint');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const logoData = 'data:image/png;base64,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'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 0, 297);
        pdf.addImage(logoData, 'PNG', 20, 20, 20, 20);
        pdf.autoPrint();
        var blob = pdf.output('blob');
        var blobFile = new File([blob], "filename.pdf", { type: 'application/pdf' });
        var data = blobFile;
        this.submitS3(data);
      });
  }

  submitS3(data) {
    const file = data;
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
    xhr.open('GET', `/api/receipts/sign-s3?file-name=testFile.pdf&file-type=application/pdf&scriptId=` + this.props.state.id + '&name=' + this.props.state.patientName + '&date=' + date,
      { headers: { "Authorization": "Bearer " + loginToken } });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
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
          console.log(url)
          window.open(url)
        }
        else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderTableHead() {
    return (
      <thead>
        <tr>
          <th>RX NUMBER</th>
          <th>PROCESS ON</th>
          <th>MEDICATION</th>
          <th>AMOUNT</th>
          <th>PAYMENT OPTION</th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.props.state.payments.map(this.renderTableRow.bind(this))}
        {this.renderTotalPayRow()}
      </tbody>
    )
  }

  renderTotalPayRow() {
    return (
      <tr style={{ textAlign: 'right' }}>
        <td colspan="5">Total Pay: <b>{this.props.state.totalPay}</b></td>
      </tr>
    )
  }

  updateTotalPay(i, event) {
    this.state.patientPay.splice(i, 1, event.target.value);
    this.setState({
      totalPayUpdated: true
    })
  }


  renderTableRow(payment) {
    const i = this.props.state.payments.indexOf(payment);
    let test = "";
    if (this.state.patientPay) test = this.state.patientPay[i]
    return (
      <tr value={payment.id}>

        <td>{payment.rxNumber}</td>
        <td><Moment format="MM/DD/YYYY">{payment.processedOn || 'None'}</Moment></td>
        <td>{payment.Product.name}</td>
        <td>{payment.patientPay}</td>
        <td>{payment.paymentOption}</td>
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

    const {
      content,
      onClickAway,
    } = this.props


    if (this.props.state.payments) {

      var paymentList = this.props.state.payments.sort(function (a, b) {
        return new Date(b.processedOn).getTime() - new Date(a.processedOn).getTime()
      });


      var paymentList = this.props.state.payments.map(function (item, i) {

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
                <Button onClick={this.uploadDocument.bind(this)}>SAVE RECEIPT</Button>
                {/* <Icon style={{'cursor': 'pointer'}} name="print" onClick={this.printDocument.bind(this)} /> */}
              </div>
              <div id="divToPrint" className="mt4" style={{
                backgroundColor: '#fff',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <div className="main">
                  <div className='flex'>
                    <div className='flex-col'>
                      <img style={{ width: '75px', height: 'auto' }} alt="SortPak" src="http://www.sortpak.com/site-uploadz/2018/05/sortpak-logo-lg.png" />
                    </div>
                    <div className='flex-col'>
                      <h2>RECEIPT</h2>
                      <p>PRINTED ON <Moment format="MM/DD/YYYY" /></p>
                    </div>
                    <div className='flex-col'>
                      124 S. GLENDALE AVE<br />
                      GLENDALE, CA 91205<br />
                      TEL: (877) 570-7787<br />
                      FAX: (877) 475-2382
                </div>
                  </div>
                  <br /><br />
                  <table className='infoTable'>
                    <tr>
                      <td>NAME</td>
                      <td>{this.props.state.patientName}</td>
                      <td>DATE OF BIRTH</td>
                      <td><Moment format='MM/DD/YYYY'>{this.props.state.patientDOB}</Moment></td>
                    </tr>
                    <tr>
                      <td>RX NUMBER</td>
                      <td>{this.props.state.rxNumber}</td>
                      <td>PHONE</td>
                      <td>{this.props.state.patientPhone}</td>
                    </tr>
                    <tr>
                      <td>PATIENT COPAY</td>
                      <td>{this.props.state.totalPay}</td>
                      <td>ADDRESS</td>
                      <td>{this.props.state.patientAddressStreet} <br />
                        {this.props.state.patientAddressCity}, {this.props.state.patientAddressState}, {this.props.state.patientAddressZipCode}</td>
                    </tr>
                    <tr>
                      <td>TRANSACTION ID</td>
                      <td>{this.props.state.transactionId}</td>
                    </tr>
                  </table>
                  <br />

                  <b>PLEASE CHECK ONE:</b>
                  <br /><br />

                  <div style={{ 'display': 'flex' }}>
                    <input type="checkbox" style={{ width: '30px', marginTop: 6 }}></input>
                    <label>NO PATIENT COPAY REQUIRED</label>
                  </div>
                  <div style={{ 'display': 'flex' }}>
                    <input type="checkbox" style={{ width: '30px', marginTop: 6 }}></input>
                    <label>PLEASE PAY ON DELIVERY</label>
                  </div>
                  <div style={{ 'display': 'flex' }}>
                    <input type="checkbox" style={{ width: '30px', marginTop: 6 }}></input>
                    <label>PLEASE MAIL A CHECK UPON DELIVERY</label>
                  </div>
                  <div style={{ 'display': 'flex' }}>
                    <input type="checkbox" style={{ width: '30px', marginTop: 6 }}></input>
                    <label>ALREADY PAID WITH CREDIT CARD</label>
                  </div>

                  {/* {this.renderTable()}
              {paymentList} */}

                  <div className='signatures' style={{ textAlign: 'right' }}>
                    <div>
                      <p>SIGNATURE</p>
                      <p>__________________________</p>
                    </div>
                  </div>

                  <div>
                    <h5>CONFIDENTIALITY NOTICE</h5>
                    <p>The information contained in this transmittal belongs to SortPak Pharmacy and may include information that is confidential, privileged, and protected
                      from disclosure under applicable law. It is intended only for the use of the above physicians. If you are not the intended recipient of this information,
                      you are hereby notified that any disclosure, copying, or distribution of this information is strictly prohibited. If you have received this transmittal in error,
                      please immediately notify us by telephone at (877) 570-7787. Thank you.
                </p>
                  </div>

                </div>
              </div>
            </div>

      </FormModal >

    )
  }
}

export default ReceiptModal;
