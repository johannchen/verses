let { Card, CardText, CardActions, FlatButton } = MUI;

Practice = React.createClass({
  getInitialState() {
    return {
      words: '',
      index: 1,
      done: false
    }
  },

  render() {
    return (
      <Card>
        <CardText>
          <p>{this.state.words}</p>
        </CardText>
        <CardActions>
          { this.state.done ?
            <FlatButton label="Done!" disabled={true} />
          : <FlatButton label="Next Word" primary={true} onTouchTap={this.handleNextWord} />
          }
          <FlatButton label="Reset" onTouchTap={this.handleReset} />
        </CardActions>
      </Card>
    )
  },

  handleNextWord() {
    const verseString = `${this.props.verse.content} ${this.props.verse.title}`;
    const verseArray = verseString.split(/\s+/);
    let words = verseArray.slice(0, this.state.index).join(" ");
    let index = this.state.index + 1;
    if (index === verseArray.length + 1) {
      this.setState({done: true});
    }
    this.setState({words: words, index: index});
  },

  handleReset() {
    this.setState({words: '', index: 1, done: false});
  }
});
