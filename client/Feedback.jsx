let {
  AppBar,
  IconButton,
  Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  TextField,
  Snackbar
  } = MUI;

Feedback = React.createClass({
  getInitialState() {
    return {
      message: ''
    }
  },
  render() {
    return (
      <div>
        <AppBar
          title="Feedback"
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>} />
        <Card style={{marginTop: '10px'}}>
          <CardText>
            <TextField hintText="Your invaluable feedback" ref="feedback" fullWidth={true} multiLine={true} />
          </CardText>
          <CardActions>
            <FlatButton label="Send Feedback" secondary={true} onTouchTap={this.sendFeedback} />
          </CardActions>
        </Card>
        <Snackbar
          ref="thankyou"
          message={this.state.message}
          autoHideDuration={2000} />
      </div>
    )
  },

  goHome() {
    FlowRouter.go('/');
  },

  sendFeedback() {
    //TODO check if inpuut empty
    Meteor.call('sendEmail', 'johannchen@gmail.com', Meteor.user().emails[0].address, 'Verses Feedback', this.refs.feedback.getValue());
    this.setState({message: 'Thank you for your invaluable feedback!'});
    this.refs.thankyou.show();
    this.refs.feedback.clearValue();
  }
});
