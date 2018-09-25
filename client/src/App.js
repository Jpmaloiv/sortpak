import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNav from './components/TopNav/TopNav'
// import PrivateRoute from './components/ProtectedRoute';
// import Main from './components/pages/Main'
import Signup from './components/Signup'
import Login from './components/pages/LoginMain/LoginMain';
import ScriptsPage from './components/pages/Scripts/ScriptsPage';
import ScriptView from './components/pages/Scripts/ScriptView/ScriptView'
import DashboardPage from './components/pages/DashboardPage/DashboardPage'
import AgendaPage from './components/pages/AgendaPage/AgendaPage'
import AddScript from './components/pages/Scripts/AddScript/AddScript'
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
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route exact path="/agenda" component={AgendaPage} />

            </Switch>
          </div>
        </div>
      </Router>
       </Provider>
    );
  }
}

export default App;
