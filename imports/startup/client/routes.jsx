import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import HomeContainer from '../../ui/containers/HomeContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/" component={HomeContainer} />
    </Route>
  </Router>
);
