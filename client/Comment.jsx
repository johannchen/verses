let { IconButton } = MUI;

Comment = React.createClass({
  render() {
    return (
      <p>
        <IconButton iconClassName="material-icons" onTouchTap={this.removeComment}>clear</IconButton>
        <span style={{paddingRight: '10px'}}>
          <i>{moment(this.props.comment.createdAt).fromNow()}</i>:
        </span>
        {this.props.comment.comment}
      </p>
    )
  },
  removeComment() {
    Meteor.call('removeComment', this.props.verseId, this.props.comment.id)
  }
});
