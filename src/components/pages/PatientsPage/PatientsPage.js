import React, { Component } from 'react';
import Router from './PatientsPage.Router'

import styles from './PatientsPage.css'

class PatientsPage extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Router />
      </div>
    );
  }
}

export default PatientsPage;
