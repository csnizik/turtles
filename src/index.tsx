import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Spinner from './components/Spinner/Spinner';

import './stylesheets/app.scss';
import './i18n';
import 'nrcs-design-system/scss/nrcs-design-system.scss';

const Home = lazy(() => import('./containers/Home'));
const GovernmentBanner = lazy(
  () => import('./components/GovernmentBanner/GovernmentBanner')
);
const CustomSearchContainer = lazy(
  () => import('./containers/CustomSearchContainer/CustomSearchContainer')
);
const LocationContainer = lazy(() => import('./containers/LocationContainer'));
const ResultsContainer = lazy(() => import('./containers/ResultsContainer'));

const App = () => (
  <Router>
    <Suspense fallback={<Spinner />}>
      <GovernmentBanner />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/search'>
          <CustomSearchContainer />
        </Route>
        <Route path='/search-results'>
          <ResultsContainer />
        </Route>
        <Route path='/:name'>
          <LocationContainer />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

const rootNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootNode
);
