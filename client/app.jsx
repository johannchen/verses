var ThemeManager = new MUI.Styles.ThemeManager();

var { AppBar, LinearProgress, Toolbar, ToolbarGroup, TextField, RaisedButton } = MUI;

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
    let query = {};
    if (this.state.search) {
      query = { title: new RegExp(this.state.search, 'i') };
    }
    return {
      verses: Verses.find(query, {sort: {createdAt: -1}}).fetch()
    };
  },

  getInitialState() {
    return {
      search: null
    };
  },

  renderVerses() {
    return this.data.verses.map( (verse) => {
      return <Verse key={verse._id} verse={verse} />;
    });
  },

  handleNewVerse() {
    //event.preventDefault();
    //var title = React.findDOMNode(this.refs.title).value.trim();
    var title = this.refs.title.getValue();
    var topic = this.refs.topic.getValue();
    Meteor.call("getESV", title, (err, res) => {
      //TODO: check error
			var content = res.content.trim().replace(/\s{2,}/g, ' ');
      Meteor.call('addVerse', title, topic, content);
    });
    //React.findDOMNode(this.refs.title).value = '';
    this.refs.title.setValue('');
    this.refs.topic.setValue('');
  },

  handleSearch() {
    this.setState({search: this.refs.search.getValue()});
  },

  // TODO: how to override default style
  render() {
    return (
      <div>
        <AppBar
          title="Verses"
          iconElementRight={<TextField hintText="Search" ref="search" onEnterKeyDown={this.handleSearch} />} />
        <br />
        <LinearProgress mode="determinate" value={60} />
        <br />
        <LinearProgress
          mode="determinate"
          value={40} />
        <br />
          <TextField hintText="John 3:16" ref="title" />
          <TextField hintText="Topic" ref="topic"/>
          <RaisedButton label="Add Verse" primary={true} onClick={this.handleNewVerse} />
        {this.renderVerses()}
      </div>
    );
  }
});
