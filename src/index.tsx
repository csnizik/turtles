import React from 'react';
import ReactDOM from 'react-dom';
import CongressionalReport from './app/CongressionalReport';
import './stylesheets/app.css';

const App = () => {
  return (
    <div className='container'>
      <CongressionalReport />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
