let {
  AppCanvas,
  AppBar,
  IconMenu,
  RaisedButton,
  FlatButton,
  LinearProgress,
  ToolbarSeparator } = MUI;

Home = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      currentUser: Meteor.user()
    };
  },

  getInitialState() {
    return {
      signin: true
    };
  },

  render() {
    return (
      <AppCanvas>
        {this.data.currentUser ?
          <div>
          { this.state.partner ?
            <Partner username={this.data.currentUser.profile.partner} />
          :
            <MyVerses currentUser={this.data.currentUser} />
          }
          </div>
        :
          <div>
            <AppBar
              title="Verses"
              iconElementRight={
                <div>
                  <RaisedButton label="Sign Up" primary={true} onTouchTap={this.handleSignUp}  />
                  <ToolbarSeparator />
                  <RaisedButton label="Sign In" onTouchTap={this.handleSignIn}  />
                </div>
              } />
            <p>Verses helps you to organize and memorize your favorite ESV Bible verses. May your heart and mind be filled with God's words, which you can put to good use in time of need.</p>
            { this.data.loggingIn ?
              <div>
                <FlatButton label="Logging in" disabled={true} />
                <LinearProgress mode="indeterminate" />
              </div>
              : <AccountsMUI signin={this.state.signin} />
            }
          </div>
        }
      </AppCanvas>
    );
  },
  handleSignIn() {
    this.setState({signin: true});
  },
  handleSignUp() {
    this.setState({signin: false});
  }
});
