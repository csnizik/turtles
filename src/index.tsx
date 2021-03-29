import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CongressionalGrant from './app/CongressionalGrant';
import Home from './app/Home';
import MapComponent from './app/MapComponent';
import './stylesheets/app.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/map">
        <MapComponent />
      </Route>
      <Route path="/congressionalReport/:year">
        <div className='container'>
          <CongressionalGrant />
        </div>
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
