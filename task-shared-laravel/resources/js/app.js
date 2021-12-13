require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import { Example } from './components/Example';
import { Register } from "./components/Register";
import { Example } from "./components/Example";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Example} />
      <Route path="/task" component={Register} />
    </Router>
  )
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}