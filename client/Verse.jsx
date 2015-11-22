let { Card,
  CardTitle,
  CardHeader,
  Avatar,
  CardText,
  CardActions,
  FlatButton,
  FontIcon,
  IconButton,
  TextField,
  Snackbar } = MUI;

Verse = React.createClass({
  getInitialState() {
    return {
      message: ''
    }
  },
  render() {
    return (
      <div>
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
            <TextField hintText="Any thoughts on this verse?" ref="newComment" fullWidth={true} multiLine={true} />
            <FlatButton label="Add Comment" secondary={true} onTouchTap={this._handleNewComment} />
            { this.props.partner ?
              <FlatButton label="Add To My Verses" onTouchTap={this.addToMyVerses} />

            : <FlatButton label="Edit Verse" onTouchTap={this.goVerseEdit} />
            }
            {this.renderComments()}
          </CardText>
        </Card>
        <Snackbar
          ref="addVerseIndicator"
          message={this.state.message}
          autoHideDuration={2000} />
      </div>
    )
  },

  renderComments() {
    if (this.props.verse.comments) {
      let verseId = this.props.verse._id;
      return this.props.verse.comments.map( (comment) => {
        return <Comment key={comment.id} comment={comment} verseId={verseId} ownerId={this.props.verse.owner} />;
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

  addToMyVerses() {
    let { title, topic, content} = this.props.verse;
    Meteor.call('addVerse', title, topic, content, (err) => {
      if (err) {
        this.setState({message: "Already Added To My Verses"})
      } else {
        this.setState({message: "Added To My Verses"})
      }
      this.refs.addVerseIndicator.show();
    });
  },

  /* add comment */
  addComment(comment) {
    Meteor.call('addComment', this.props.verse._id, comment);
  },

  _handleNewComment() {
    let comment = this.refs.newComment.getValue();
    if (comment) {
      this.addComment(comment);
      this.refs.newComment.setValue(null)
    }
  }
});
