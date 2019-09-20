import React from 'react'
import {render} from 'react-dom';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Controller from './components/controller.jsx';

render(<Controller/>, document.getElementById('app'));