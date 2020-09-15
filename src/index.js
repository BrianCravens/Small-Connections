import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import SmallConnections from './components/SmallConnections'

ReactDOM.render(
  <Router>
    <SmallConnections />
  </Router>,
  document.getElementById('root')
);
