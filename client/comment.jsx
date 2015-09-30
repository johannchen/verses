Comment = React.createClass({
  render() {
    return (
      <p>
        <a onClick={this.removeComment}>&times;</a>
        <i>{moment(this.props.comment.createdAt).format('YYYY MM DD')}</i>:
        {this.props.comment.comment}
      </p>
    )
  },
  removeComment() {
    Meteor.call('removeComment', this.props.verseId, this.props.comment.id)
  }
});
