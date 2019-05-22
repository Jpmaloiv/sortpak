import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


// Helpers
import { formatCurrencyOptions } from '../../../../lib'

// Components
import {
  SummaryItem,
  Table,
  Span,
} from '../../../common'

import styles from './AdminDashboard.css'


class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patientNum: '',
      physicianNum: '',
      revenue: '',
      dailyAvgRevenue: '',
      cost: '',
      profit: '',
      dailyAvgProfit: '',
      revenuePerSale: ''
    }
  }
  renderCard({ title, content }) {
    return (
      <SummaryItem
        className="card"
        key={title}
        title={title}
        content={content}
      />
    )
  }

  componentWillMount() {
    const loginToken = window.localStorage.getItem("token");
    if (loginToken) {
      var decoded = jwt_decode(loginToken);
      axios.get('/api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
            name: resp.data.response[0].name,
            role: resp.data.response[0].role
          }, this.search);
        }).catch((error) => {
          console.error(error);
        })
    } else {
      return;
    }
  }

  search() {
    const loginToken = window.localStorage.getItem("token");

    let roleFilter = '';
    if (this.state.role === 'Rep') roleFilter = '?rep=' + this.state.name;

    if (this.state.role === 'Admin') {
      axios.get('api/patients/search', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp)
          this.setState({
            patientNum: resp.data.response.length
          })
        }).catch((error) => {
          console.error(error);
        })
    }

    if (this.state.role === 'Rep') {
      let repFilter = '?rep=' + this.state.name
      axios.get('api/scripts/search' + repFilter, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp)
          this.setState({
            patientScripts: resp.data.response
          }, this.calcPatientNum)
        }).catch((error) => {
          console.error(error);
        })
    }

    axios.get('api/physicians/search' + roleFilter, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        this.setState({
          physicianNum: resp.data.response.length
        })
      }).catch((error) => {
        console.error(error);
      })

    if (this.state.role === 'Admin') {
      axios.get('api/scripts/payments/search/', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
            payments: resp.data.response,
            sales: resp.data.response.length
          }, this.calcRevenue)
        }).catch((error) => {
          console.error(error);
        })
    }

    if (this.state.role === 'Rep') {
      const repName = this.state.name
      axios.get('api/scripts/payments/search?rep=true', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          let arr = resp.data.response

          let payments = arr.filter(function (el) {
            return el.Script.Physician.rep === repName
          });

          this.setState({
            payments: payments,
            sales: payments.length
          }, this.calcRevenue)
        }).catch((error) => {
          console.error(error);
        })
    }

    if (this.state.role === 'Admin') {
      axios.get('api/scripts/search?status=Shipped,Done', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          console.log(resp)
          this.setState({
            scripts: resp.data.response,
            repeatPatients: resp.data.response.length
          }, this.calcCost)
        }).catch((error) => {
          console.error(error);
        })
    }

    if (this.state.role === 'Rep') {
      let repName = this.state.name;

      axios.get('api/scripts/search?status=Shipped,Done', { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          let arr = resp.data.response

          let scripts = arr.filter(function (el) {
            return el.Physician.rep === repName
          });
          this.setState({
            scripts: scripts,
            repeatPatients: scripts.length
          }, this.calcCost)
        }).catch((error) => {
          console.error(error);
        })
    }
  }

  calcPatientNum() {
    const patientsReps = [];
    for (var i = 0; i < this.state.patientScripts.length; i++) {
      let script = this.state.patientScripts[i];
      let name = script.Patient.firstName + ' ' + script.Patient.lastName
      patientsReps.push(name);
    }
    this.setState({
      patientsReps: patientsReps
    }, this.filterPatientsReps)
  }

  filterPatientsReps() {
    const { patientsReps } = this.state

    const patientsRepsNum = patientsReps.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    this.setState({
      patientNum: patientsRepsNum.length
    })
  }

  calcRevenue() {
    console.log(this.state.payments)
    const revenue = [];
    for (var i = 0; i < this.state.payments.length; i++) {
      revenue.push(this.state.payments[i].amount)
    }
    var sum = revenue.reduce(add, 0);

    function add(a, b) {
      return a + +b;
    }

    this.setState({
      revenue: sum.toFixed(2)
    }, this.calcDailyRevenue)
  }

  calcDailyRevenue() {
    this.setState({
      dailyAvgRevenue: (this.state.revenue / 21.74).toFixed(2)
    })
  }

  calcCost() {
    console.log(this.state.scripts)
    const cost = [];
    for (var i = 0; i < this.state.scripts.length; i++) {
      cost.push(this.state.scripts[i].cost)
    }
    var sum = cost.reduce(add, 0);

    function add(a, b) {
      return a + +b;
    }

    this.setState({
      cost: sum.toFixed(2)
    }, this.calcProfit)
  }

  calcProfit() {
    this.setState({
      profit: (this.state.revenue - this.state.cost).toFixed(2),
      dailyAvgProfit: ((this.state.revenue - this.state.cost) / 21.74).toFixed(2)
    }, this.calcFinal)
  }

  calcFinal() {
    this.setState({
      revenuePerSale: (this.state.revenue.toFixed / this.state.sales).toFixed(2)
    }, this.convertNaN)
  }

  convertNaN() {
    if (this.state.revenuePerSale === 'NaN') {
      this.setState({
        revenuePerSale: 0
      })
    }
  }


  renderCards() {
    // const patients = this.props.patients.length
    // const repeatPatients = this.props.patients.filter(el => el.scripts).length
    // const newPhysicians = this.props.physicians.filter(el => !el.repId).length
    const cardData1 = [
      { title: 'Revenue', content: '$' + this.state.revenue },
      { title: 'Daily AVG Revenue', content: '$' + this.state.dailyAvgRevenue },
      { title: 'Cost', content: '$' + this.state.cost },
      { title: 'Profit', content: '$' + this.state.profit },
      { title: 'Daily AVG Profit', content: '$' + this.state.dailyAvgProfit }
    ]
    const cardData2 = [
      { title: 'Sales', content: this.state.sales },
      { title: 'Revenue per Sale', content: '$' + this.state.revenuePerSale },
      { title: 'Repeat Patients', content: this.state.repeatPatients },
      { title: 'New Patients', content: this.state.patientNum || '-' },
      { title: 'New Physicians', content: this.state.physicianNum || '-' }
    ]

    return (<div className="cardStack">
      <div className="cards">
        {cardData1.map(this.renderCard.bind(this))}
      </div>
      <div className="cards">
        {cardData2.map(this.renderCard.bind(this))}
      </div></div>
    )
  }

  renderRepRow(rep) {
    return (
      <tr key={rep.id}>
        <td>
          <Span
            link={`/team/${rep.id}`}
            icon='user-circle'
          >
            {rep.nameDisplay}
          </Span>
        </td>
        <td>
          {rep.bonus.toLocaleString(...formatCurrencyOptions)}
        </td>
      </tr>
    )
  }

  renderRepScorecard() {
    const { reps } = this.props
    return (
      <div className="card-container">
        <h2>
          Rep Scorecard
        </h2>
        <Table
          className={styles.repsTable}
          borderless
        >
          <thead>
            <tr>
              <th>
                Rep
              </th>
              <th>
                Bonus
              </th>
            </tr>
          </thead>
          <tbody>
            {reps.map(this.renderRepRow.bind(this))}
          </tbody>
        </Table>
      </div>
    )
  }

  renderPhysicianRow(physician) {
    return (
      <tr key={physician.id}>
        <td>
          <Span icon='user-circle' />
          <div className="physician">
            <Span
              className="name"
              link={`/physicians/${physician.id}`}
            >
              {physician.nameDisplay}
            </Span>
            <span className="group">
              {physician.group || 'No Group Found'}
            </span>
          </div>
        </td>
      </tr>
    )
  }

  renderUnassignedPhysicians() {
    const physicians = this.props.physicians.filter(el => !el.repId)
    return (
      <div className="card-container">
        <h2>
          Unassigned Physicians
        </h2>
        <Table
          className={styles.physiciansTable}
          borderless
        >
          <thead>
            <tr>
              <th>
                Physician
              </th>
            </tr>
          </thead>
          <tbody>
            {physicians.map(this.renderPhysicianRow.bind(this))}
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    return (

      <div className={styles.body}>
        {/* <div className="graph">
        </div> */}
        {this.renderCards()}

        {/* <div className="cards">
          {this.renderRepScorecard()}
          {this.renderUnassignedPhysicians()}
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ main }) => {
  const {
    physicians,
    patients,
    reps,
  } = main
  return {
    physicians,
    patients,
    reps,
  }
}

const actions = {
}

export default connect(mapStateToProps, actions)(AdminDashboard);
