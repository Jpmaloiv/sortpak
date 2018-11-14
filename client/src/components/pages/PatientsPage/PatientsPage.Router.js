import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

// Components
import PatientsView from './PatientsView/PatientsView'
import PatientsViewPhysician from './PatientsView_Physician/PatientsViewPhysician'
import PatientView from './PatientView/PatientView'
import AddPatient from './AddPatient/AddPatient'
import NotFound from '../../NotFound/NotFound'

console.log(this.props);

// const PatientsPageRouter = props => (
  class PatientsPageRouter extends React.Component {
  render() {
    console.log(this.props.state.state.userRole);
    return(
  
  <Switch>
    {this.props.state.state.userRole === "Admin" ?
      <Route
        exact
        path="/patients"
        component={PatientsView}
      />
      :
      <Route
        exact
        path="/patients"
        component={PatientsViewPhysician}
      />
} 

      <Route
        exact
        path="/patients/add"
        component={AddPatient}
      />

      <Route
        exact
        path="/patients/:patientId"
        component={PatientView}
      />

      <Route
        component={NotFound}
      />
  </Switch>
  )
}
  }
  
  
  export default PatientsPageRouter
