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
        <div>
          {this.ga()}
        </div>
      </div>
    )
  },

  ga() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-70129235-1', 'auto');
    ga('send', 'pageview');
  }
});
