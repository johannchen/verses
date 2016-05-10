import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
  // Required by Material UI http://material-ui.com/#/get-started
  injectTapEventPlugin();
  render(renderRoutes(), document.getElementById('app'));
});
