let { Card, CardText, CardTitle, CardActions, TextField, RaisedButton, FlatButton, LinearProgress } = MUI;

Login = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      resetPasswordToken: Session.get('resetPassword')
    }
  },

  getInitialState() {
    return {
      loginErrMsg: '',
      forgotPassword: false
    }
  },
  render() {
    return (
      <div>
      { (this.state.forgotPassword || this.data.resetPasswordToken) ?
        <ResetPass resetToken={this.data.resetPasswordToken} setSignin={this.setSignin}/>
      :
        <div>
        { this.data.loggingIn ?
          <div>
            <FlatButton label="Logging in" disabled={true} />
            <LinearProgress mode="indeterminate" />
          </div>
          :
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
              <FlatButton label="Forgot Password?" onTouchTap={this.handleForgotPassword} />
            </CardActions>
          </Card>
        }
        </div>
      }
    </div>
    )
  },

  handleSignIn() {
    let email = this.refs.email.getValue();
    let pass = this.refs.pass.getValue();
    Meteor.loginWithPassword(email, pass, (err) => {
      //TODO: check different error message
      if (err) {
        this.setState({loginErrMsg: "Login Failed, Please try again."});
      }
    });
    this.refs.email.setValue('');
    this.refs.pass.setValue('');
  },

  handleForgotPassword() {
    this.setState({forgotPassword: true});
  },

  setSignin() {
    this.setState({forgotPassword: false});
  }

});
