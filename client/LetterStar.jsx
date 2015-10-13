let { Card, CardText, TextField } = MUI;

LetterStar = React.createClass({
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
          <TextField hintText="first letter" ref="letter" onChange={this.handleNextWord}/>
        </CardText>
      </Card>
    )
  },

  updateStar() {
    Meteor.call('updateStar', this.props.verse._id);
  },

  goVerse() {
    FlowRouter.go(`/verse/${this.props.verse._id}`);
  },

  handleNextWord(event) {
    const verseString = `${this.props.verse.content} ${this.props.verse.title}`;
    const verseArray = verseString.split(" ");
    let letter = event.target.value.toLowerCase();
    let firstLetter = verseArray[this.state.index][0].toLowerCase();
    if (letter === firstLetter) {
      let index = this.state.index + 1;
      let words = verseArray.slice(0, index).join(" ");
      this.setState({words: words, index: index});
      if (index === verseArray.length) {
        this.updateStar();
        this.goVerse();
      }
    } else {
      this.refs.letter.setErrorText("incorrect!");
    }
    this.refs.letter.setValue('');
  }
});
