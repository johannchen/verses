let { Card, CardTitle, CardHeader, Avatar, CardText, CardActions, FlatButton, FontIcon, IconButton, TextField, Dialog } = MUI;

Verse = React.createClass({
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Card initiallyExpanded={this.props.expanded} style={{marginTop: '10px'}}>
              <CardHeader
                title={this.props.verse.title}
                subtitle={this.subtitle()}
                avatar={ this.props.partner ?
                  <Avatar>{this.pointCount()}</Avatar>
                  : <Avatar onTouchTap={this.goPoint}>{this.pointCount()}</Avatar> }
                showExpandableButton={true} />
              <CardText expandable={true}>
                {this.props.verse.content}
                <TextField hintText="Any thought on this verse?" ref="newComment" fullWidth={true} multiLine={true} />
                <FlatButton label="Add Comment" secondary={true} onTouchTap={this._handleNewComment} />
                <FlatButton label="Edit Verse" onTouchTap={this.goVerseEdit} />
                {this.renderComments()}
              </CardText>
            </Card>
          </div>
        </div>
      </div>
    )
  },

  renderComments() {
    if (this.props.verse.comments) {
      let verseId = this.props.verse._id;
      return this.props.verse.comments.reverse().map( (comment) => {
        return <Comment key={comment.id} comment={comment} verseId={verseId} />;
      });
    }
  },

  subtitle() {
    let lastPoint = '';
    if (this.props.verse.lastPointAt) {
      lastPoint = moment(this.props.verse.lastPointAt).fromNow() + ', ';
    }
    return lastPoint + this.props.verse.topic;
  },


  goPoint() {
    FlowRouter.go(`/point/${this.props.verse._id}`);
  },

  goVerseEdit() {
    FlowRouter.go(`/edit/${this.props.verse._id}`);
  },

  pointCount() {
    return this.props.verse.pointCount ? this.props.verse.pointCount : '0'
  },
  addComment(comment) {
    Meteor.call('addComment', this.props.verse._id, comment);
  },

  /* add comment */
  _handleNewComment() {
    let comment = this.refs.newComment.getValue();
    if (comment) {
      this.addComment(comment);
      this.refs.newComment.setValue(null)
    }
  }
});
