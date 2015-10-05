let { FontIcon } = MUI;

Comment = React.createClass({
  render() {
    return (
      <p>
        <FontIcon className="material-icons" onTouchTap={this.removeComment}>clear</FontIcon>
        <span style={{paddingLeft: '10px', paddingRight: '10px'}}>
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
