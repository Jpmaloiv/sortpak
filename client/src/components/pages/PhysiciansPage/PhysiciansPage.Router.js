import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

// Components
import PhysiciansView from './PhysiciansView/PhysiciansView'
import PhysicianView from './PhysicianView/PhysicianView'
import AddPhysician from './AddPhysician/AddPhysician'
import NotFound from '../../NotFound/NotFound'

const PhysiciansPageRouter = props => (
  <Switch>
    <Route
      exact
      path="/physicians"
      component={PhysiciansView}
    />

    <Route
      exact
      path="/physicians/add"
      component={AddPhysician}
    />

    <Route
      exact
      path="/physicians/:physicianId"
      component={PhysicianView}
    />

    <Route
      component={NotFound}
    />
  </Switch>
)


export default PhysiciansPageRouter
