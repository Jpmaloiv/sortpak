import React, { Component } from 'react';
import axios from 'axios'

import ScriptSearch from './ScriptSearch/ScriptSearch'
import ScriptList from './ScriptList/ScriptList'


// import { hasAuthTokenAsync } from '../../../../lib'

import { Header, Button } from '../../../common'

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
    // this.handleClick = this.handleClick.bind(this);
  }

  searchScriptDb = (searchParams) => {
    const loginToken = window.localStorage.getItem("token");
    axios.get('api/scripts/search' + searchParams, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
            console.log(resp)
        this.setState({
            results: resp.data.response,
            // id: resp.data.response.id,
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
      const urlParams = new URLSearchParams(this.props.location.scripts)
      // const patient = urlParams.get("patient")
      this.searchScriptDb("?patient=" + urlParams.get("patient"))   
  }


  render() {
    return (
      <div className={styles.app}>

        <Header>

          <h2>
            Select a Script
          </h2>

        </Header>

        <div className="body">

          <ScriptSearch searchFunc={this.searchScriptDb}/>
          {/* {(this.state.results[0]) ? <ScriptList data={this.state.results} /> : ""} */}
          <ScriptList data={this.state.results} />


        </div>

      </div>
    );
  }
}

/* const mapStateToProps = ({ main }) => {
  const {
    // scripts,
    scriptsDisplay,
    loading,
    error,
  } = main

  return {
    scripts: scriptsDisplay,
    loading,
    error,
  }
}

const actions = {
  getScripts,
  setScript,
  /* filterScriptsByName,
  filterScriptsByDob, */
// } */

// export default connect(mapStateToProps, actions)(ScriptsView);
export default ScriptsView;
