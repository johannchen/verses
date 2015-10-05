let { Card, CardTitle, CardText, CardActions, FlatButton, FontIcon, IconButton, TextField, Dialog } = MUI;

Verse = React.createClass({
  getInitialState() {
    return {
      modal: false,
      editMode: false,
      diff: { __html: ''}
    }
  },

  render() {
    let standardActions = [
      { text: 'Cancel', key: 0 },
      { text: 'Try Again', key: 1, onTouchTap: this._onTryAgain },
      { text: 'Submit', key: 2, onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    let editActions = [
      <FlatButton key={0} label="Cancel" onTouchTap={this._editDialogClose} />,
      <FlatButton key={1} label="Delete" primary={true} onTouchTap={this._onDeleteVerse} />,
      <FlatButton key={2} label="Save" ref="save" secondary={true} onTouchTap={this._onEditDialogSubmit} />
    ];
    let styles = {
      container: {
        textAlign: 'center',
        marginBottom: '16px'
      },
      exampleFlatButtonIcon: {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px'
      }
    };
    return (
      <div>
        <Card initiallyExpanded={true} className="verse">
          <CardTitle
            title={this.props.verse.title}
            subtitle={this.props.verse.topic}
            showExpandableButton={true} />
          <CardText expandable={true}>
            {this.props.verse.content}
          </CardText>
          <CardActions expandable={true}>
            <div style={styles.container}>
              <FlatButton label={this.props.verse.starCount ? this.props.verse.starCount : '0'}
                secondary={true}
                title={this.props.verse.lastStarAt ? moment(this.props.verse.lastStarAt).fromNow() : ''}
                onTouchTap={this._handleDiaglogTouchTap}>
                <FontIcon style={styles.exampleFlatButtonIcon} className="material-icons">grade</FontIcon>
              </FlatButton>
              <FlatButton label="Edit" onTouchTap={this._handleEditDiaglogTouchTap}>
                <FontIcon style={styles.exampleFlatButtonIcon} className="material-icons">create</FontIcon>
              </FlatButton>
            </div>
          </CardActions>
          <CardText expandable={true}>
            <TextField hintText="Any thought on this verse?" ref="newComment" fullWidth={true} multiLine={true} />
            <FlatButton label="Add Comment" secondary={true} onTouchTap={this._handleNewComment} />
            {this.renderComments()}
          </CardText>
        </Card>
        <Dialog
          ref="dialog"
          title={this.props.verse.title}
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}>

          <TextField hintText="please type verse to memorize ..." ref="textarea" multiLine={true} fullWidth={true} />
          <p>
            <span dangerouslySetInnerHTML={this.state.diff} />
          </p>
        </Dialog>
        <Dialog
          ref="editDialog"
          title="Edit Verse"
          actions={editActions}
          actionFocus="save"
          modal={this.state.eidtMode}>
          <TextField ref="title" hintText="Reference" defaultValue={this.props.verse.title} />
          <TextField ref="topic" hintText="Topic" style={{paddingLeft: '20px'}} defaultValue={this.props.verse.topic} />
          <br />
          <TextField ref="verseContent" multiLine={true} fullWidth={true} defaultValue={this.props.verse.content} />
        </Dialog>
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

  diffText(text1, text2) {
  	let dmp = new diff_match_patch();
  	let d = dmp.diff_main(text1, text2);
  	dmp.diff_cleanupSemantic(d);
  	return dmp.diff_prettyHtml(d);
  },

  updateStar() {
    Meteor.call('updateStar', this.props.verse._id);
  },

  removeVerse() {
    Meteor.call('removeVerse', this.props.verse._id);
  },

  updateVerse(title, topic, content) {
    Meteor.call('updateVerse', this.props.verse._id, title, topic, content);
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
  },

  /* memorized verse */
  _handleDiaglogTouchTap() {
    this.refs.dialog.show();
  },

  _onDialogSubmit() {
    let typedVerse = this.refs.textarea.getValue();
    if (typedVerse === this.props.verse.content) {
      this.updateStar();
      this.refs.dialog.dismiss();
    } else {
      let diff = this.diffText(typedVerse, this.props.verse.content);
      this.setState({diff: { __html: diff }});
    }
  },

  _onTryAgain() {
    this.refs.textarea.setValue('');
    this.setState({diff: { __html: ''}});
  },

  /* edit verse */
  _editDialogClose() {
    this.refs.editDialog.dismiss();
  },
  _handleEditDiaglogTouchTap() {
    this.refs.editDialog.show();
  },
  _onEditDialogSubmit() {
    let title = this.refs.title.getValue();
    let topic = this.refs.topic.getValue();
    let content = this.refs.verseContent.getValue();
    this.updateVerse(title, topic, content);
    this.refs.editDialog.dismiss();
  },
  _onDeleteVerse() {
    this.removeVerse();
    this.refs.editDialog.dismiss();
  }
});
