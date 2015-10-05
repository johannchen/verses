// let ThemeManager = new MUI.Styles.ThemeManager();

let {
  AppCanvas,
  AppBar,
  ToolbarSeparator,
  LinearProgress,
  Toolbar,
  ToolbarGroup,
  TextField,
  RaisedButton,
  FlatButton,
  FontIcon,
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

    return {
      verses: Verses.find(query, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
      /*
      topics: Verses.find({}, {
          sort: {topic: 1}, fields: {topic: 1}
        }).fetch().map( (verse) => { return verse.topic; })
        */
    };
  },

  getInitialState() {
    return {
      search: null,
      auth: "signin"
    };
  },

  render() {
    /* get unique topics
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
    */
    return (
      <AppCanvas>
        <AppBar
          title="Verses"
          iconElementRight={this.data.currentUser ?
            <div>
              <RaisedButton label="Sign Out" onTouchTap={this.handleSignOut}/>
            </div>
            :
            <div>
              <RaisedButton label="Sign Up" onTouchTap={this.handleSignUp}  />
              <ToolbarSeparator />
              <RaisedButton label="Sign In" onTouchTap={this.handleSignIn}  />
            </div>} />
        <div style={{paddingTop: '80px'}}>
        { this.data.currentUser ?
          <div>
            <div className="tool-bar">
              <Toolbar>
                <ToolbarGroup key={0} float="left">
                  <TextField hintText="Search" ref="search" underlineFocusStyle={{borderColor: Colors.amber900}} onEnterKeyDown={this.handleSearch} />
                  { this.state.search ?
                      <TextField hintText={this.state.search}  disabled={true} onClick={this.handleClearSearch} />
                    : ''
                  }
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                  <TextField hintText="John 3:16" ref="title" list="books" />
                  <TextField hintText="Topic" ref="topic" style={{paddingLeft: '15px'}} />
                  <RaisedButton label="Add Verse" secondary={true} style={{float: 'right'}}  onClick={this.handleNewVerse} />
                </ToolbarGroup>
              </Toolbar>
            </div>
            <datalist id="books">
              {this.renderBookList()}
            </datalist>
            <div className="verses">
              {this.renderVerses()}
            </div>
          </div>
          : <AccountsMUI page={this.state.auth} />
        }
        </div>
      </AppCanvas>
    );
  },

  handleSignIn() {
    this.setState({auth: "signin"});
  },
  handleSignUp() {
    this.setState({auth: "signup"});
  },
  handleSignOut() {
    Meteor.logout();
  },

  renderBookList() {
    const books = [
			"Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
		  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
			"1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
		  "Ezra", "Nehemiah", "Esther",
		  "Job", "Psalm", "Proverbs", "Ecclesiastes", "Song of Songs",
		  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
		  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
		  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
		  "Matthew", "Mark", "Luke", "John", "Acts",
		  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
		  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
		  "1 Timothy", "2 Timothy", "Titus", "Philemon",
		  "Hebrews", "James", "1 Peter", "2 Peter",
		  "1 John", "2 John", "3 John", "Jude", "Revelation"
  	];

    return books.map( (book) => {
      return <option value={book} />
    });
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
    let title = this.refs.title.getValue();
    if (title) {
      var topic = this.refs.topic.getValue();
      Meteor.call("getESV", title, (err, res) => {
        //TODO: check error
  			var content = res.content.trim().replace(/\s{2,}/g, ' ');
        Meteor.call('addVerse', title, topic, content);
      });
      //React.findDOMNode(this.refs.title).value = '';
      this.refs.title.setValue('');
      this.refs.topic.setValue('');
    } else {
      this.refs.title.setErrorText('this field is required');
    }
  },

  handleSearch() {
    this.setState({search: this.refs.search.getValue()});
    this.refs.search.setValue(null);
  },});
