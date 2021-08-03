import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import CustomSearchContainer from './containers/CustomSearchContainer/CustomSearchContainer';
import Header from './components/Header/Header';
import './stylesheets/app.scss';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/search'>
        <CustomSearchContainer />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
