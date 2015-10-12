let { AppBar, IconButton, Card, CardText, CardActions, TextField, FlatButton, FontIcon, Styles } = MUI;
let { Colors } = Styles;

Star = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      verse: Verses.findOne(this.props.verseId)
    }
  },

  getInitialState() {
    return {
      action: 'sentence',
      diff: { __html: ''}
    }
  },

  render() {
    return (
      <div>
        <AppBar
          title={this.data.verse.title}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goVerse}>arrow_back</IconButton>}
          iconElementRight={
            <div>
              <IconButton onTouchTap={this.goSentence}>
                <FontIcon className="material-icons" color={Colors.grey50}>keyboard</FontIcon>
              </IconButton>
              <IconButton onTouchTap={this.goLetter}>
                <FontIcon className="material-icons" color={Colors.grey50}>text_format</FontIcon>
              </IconButton>
              <IconButton onTouchTap={this.goWord}>
                <FontIcon className="material-icons" color={Colors.grey50}>subject</FontIcon>
              </IconButton>
              <IconButton onTouchTap={this.goHome}>
                <FontIcon className="material-icons" color={Colors.grey50}>home</FontIcon>
              </IconButton>
            </div>
          }
        />
      { (() => {
          switch (this.state.action) {
            case "letter": return <LetterStar verse={this.data.verse} />;
            case "word": return <Practice verse={this.data.verse} />;
            default: return (
              <Card>
                <CardText>
                  <TextField hintText="please type verse to memorize" ref="textarea" multiLine={true} fullWidth={true} />
                  <p>
                    <strong>{this.data.verse.title}</strong><br />
                    <span dangerouslySetInnerHTML={this.state.diff} />
                  </p>
                </CardText>
                <CardActions>
                  <FlatButton label="Submit" primary={true} onTouchTap={this.onSubmitVerse} />
                  <FlatButton label="Try Again" secondary={true} onTouchTap={this.onTryAgain} />
                </CardActions>
              </Card>
            )
          }
        })()
      }
      </div>
    )
  },

  goWord() {
    this.setState({action: 'word'});
  },

  goLetter() {
    this.setState({action: 'letter'});
  },

  goSentence() {
    this.setState({action: 'sentence'});
  },

  goVerse() {
    FlowRouter.go(`/verse/${this.props.verseId}`);
  },

  goHome() {
    FlowRouter.go('/');
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
