import React from 'react';
import ReactDOM from 'react-dom';
import CongressionalGrant from './app/CongressionalGrant';
import './stylesheets/app.css';

const App = () => (
  <div className='container'>
    <CongressionalGrant />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
