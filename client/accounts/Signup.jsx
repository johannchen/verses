let { Card, CardText, CardTitle, CardActions, TextField, RaisedButton } = MUI;

Signup = React.createClass({
  render() {
    return (
      <Card>
        <CardTitle title="Sign Up" />
        <CardText>
          <TextField hintText="username" ref="username" />
          <br />
          <TextField hintText="Email" type="email" ref="email" />
          <br />
          <TextField hintText="Password" type="password" ref="pass" />
          <br />
          <TextField hintText="Password Again" type="password" ref="passAgain" />
        </CardText>
        <CardActions>
          <RaisedButton label="Sign Up" primary={true} onTouchTap={this.handleSignUp}/>
        </CardActions>
      </Card>
    )
  },

  handleSignUp() {
    let username = this.refs.username.getValue();
    let email = this.refs.email.getValue();
    let password = this.refs.pass.getValue();
    let passAgain = this.refs.passAgain.getValue();
    if (! username) {
      this.refs.username.setErrorText("username cannot be blank!")
    } else if(! email) {
      this.refs.email.setErrorText("email cannot be blank!")
    } else if(! password) {
      this.refs.pass.setErrorText("password cannot be blank!")
    } else if(password.length < 6) {
      this.refs.pass.setErrorText("password must be greater than 5 characters!")
    } else if(password !== passAgain) {
      this.refs.passAgain.setErrorText("do not match password!")
    } else {
      // set default weekly goal in profile
      let profile = { goal: 5 };
      Accounts.createUser({username, email, password, profile}, (err) => {
        //TODO: display more error on sign up
        console.log(err);
      });
    }
  }
});
