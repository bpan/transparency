import React from 'react'
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Controller from './components/controller.jsx';
import Library from './components/library.jsx';

render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Controller}/>
        <Route path='/library' component={Library}/>
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);