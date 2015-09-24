var ThemeManager = new MUI.Styles.ThemeManager();

var { AppBar, LinearProgress } = MUI;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      verses: Verses.find().fetch()
    };
  },

  renderVerses() {
    return this.data.verses.map( (verse) => {
      return <Verse verse={verse} />;
    });
  },

  // TODO: how to override default style
  render() {
    return (
      <div>
        <AppBar
          title="Verses"
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <br />
        <LinearProgress mode="determinate" value={60} />
        <br />
        <LinearProgress
          mode="determinate"
          value={40} />
        <br />
        {this.renderVerses()}
      </div>
    );
  }
});
