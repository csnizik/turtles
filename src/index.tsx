import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import CustomSearchContainer from './containers/CustomSearchContainer';
import LocationContainer from './containers/LocationContainer';
import Header from './components/Header';
import './stylesheets/app.scss';
import './i18n';
import 'nrcs-design-system/scss/nrcs-design-system.scss';

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
      <Route path='/location'>
        <LocationContainer />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
