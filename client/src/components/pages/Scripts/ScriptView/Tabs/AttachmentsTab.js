import React from 'react';

import {
  Table,
} from '../../../../common'

const AttachmentsTab = ({ className }) => {
  return (
    <div className={className}>
      <Table>
        <thead>
          <tr>
            <th>
              Medication
            </th>
            <th>
              Rx#
            </th>
            <th>
              Written Date
            </th>
            <th>
              Physician
            </th>
            <th>
              Refills
            </th>
            <th>
              Cost
            </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    </div>
  )
}

export default AttachmentsTab;
