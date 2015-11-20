let { AppBar, IconButton, Card, CardText, CardActions, TextField, FlatButton, FontIcon, CircularProgress, Styles } = MUI;
let { Colors } = Styles;

Point = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: FlowRouter.subsReady('verse'),
      verse: Verses.findOne()
    };
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
        { this.data.loaded ?
          <div>
            <AppBar
              title=""
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-eye" onTouchTap={this.goVerse}></IconButton>}
              iconElementRight={
                <div>
                  <IconButton onTouchTap={this.goSentence}>
                    <FontIcon className="zmdi zmdi-keyboard" color={Colors.grey50}></FontIcon>
                  </IconButton>
                  <IconButton onTouchTap={this.goLetter}>
                    <FontIcon className="zmdi zmdi-text-format" color={Colors.grey50}></FontIcon>
                  </IconButton>
                  <IconButton onTouchTap={this.goWord}>
                    <FontIcon className="zmdi zmdi-parking" color={Colors.grey50}></FontIcon>
                  </IconButton>
                  <IconButton onTouchTap={this.goHome}>
                    <FontIcon className="zmdi zmdi-home" color={Colors.grey50}></FontIcon>
                  </IconButton>
                </div>
              }
              />
            { (() => {
              switch (this.state.action) {
                case "letter": return <LetterPoint verse={this.data.verse} />;
                case "word": return <Practice verse={this.data.verse} />;
                default: return (
                  <Card>
                    <CardText>
                      <TextField hintText="please type verse to memorize" ref="textarea" multiLine={true} fullWidth={true} autoFocus={true} />
                      <p>
                        <span dangerouslySetInnerHTML={this.state.diff} />
                      </p>
                    </CardText>
                    <CardActions>
                      <FlatButton label="Submit" primary={true} onTouchTap={this.onSubmitVerse} />
                      <FlatButton label="Try Again" onTouchTap={this.onTryAgain} />
                    </CardActions>
                  </Card>
                )
              }
            })()
          }
          </div>
        :
          <CircularProgress mode="indeterminate" size={2} />
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

  updatePoint() {
    Meteor.call('updatePoint', this.props.verseId);
  },

  onSubmitVerse() {
    let typedVerse = this.refs.textarea.getValue();
    let verse = `${this.data.verse.content} ${this.data.verse.title}`;
    if (typedVerse === verse) {
      this.updatePoint();
      this.goVerse();
    } else {
      let diff = this.diffText(typedVerse, verse);
      this.setState({diff: { __html: diff }});
    }
  },

  onTryAgain() {
    this.refs.textarea.setValue('');
    this.refs.textarea.focus();
    this.setState({diff: { __html: ''}});
  }
});
