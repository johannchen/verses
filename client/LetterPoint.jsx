let { Card, CardText, TextField, FlatButton } = MUI;

LetterPoint = React.createClass({
  getInitialState() {
    return {
      words: '',
      index: 0
    }
  },

  render() {
    return (
      <Card>
        <CardText>
          <p>{this.state.words}</p>
          <TextField hintText="first letter" ref="letter" style={{width: '100px'}} onChange={this.handleNextWord} autoFocus={true}/>
          <FlatButton label="Try Again" onTouchTap={this.tryAgain} />
        </CardText>
      </Card>
    )
  },

  updatePoint() {
    Meteor.call('updatePoint', this.props.verse._id);
  },

  goVerse() {
    FlowRouter.go(`/verse/${this.props.verse._id}`);
  },

  handleNextWord(event) {
    const verseString = `${this.props.verse.content} ${this.props.verse.title}`;
    const verseArray = verseString.split(/\s+/);
    let letter = event.target.value.toLowerCase();
    let firstLetter = verseArray[this.state.index][0].toLowerCase();
    // skip quotation mark, puntuation
    if (firstLetter === "\"" || firstLetter === "\'" || firstLetter === "(") {
      firstLetter = verseArray[this.state.index][1].toLowerCase();
    }
    if (letter === firstLetter) {
      let index = this.state.index + 1;
      let words = verseArray.slice(0, index).join(" ");
      this.setState({words: words, index: index});
      if (index === verseArray.length) {
        this.updatePoint();
        this.goVerse();
      }
    } else {
      this.refs.letter.setErrorText("incorrect!");
    }
    this.refs.letter.setValue('');
  },

  tryAgain() {
    this.setState({words: '', index: 0});
    this.refs.letter.focus();
  }
});
