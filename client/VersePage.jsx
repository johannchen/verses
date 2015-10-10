let { AppBar, IconButton, FontIcon, Card, CardText, CardActions, TextField, FlatButton, RaisedButton, Styles } = MUI;
let { Colors } = Styles;

VersePage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      verse: Verses.findOne(this.props.verseId)
    }
  },

  getInitialState() {
    return {
      editMode: false
    }
  },

  render() {
    return (
      <div>
        <AppBar
          title={this.data.verse.title}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.gotoStar}>arrow_back</IconButton>}
          iconElementRight={
            <div>
              <IconButton onTouchTap={this.handleEditMode}>
                <FontIcon className="material-icons" color={Colors.grey50}>edit</FontIcon>
              </IconButton>
              <IconButton onTouchTap={this.goHome}>
                <FontIcon className="material-icons" color={Colors.grey50}>home</FontIcon>
              </IconButton>
            </div>
          }
        />
      { this.state.editMode ?
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
            <FlatButton label="Cancel" onTouchTap={this.handleCancelEdit} />
          </CardActions>
        </Card>
      : <Verse verse={this.data.verse} expanded={true} />
      }
      </div>
    )
  },

  goHome() {
    FlowRouter.go('/');
  },

  gotoStar() {
    let starPath = `/star/${this.props.verseId}`;
    FlowRouter.go(starPath);
  },

  removeVerse() {
    Meteor.call('removeVerse', this.props.verseId);
  },

  updateVerse(title, topic, content) {
    Meteor.call('updateVerse', this.props.verseId, title, topic, content);
  },

  /* edit verse */
  handleEditMode() {
    this.setState({editMode: true})
  },
  handleCancelEdit() {
    this.setState({editMode: false})
  },
  handleSave() {
    let title = this.refs.title.getValue();
    let topic = this.refs.topic.getValue();
    let content = this.refs.verseContent.getValue();
    this.updateVerse(title, topic, content);
    this.setState({editMode: false})
  },
  handleDelete() {
    this.removeVerse();
    this.goHome();
  }
});
