
let { AppBar, IconButton, FontIcon, Card, CardText, CardActions, TextField, FlatButton, RaisedButton } = MUI;

VerseEdit = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      //loaded: FlowRouter.subsReady('verse'),
      verse: Verses.findOne(this.props.verseId)
    }
  },

  render() {
    return (
      <div>
        { this.data.verse ?
        <div>
          <AppBar
            title={this.data.verse.title}
            iconElementLeft={<IconButton iconClassName="zmdi zmdi-arrow-left" onTouchTap={this.goVerse}></IconButton>}
            iconElementRight={
              <IconButton onTouchTap={this.goHome}>
                <FontIcon className="zmdi zmdi-home"></FontIcon>
              </IconButton>
            }
          />
          <Card>
            <CardText>
              <TextField ref="title" hintText="Reference" defaultValue={this.data.verse.title} />
              <TextField ref="topic" hintText="Topic" style={{paddingLeft: '20px'}} defaultValue={this.data.verse.topic} />
              <br />
              <TextField ref="verseContent" multiLine={true} fullWidth={true} defaultValue={this.data.verse.content} />
            </CardText>
            <CardActions>
              <RaisedButton label="Save" primary={true} onTouchTap={this.handleSave} />
              <FlatButton label="Delete" primary={true} onTouchTap={this.handleDelete} />
            </CardActions>
          </Card>
        </div>
        : "Loading"}
      </div>

    )
  },

  goHome() {
    FlowRouter.go('/');
  },

  goVerse() {
    FlowRouter.go(`/verse/${this.props.verseId}`);
  },

  removeVerse() {
    Meteor.call('removeVerse', this.props.verseId);
  },

  updateVerse(title, topic, content) {
    Meteor.call('updateVerse', this.props.verseId, title, topic, content);
  },

  handleSave() {
    let title = this.refs.title.getValue();
    let topic = this.refs.topic.getValue();
    let content = this.refs.verseContent.getValue();
    this.updateVerse(title, topic, content);
    this.goVerse();
  },
  handleDelete() {
    if (confirm("Are you sure to delete this verse?")) {
      this.removeVerse();
      this.goHome();
    }
  }
});
