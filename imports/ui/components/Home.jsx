import React from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <AppBar
          title="Verses"
          iconElementRight={
            <FlatButton label="Sign Up" />}
        />
      </div>
    )
  }
}

export default Home;
