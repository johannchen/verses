let { FlatButton, FontIcon } = MUI;

Comment = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUsername: Meteor.user().username
    }
  },

  render() {
    return (
      <p>
        { this.isOwner() ?
          <FlatButton label={this.props.comment.username} title="delete comment" onTouchTap={this.removeComment} />
        :
          <FlatButton label={this.props.comment.username} disabled={true} />
        }
        <span style={{paddingLeft: '5px', paddingRight: '10px'}}>
          <i>{moment(this.props.comment.createdAt).fromNow()}</i>:
        </span>
        {this.props.comment.comment}
      </p>
    )
  },

  isOwner() {
    return this.data.currentUsername === this.props.comment.username;
  },

  removeComment() {
    if (confirm("Are you sure to delete this comment?")) {
      Meteor.call('removeComment', this.props.verseId, this.props.comment.id);
    }
  }
});
