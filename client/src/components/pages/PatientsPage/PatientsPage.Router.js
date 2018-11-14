import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

// Components
import PatientsView from './PatientsView/PatientsView'
import PatientsViewPhysician from './PatientsView_Physician/PatientsViewPhysician'
import PatientView from './PatientView/PatientView'
import PatientViewPhysician from './PatientView_Physician/PatientViewPhysician'

import AddPatient from './AddPatient/AddPatient'
import NotFound from '../../NotFound/NotFound'

console.log(this.props);

// const PatientsPageRouter = props => (
class PatientsPageRouter extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     userRole: ''
  //   }
  // }
  render() {
    // console.log(this.props);
    console.log(this.props.props.state.userRole);
    return (

      <Switch>
        {this.props.props.state.userRole === "Admin" || this.props.props.state.userRole === "Rep" ?
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
            exact
            path="/patients/:patientId"
            component={PatientViewPhysician}
          />
      










        <Route
          component={NotFound}
        />
      </Switch>
    )

  }
}

export default PatientsPageRouter;
