let {
  AppCanvas,
  AppBar,
  IconMenu,
  RaisedButton,
  FlatButton,
  LinearProgress,
  Card,
  CardTitle,
  CardText,
  ToolbarSeparator } = MUI;

Home = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: FlowRouter.subsReady('randomVerse'),
      randomVerse: Verses.findOne(),
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
            <MyVerses currentUser={this.data.currentUser} />
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
            <p>Verses helps you to memorize your favorite ESV Bible verses with your accountability partner. May your heart and mind be filled with God's Word, which you can put to good use in time of need.</p>
            <AccountsMUI signin={this.state.signin} />
            { this.data.loaded ?
            <Card style={{marginTop: '30px'}}>
              <CardTitle title={this.data.randomVerse.title} />
              <CardText>
                {this.data.randomVerse.content}
              </CardText>
            </Card>
            : ''}
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
