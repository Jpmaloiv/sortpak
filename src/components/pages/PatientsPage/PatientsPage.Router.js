import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

// Components
import PatientsView from './PatientsView/PatientsView'
import PatientView from './PatientView/PatientView'
import AddPatient from './AddPatient/AddPatient'
import NotFound from '../../NotFound/NotFound'

const PatientsPageRouter = props => (
  <Switch>
    <Route
      exact
      path="/patients"
      component={PatientsView}
    />

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


export default PatientsPageRouter
