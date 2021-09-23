import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from 'pages/Homepage'
import Login from 'pages/Login'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
