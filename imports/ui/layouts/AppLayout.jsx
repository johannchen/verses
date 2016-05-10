import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(lightBaseTheme)};
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

App.propTypes = {
  currentUser: React.PropTypes.object
}
