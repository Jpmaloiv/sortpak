import React, { Component } from 'react';
import axios from 'axios'
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import Moment from 'react-moment'

import styles from './FaxModal.css'

// Components
import {
  Button,
  Selector,
  FormModal,
} from '../../common'


class FaxModal extends Component {


  componentWillReceiveProps() {
    if (this.props.state.scriptValue) {
      const loginToken = window.localStorage.getItem("token");
      axios.get('/api/scripts/search?scriptId=' + this.props.state.scriptValue, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp);
          this.setState({
          })
  
        }).catch((err) => {
          console.error(err)
        })
    }
  }
  


  printDocument(e) {
    e.preventDefault();
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const logoData = 'data:image/png;base64,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'
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.addImage(logoData, 'PNG', 20, 20, 20, 20);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  }



  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {

    const {
      content,
      onClickAway,
    } = this.props

    return (

      <FormModal
        onClickAway={onClickAway}
        visible={!!content}
        className="low"
      >

        <div className="mb5">
          <button onClick={this.printDocument}>Print</button>
        </div>
        <div id="divToPrint" className="faxModal" style={{
          backgroundColor: '#f5f5f5',
          width: '210mm',
          minHeight: '297mm',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <h1 style={{ textAlign: 'center' }}>FAX PREVIEW</h1>
          <div className='flex'>
            <div className='flex-col'>
            <img style={{width: '75px', height: 'auto'}} alt="SortPak" src="http://www.sortpak.com/site-uploadz/2018/05/sortpak-logo-lg.png" />
            </div>
            <div className='flex-col'>
            <h2>REFILL AUTHORIZATION REQUEST</h2>
            <p>Sent on <Moment format="MM/DD/YYYY" /></p>
            </div>
            <div className='flex-col'>Address</div>
          </div>
        </div>
      </FormModal >
    )
  }
}

export default FaxModal;
