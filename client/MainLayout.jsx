let { Styles } = MUI;
let { ThemeManager, LightRawTheme } = Styles;

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
      <div>
        <head>
          <title>verses</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <main>
          {this.props.content()}
        </main>
      </div>
    )
  }
});
