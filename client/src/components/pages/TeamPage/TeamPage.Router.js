import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'

// Components
import TeamView from './TeamView/TeamView'
import AddMember from './AddMember/AddMember'
import MemberView from './MemberView/MemberView'
import NotFound from '../../NotFound/NotFound'

const TeamPageRouter = props => (
  <Switch>
    <Route
      exact
      path="/team"
      component={TeamView}
    />

    <Route
      exact
      path="/team/add"
      component={AddMember}
    />

    <Route
      exact
      path="/team/:memberId"
      component={MemberView}
    />

    <Route
      component={NotFound}
    />
  </Switch>
)


export default TeamPageRouter
