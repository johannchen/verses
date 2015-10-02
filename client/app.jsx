// let ThemeManager = new MUI.Styles.ThemeManager();

let {
  AppCanvas,
  AppBar,
  LinearProgress,
  Toolbar,
  ToolbarGroup,
  TextField,
  RaisedButton,
  FontIcon,
  DropDownMenu,
  Styles } = MUI;

let { ThemeManager, LightRawTheme, Colors } = Styles;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      //muiTheme: ThemeManager.getCurrentTheme()
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {};
    if (this.state.search) {
      q = new RegExp(this.state.search, 'i');
      query = { $or: [
        { title: q },
        { topic: q },
        { content: q}
      ]};
    }
    /*
    function() {
        let topicSet = new Set();
        let topicAll = Verses.find({}, {
          sort: {topic: 1}, fields: {topic: 1}
        }).fetch().map( (verse) => { return verse.topic; });
        topicAll.forEach( (topic) => {
          topicSet.add(topic);
        });
        return topicSet;
      }
      */
    return {
      verses: Verses.find(query, {sort: {createdAt: -1}}).fetch(),
      topics: Verses.find({}, {
          sort: {topic: 1}, fields: {topic: 1}
        }).fetch().map( (verse) => { return verse.topic; })
    };
  },

  getInitialState() {
    return {
      search: null
    };
  },

  render() {
    // get unique topics
    let topics = this.data.topics;
    var uniqueTopics = topics.filter( function(item, index) {
      return topics.indexOf(item) == index;
    });
    let topicItems = [];
    uniqueTopics.forEach( function(item, index) {
      if(item) {
        topicItems.push({payload: index, text: item});
      }
    });
    //let topics = [{payload: "1", text: "one"}, {payload: "2", text: "two"}];
    return (
      <AppCanvas>
        <AppBar
          title="Verses"
          iconElementRight={<TextField hintText="Search" ref="search" underlineFocusStyle={{borderColor: Colors.amber900}} onEnterKeyDown={this.handleSearch} />} />
        <br />
        <LinearProgress mode="determinate" value={60} />
        <br />
        <LinearProgress
          mode="determinate"
          value={40} />
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <TextField hintText="John 3:16" ref="title" />
            <TextField hintText="Topic" ref="topic" style={{paddingLeft: '15px'}} />
            <RaisedButton label="Add Verse" primary={true} onClick={this.handleNewVerse} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">

            { this.state.search ?
                <TextField hintText={this.state.search}  disabled={true} onClick={this.handleClearSearch} />
              : ''
            }
            <DropDownMenu menuItems={topicItems} />
          </ToolbarGroup>
        </Toolbar>
        {this.renderVerses()}
      </AppCanvas>
    );
  },

  renderVerses() {
    return this.data.verses.map( (verse) => {
      return <Verse key={verse._id} verse={verse} />;
    });
  },

  handleClearSearch() {
    this.setState({search: null});
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
    this.refs.search.setValue(null);
  },});
