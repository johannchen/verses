let { FlatButton, FontIcon } = MUI;

Comment = React.createClass({
  render() {
    return (
      <p>
        <FlatButton label={this.props.comment.username} title="delete comment" onTouchTap={this.removeComment} />
        <span style={{paddingLeft: '5px', paddingRight: '10px'}}>
          <i>{moment(this.props.comment.createdAt).fromNow()}</i>:
        </span>
        {this.props.comment.comment}
      </p>
    )
  },
  removeComment() {
    if (confirm("Are you sure to delete this comment?")) {
      Meteor.call('removeComment', this.props.verseId, this.props.comment.id);
    }
  }
});
