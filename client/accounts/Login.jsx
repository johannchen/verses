let { Card, CardText, CardTitle, CardActions, TextField, RaisedButton } = MUI;

Login = React.createClass({
  getInitialState() {
    return {
      loginErrMsg: ""
    }
  },
  render() {
    return (
      <Card>
        <CardTitle title="Sign In" />
        <CardText>
          <p style={{color: 'red'}}>{this.state.loginErrMsg}</p>
          <TextField hintText="Email" type="email" ref="email" />
          <br />
          <TextField hintText="Password" type="password" ref="pass" />
        </CardText>
        <CardActions>
          <RaisedButton label="Sign In" primary={true} onTouchTap={this.handleSignIn}/>
        </CardActions>
      </Card>
    )
  },

  handleSignIn() {
    var self = this;
    let email = this.refs.email.getValue();
    let pass = this.refs.pass.getValue();
    Meteor.loginWithPassword(email, pass, (err) => {
      //TODO: check different error message
      if (err) {
        self.setState({loginErrMsg: "Login Failed, Please try again."});
      }
    });
    this.refs.email.setValue('');
    this.refs.pass.setValue('');
  }
});
