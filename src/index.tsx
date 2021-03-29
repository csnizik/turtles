import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GrantContainer from './containers/GrantContainer';
import Home from './containers/Home';
import './stylesheets/app.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/congressionalReport/:year">
        <div className='container'>
          <GrantContainer />
        </div>
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
