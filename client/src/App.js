import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNav from './components/TopNav/TopNav'
// import PrivateRoute from './components/ProtectedRoute';
// import Main from './components/pages/Main'
import Signup from './components/Signup'
import Login from './components/pages/LoginMain/LoginMain';
import ScriptsPage from './components/pages/Scripts/ScriptsPage';
import ScriptView from './components/pages/Scripts/ScriptView/ScriptView'
import AddScript from './components/pages/Scripts/AddScript/AddScript'
import PatientsPage from './components/pages/PatientsPage/PatientsPage'
import AddPatient from './components/pages/PatientsPage/AddPatient/AddPatient'
import PatientView from './components/pages/PatientsPage/PatientView/PatientView'
import DashboardPage from './components/pages/DashboardPage/DashboardPage'
import AgendaPage from './components/pages/AgendaPage/AgendaPage'
import PhysiciansPage from './components/pages/PhysiciansPage/PhysiciansPage'
import AddPhysician from './components/pages/PhysiciansPage/AddPhysician/AddPhysician'
import RefillsPage from './components/pages/RefillsPage/RefillsPage'
import ProductsPage from './components/pages/ProductsPage/ProductsPage'
import TeamPage from './components/pages/TeamPage/TeamPage'
import AddMember from './components/pages/TeamPage/AddMember/AddMember'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
// History
import createHistory from 'history/createBrowserHistory'
// import restricted from './components/restricted'


// import './App.css';

class App extends Component {
  render() {

    const history = createHistory()
    const historyMiddleware = routerMiddleware(history)

    const store = createStore(
      reducers,
      {},
      applyMiddleware(historyMiddleware, ReduxThunk),
    )
    return (
      <Provider store={store}>
      <Router>
        <div>
          <TopNav />
          <div className="container">
            <Switch>
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/signup"
              component={Signup}
            />
            {/* <Route
              path="/"
              render={restricted(Main, 'auth')}
            /> */}
              <Route exact path="/" component={Login} />
              <Route exact path="/scripts" component={ScriptsPage} />
              <Route exact path="/scripts/add" component={AddScript} />
              <Route exact path="/scripts/:scriptId" component={ScriptView} />
              <Route exact path="/patients" component={PatientsPage} />
              <Route exact path="/patients/add" component={AddPatient} />
              <Route exact path="/patients/:patientId" component={PatientView} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/physicians" component={PhysiciansPage} />
              <Route exact path="/physicians/add" component={AddPhysician} />
              <Route exact path="/agenda" component={AgendaPage} />
              <Route exact path="/refills" component={RefillsPage} />
              <Route exact path="/products" component={ProductsPage} />
              <Route exact path="/team" component={TeamPage} />
              <Route exact path="/team/add" component={AddMember} />

            </Switch>
          </div>
        </div>
      </Router>
       </Provider>
    );
  }
}

export default App;
