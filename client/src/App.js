import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import TopNav from './components/TopNav/TopNav'
import PrivateRoute from './components/ProtectedRoute';
// import Main from './components/pages/Main'
import Signup from './components/Signup'
import Login from './components/pages/LoginMain/LoginMain';
import ScriptsPage from './components/pages/Scripts/ScriptsPage';
import ScriptView from './components/pages/Scripts/ScriptView/ScriptView'
import ScriptViewPhysician from './components/pages/Scripts/ScriptView_Physician/ScriptViewPhysician'

import AddScript from './components/pages/Scripts/AddScript/AddScript'
import EditScript from './components/pages/Scripts/AddScript/EditScript'
import Attachment from './components/pages/Scripts/ScriptView/Attachment'
import Receipt from './components/pages/Scripts/ScriptView/Receipt'
import PatientAttachment from './components/pages/PatientsPage/PatientView/PatientAttachment'

import PatientsPage from './components/pages/PatientsPage/PatientsPage'
import AddPatient from './components/pages/PatientsPage/AddPatient/AddPatient'
import EditPatient from './components/pages/PatientsPage/AddPatient/EditPatient'
import PatientView from './components/pages/PatientsPage/PatientView/PatientView'
import PatientViewPhysician from './components/pages/PatientsPage/PatientView_Physician/PatientViewPhysician'
// import PatientFile from './components/pages/PatientsPage/PatientView/Tabs/PatientFile'
import DashboardPage from './components/pages/DashboardPage/DashboardPage'
import AgendaPage from './components/pages/AgendaPage/AgendaPage'
import PhysiciansPage from './components/pages/PhysiciansPage/PhysiciansPage'
import AddPhysician from './components/pages/PhysiciansPage/AddPhysician/AddPhysician'
import EditPhysician from './components/pages/PhysiciansPage/AddPhysician/EditPhysician'
import PhysicianAccess from './components/pages/PhysiciansPage/PhysicianAccess/PhysicianAccess'
import GroupView from './components/pages/PhysiciansPage/PhysicianView/GroupView'
import GroupAccess from './components/pages/PhysiciansPage/PhysicianAccess/GroupAccess'
import PhysicianView from './components/pages/PhysiciansPage/PhysicianView/PhysicianView'
import RefillsPage from './components/pages/RefillsPage/RefillsPage'
import ProductsPage from './components/pages/ProductsPage/ProductsPage'
import AddProduct from './components/pages/ProductsPage/AddProduct/AddProduct'
import EditProduct from './components/pages/ProductsPage/AddProduct/EditProduct'
import OrderProduct from './components/pages/ProductsPage/OrderProduct/OrderProduct'
import EditOrder from './components/pages/ProductsPage/OrderProduct/EditOrder'
import AdjustProduct from './components/pages/ProductsPage/OrderProduct/AdjustProduct'
import EditAdjust from './components/pages/ProductsPage/OrderProduct/EditAdjust'
import Inventory from './components/pages/ProductsPage/OrderProduct/Inventory'
import TeamPage from './components/pages/TeamPage/TeamPage'
import AddMember from './components/pages/TeamPage/AddMember/AddMember'
import EditMember from './components/pages/TeamPage/AddMember/EditMember'
import Profile from './components/pages/TeamPage/Profile/Profile'

import Layout from './components/Chat/Layout'

// import MemberView from './components/pages/TeamPage/MemberView/MemberView'


import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
// History
import createHistory from 'history/createBrowserHistory'
// import restricted from './components/restricted'


