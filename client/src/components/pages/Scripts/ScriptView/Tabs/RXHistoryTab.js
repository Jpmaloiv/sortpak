import React, { Component } from 'react';

// Components
import {
  Table
} from '../../../../common'


class RXHistoryTab extends Component {


  render() {
    return (
      <div>
        
        <Table>
            <thead>
                <tr>
                    <th>BILL ON</th>
                    <th>MEDICATION</th>
                    <th>SHIP ON</th>
                    <th>STATUS</th>
                    <th>PROCESS ON</th>
                    <th>THERAPY END</th>
                    <th>REFILL #</th>
                    <th>REMAINING</th>
                    <th>PATIENT PAY</th>
                    <th>QUANTITY</th>
                    <th>RX NUMBER</th>
                    <th>POUCH</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </Table>
      </div>
    )
  }
}

export default RXHistoryTab;
