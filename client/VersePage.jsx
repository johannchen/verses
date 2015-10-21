let { AppBar, IconButton, FontIcon, Card, CardText, CardActions, TextField, FlatButton, RaisedButton } = MUI;

VersePage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      loaded: FlowRouter.subsReady('verse'),
      verse: Verses.findOne()
    }
  },

  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
            <AppBar
              title={this.data.verse.title}
              iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goPoint}>keyboard</IconButton>}
              iconElementRight={
                <IconButton onTouchTap={this.goHome}>
                  <FontIcon className="material-icons">home</FontIcon>
                </IconButton>
              }
            />
            <Verse verse={this.data.verse} expanded={true} />
          </div>
        : <p>Loading ...</p>
        }
      </div>
    )
  },

  goHome() {
    FlowRouter.go('/');
  },

  goPoint() {
    FlowRouter.go(`/point/${this.props.verseId}`);
  },

});
