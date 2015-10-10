let { Styles } = MUI;
let { ThemeManager, LightRawTheme, Colors} = Styles;

MainLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  render() {
    return (
      <main>
        {this.props.content()}
      </main>
    )
  }
});
