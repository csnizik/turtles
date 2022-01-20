import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, presistedStore } from './Redux/store';
import Spinner from './components/Spinner/Spinner';

import './stylesheets/app.scss';
import './i18n';
import 'nrcs-design-system/scss/nrcs-design-system.scss';

const Home = lazy(() => import('./containers/Home'));
const GovernmentBanner = lazy(
  () => import('./components/GovernmentBanner/GovernmentBanner')
);
const CustomSearch = lazy(
  () => import('./containers/CustomSearchContainer/CustomSearch')
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
          <CustomSearch />
        </Route>
        <Route path='/search-results'>
          <ResultsContainer />
        </Route>
        <Route path='/health'>
          <h3>The App is Healthy</h3>
        </Route>
        <Route path='/:stateCode/:name/:category?/:individual?'>
          <LocationContainer />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

const rootNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={presistedStore}>
      <App />
    </PersistGate>
  </Provider>,
  rootNode
);
