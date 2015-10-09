let {AppBar, IconButton, TextField, FlatButton } = MUI;
Star = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      verse: Verses.findOne(this.props.verseId)
    }
  },

  getInitialState() {
    return {
      diff: { __html: ''}
    }
  },

  render() {
    return (
      <div>
        <AppBar
          title={this.data.verse.title}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.gotoVerse}>arrow_back</IconButton>}
        />
        <TextField hintText="please type verse to memorize ..." ref="textarea" multiLine={true} fullWidth={true} />
        <p>
          <span dangerouslySetInnerHTML={this.state.diff} />
        </p>
        <div>
          <FlatButton label="Submit" primary={true} onTouchTap={this.onSubmitVerse} />
          <FlatButton label="Try Again" secondary={true} onTouchTap={this.onTryAgain} />
        </div>
      </div>
    )
  },

  gotoVerse() {
    let path = `/verse/${this.props.verseId}`;
    FlowRouter.go(path);
  },

  diffText(text1, text2) {
  	let dmp = new diff_match_patch();
  	let d = dmp.diff_main(text1, text2);
  	dmp.diff_cleanupSemantic(d);
  	return dmp.diff_prettyHtml(d);
  },

  updateStar() {
    Meteor.call('updateStar', this.props.verseId);
  },

  onSubmitVerse() {
    let typedVerse = this.refs.textarea.getValue();
    if (typedVerse === this.data.verse.content) {
      this.updateStar();
      this.gotoVerse();
    } else {
      let diff = this.diffText(typedVerse, this.data.verse.content);
      this.setState({diff: { __html: diff }});
    }
  },

  onTryAgain() {
    this.refs.textarea.setValue('');
    this.setState({diff: { __html: ''}});
  }

});
