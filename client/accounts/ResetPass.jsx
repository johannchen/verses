let { Card, CardText, CardTitle, CardActions, TextField, RaisedButton, FlatButton } = MUI;

ResetPass = React.createClass({
  render() {
    return (
      <div>
      { this.props.resetToken ?
      <Card>
        <CardTitle title="Reset Password" />
        <CardText>
          <TextField hintText="Password" type="password" ref="pass" />
          <br />
          <TextField hintText="Password Again" type="password" ref="passAgain" />
        </CardText>
        <CardActions>
          <RaisedButton label="Reset Password" primary={true} onTouchTap={this.handleResetPassword}/>
        </CardActions>
      </Card>
      :
      <Card>
        <CardText>
          <TextField hintText="Email" type="email" ref="email" />
        </CardText>
        <CardActions>
          <RaisedButton label="Reset Password" primary={true} onTouchTap={this.handleForgotPassword}/>
          <FlatButton label="Cancel" onTouchTap={this.handleCancel} />
        </CardActions>
      </Card>
      }
      </div>
    )
  },

  handleCancel() {
    this.props.setSignin();
  },

  handleForgotPassword() {
    Accounts.forgotPassword({email: this.refs.email.getValue()}, (err) => {
      if (err) {
        this.refs.email.setErrorText("User not found!");
        console.log(err);
      } else {
        console.log("An email to reset password is sent to the user!");
        this.props.setSignin();
      }
    });
  },

  handleResetPassword() {
    let password = this.refs.pass.getValue();
    let passAgain = this.refs.passAgain.getValue();
    if(! password) {
      this.refs.pass.setErrorText("password cannot be blank!")
    } else if(password.length < 6) {
      this.refs.pass.setErrorText("password must be at least 5 characters!")
    } else if(password !== passAgain) {
      this.refs.passAgain.setErrorText("do not match password!")
    } else {
      Accounts.resetPassword(this.props.resetToken, password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
  }
});
