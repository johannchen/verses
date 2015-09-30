let { FontIcon } = MUI;

Comment = React.createClass({
  render() {
    return (
      <p>
        <FontIcon className="material-icons" onClick={this.removeComment}>clear</FontIcon>
        <i>{moment(this.props.comment.createdAt).format('YYYY MM DD')}</i>:
        {this.props.comment.comment}
      </p>
    )
  },
  removeComment() {
    Meteor.call('removeComment', this.props.verseId, this.props.comment.id)
  }
});
