import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import ScriptSearch from './ScriptSearch/ScriptSearch'
import ScriptList from './ScriptList/ScriptList'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



import { Header } from '../../../common'

import styles from './ScriptsView.css'

class ScriptsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: '',
      status: '',
      date: '',
      age: '',
      note: '',
      physician: '',
      patient: '',
      medication: '',
      other: '',
      username: '',
      userID: '',
      results: []

    }
  }

  searchScriptDb = (searchParams, textSearch) => {
    const loginToken = window.localStorage.getItem("token");
    let roleFilter = '';
    if (this.state.role === 'Rep') roleFilter = '&rep=' + this.state.name;
    axios.get('api/scripts/search' + searchParams + roleFilter, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        let filteredScripts = resp.data.response;
        if (textSearch) {
          filteredScripts = resp.data.response.filter(function (event) {
            return event.rxNumber.includes(textSearch)
              || event.Physician.firstName.includes(textSearch) || event.Physician.firstName.toLowerCase().includes(textSearch)
              || event.Physician.lastName.includes(textSearch) || event.Physician.firstName.toLowerCase().includes(textSearch)
              || event.Patient.firstName.includes(textSearch) || event.Patient.firstName.toLowerCase().includes(textSearch)
              || event.Patient.lastName.includes(textSearch) || event.Patient.firstName.toLowerCase().includes(textSearch)
              || event.Product.name.includes(textSearch) || event.Product.name.toLowerCase().includes(textSearch)
              || event.Product.NDC.includes(textSearch);
          })
        };

        this.setState({
          results: filteredScripts,
          patient: resp.data.patient,
          medication: resp.data.medication,
          status: resp.data.status,
          pharmNPI: resp.data.pharmNPI,
          location: resp.data.location,
          pharmDate: resp.data.pharmDate
        })
      }).catch((error) => {
        console.error(error);
      })
  }

  componentDidMount() {

    const loginToken = window.localStorage.getItem("token");
    if (loginToken) {
      var decoded = jwt_decode(loginToken);
      axios.get('/api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
            name: resp.data.response[0].name,
            role: resp.data.response[0].role
          }, this.initialSearch);
        }).catch((error) => {
          console.error(error);
        })
    } else {
      return;
    }
    // const urlParams = new URLSearchParams(this.props.location.scripts)
    // // const patient = urlParams.get("patient")
    // this.searchScriptDb("?patient=" + urlParams.get("patient"))
    // // this.searchScriptDb();
  }

  initialSearch() {
    const urlParams = new URLSearchParams(this.props.location.scripts)
    this.searchScriptDb("?patient=" + urlParams.get("patient"))
  }

  textSearch = (textSearch) => {
    const filteredScripts = this.state.results.filter(function (event) {
      return event.Physician.lastName.includes(textSearch);
    });
    this.setState({
      results: filteredScripts
    })
  }


  render() {
    return (
      <ReactCSSTransitionGroup transitionName='fade' transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

          <div className={styles.app}>

            <Header>

              <h2>
                Select a Script
          </h2>

            </Header>

            <div className="body">

              <ScriptSearch searchFunc={this.searchScriptDb} />
              {/* {(this.state.results[0]) ? <ScriptList data={this.state.results} /> : ""} */}
              <ScriptList data={this.state.results} />


            </div>

          </div>
        </ ReactCSSTransitionGroup>
    ); 
  }
}

export default ScriptsView;
