import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from './pages/auth/Login'
import Reset from './pages/auth/Reset'
import AdminMaster from './pages/admin/Master'
import FourOFour from './pages/fourOfour/Index'

import ScrollToTop from './components/scrollTop/Index'
import RoleBaseRoute from './components/privateRoute/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/reset" component={Reset} />
            <RoleBaseRoute path="/dashboard" role="admin" component={AdminMaster} />

            <Route path="*" component={FourOFour} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
