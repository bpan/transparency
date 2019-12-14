import React from 'react'
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Controller from './components/controller.jsx';

render(
  <Router>
    <div>
      <Route exact path='/' component={Controller}/>
    </div>
  </Router>,
  document.getElementById('app')
);