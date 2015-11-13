let { AppBar, IconButton, FontIcon, Card, CardText, CardActions, TextField, FlatButton, RaisedButton, CircularProgress } = MUI;

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
              iconElementLeft={<IconButton iconClassName="zmdi zmdi-keyboard" onTouchTap={this.goPoint}></IconButton>}
              iconElementRight={
                <IconButton onTouchTap={this.goHome}>
                  <FontIcon className="zmdi zmdi-home"></FontIcon>
                </IconButton>
              }
            />
            <Verse verse={this.data.verse} expanded={true} />
          </div>
        :
          <CircularProgress mode="indeterminate" size={2} />
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