import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRole: '',
      render: true
    }
  }



  componentWillMount() {
    const loginToken = window.localStorage.getItem("token");
    if (loginToken) {
      var decoded = jwt_decode(loginToken);
      axios.get('/api/user/search?userId=' + decoded.id, { headers: { "Authorization": "Bearer " + loginToken } })
        .then((resp) => {
          this.setState({
            userRole: resp.data.response[0].role,
            render: true
          });
        }).catch((error) => {
          console.error(error);
        })
    } else {
      return;
    }
  }

  render() {

    const history = createHistory()
    const historyMiddleware = routerMiddleware(history)

    const store = createStore(
      reducers,
      {},
      applyMiddleware(historyMiddleware, ReduxThunk),
    )

    const Scripts = () => {
      console.log(this.state.userRole)
      if (this.state.userRole === 'Admin' || this.state.userRole === 'Rep') {
        return <PrivateRoute exact path="/scripts" component={ScriptsPage} />
      } else if (this.state.userRole === 'Physician') {
        return <Redirect to='/patients' />
      } else {
        return <div></div>
      }
    }

    const ThePatientsPage = (props) => {
      return (
        <PatientsPage
          state={this.state}
          {...props}
        />
      );
    }

    const ThePhysiciansPage = (props) => {
      return (
        <PhysiciansPage
          state={this.state}
          {...props}
        />
      );
    }

    const TheTeamPage = (props) => {
      if (this.state.userRole === 'Admin' || this.state.userRole === 'Rep') {
        return <TeamPage
          state={this.state}
          {...props}
        />
      } else if (this.state.userRole === 'Physician') {
        return <Redirect to='/patients' />
      } else {
        return <div></div>
      }
    }


    return (
      <Provider store={store}>
        <Router>
          <div>
            <TopNav />
            {/* {this.state.userRole === "" ? <div></div> :  <Layout />} */}
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
                <PrivateRoute exact path="/scripts" component={Scripts} />
                <PrivateRoute exact path="/scripts/add" component={AddScript} />
                {this.state.userRole === "Admin" ?
                  <PrivateRoute exact path="/scripts/:scriptId" component={ScriptView} />
                  : <PrivateRoute exact path="/scripts/:scriptId" component={ScriptViewPhysician} />}
                <PrivateRoute exact path="/scripts/:scriptId/edit" component={EditScript} />

                <PrivateRoute exact path="/patients" component={ThePatientsPage} />
                <PrivateRoute exact path="/physicians" component={ThePhysiciansPage} />


                <PrivateRoute exact path="/patients/add" component={AddPatient} />
                <PrivateRoute exact path="/patients/:patientId/edit" component={EditPatient} />
                {this.state.userRole === "Admin" || this.state.userRole === "Rep" ?
                  <PrivateRoute exact path="/patients/:patientId" component={PatientView} />
                  : <PrivateRoute exact path="/patients/:patientId" component={PatientViewPhysician} />}
                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                <PrivateRoute exact path="/physicians/add" component={AddPhysician} />
                <PrivateRoute exact path="/physicians/:physicianId/edit" component={EditPhysician} />
                <PrivateRoute exact path="/physicians/:physicianId" component={PhysicianView} />
                <PrivateRoute exact path="/physicians/:physicianId/access" component={PhysicianAccess} />
                <PrivateRoute exact path="/physicians/groups/:group" component={GroupView} />
                <PrivateRoute exact path="/physicians/groups/:group/access" component={GroupAccess} />
                <PrivateRoute exact path="/agenda" component={AgendaPage} />
                <PrivateRoute exact path="/refills" component={RefillsPage} />
                <PrivateRoute exact path="/products" component={ProductsPage} />
                <PrivateRoute exact path="/products/add" component={AddProduct} />
                <PrivateRoute exact path="/products/:productId/edit" component={EditProduct} />
                <PrivateRoute exact path="/products/order" component={OrderProduct} />
                <PrivateRoute exact path="/products/adjust" component={AdjustProduct} />
                <PrivateRoute exact path="/products/:productId/inventory" component={Inventory} />
                <PrivateRoute exact path="/products/orders/:orderId" component={EditOrder} />
                <PrivateRoute exact path="/products/adjustments/:adjustmentId" component={EditAdjust} />

                <Route exact path="/team" component={TheTeamPage} />
                <Route exact path="/team/add" component={AddMember} />
                <PrivateRoute exact path="/team/:userId/edit" component={EditMember} />
                <PrivateRoute exact path="/team/:userId/profile" component={Profile} />

                <PrivateRoute exact path="/attachment/:attachmentId" component={Attachment} />
                <PrivateRoute exact path="/receipt/:paymentId" component={Receipt} />

                <PrivateRoute exact path="/patientAttachment/:attachmentId" component={PatientAttachment} />

              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
