// let ThemeManager = new MUI.Styles.ThemeManager();

let {
  AppCanvas,
  AppBar,
  IconMenu,
  FloatingActionButton,
  FontIcon,
  IconButton,
  ToolbarSeparator,
  LinearProgress,
  TextField,
  RaisedButton,
  FlatButton,
  Dialog,
  Styles } = MUI;
//let IconMenu = MUI.Libs.Menu;
let MenuItem = MUI.Libs.MenuItem;
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
      signin: true
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
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Add Verse', onTouchTap: this.handleAddVerse, ref: 'submit' }
    ];
    let menuItems = [];
    if (this.data.currentUser) {
      menuItems = [
        { payload: '0', text: this.data.currentUser.username },
        { payload: '1', text: "Sign Out" },
        { payload: '2', text: "another user" }
      ];
    }

    return (
      <AppCanvas>
        {this.data.currentUser ?
        <AppBar
          title={this.data.currentUser.username}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.showNewVerseDialog}>add</IconButton>}
          iconElementRight={
            <div>
              <FontIcon
                className="material-icons"
                onTouchTap={this.handleClearSearch}
                color={Colors.grey50}>search</FontIcon>
              <TextField hintText="Search"
                ref="search"
                underlineFocusStyle={{borderColor: Colors.amber900}}
                style={{width: '100px'}}
                onEnterKeyDown={this.handleSearch} />
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <FontIcon className="material-icons" color={Colors.grey50}>more_vert</FontIcon>
                  </IconButton>
                }>
                <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut} />
              </IconMenu>
            </div>
          } />
        :
        <AppBar
          title="Verses"
          iconElementRight={
            <div>
              <RaisedButton label="Sign Up" primary={true} onTouchTap={this.handleSignUp}  />
              <ToolbarSeparator />
              <RaisedButton label="Sign In" onTouchTap={this.handleSignIn}  />
            </div>
          } />
        }
        <div className="container" style={{paddingTop: '80px'}}>
        { this.data.currentUser ?
          <div>
            <datalist id="books">
              {this.renderBookList()}
            </datalist>
            <Dialog
              ref="newVerseDialog"
              title="New Verse"
              actions={standardActions}
              actionFocus="submit"
              modal={this.state.modal}>
              <TextField hintText="John 3:16" ref="title" list="books" />
              <br />
              <TextField hintText="Topic" ref="topic" />
            </Dialog>

            {this.renderVerses()}
          </div>
          :
          <div className="row center-xs">
            <div className="col-xs-8">
              <AccountsMUI signin={this.state.signin} />
            </div>
          </div>
        }
        </div>
      </AppCanvas>
    );
  },

  handleSelectMenu(e, index, menuItem) {
    if (menuItem.text === "Sign Out") {
      this.handleSignOut();
    }
  },
  handleSignIn() {
    this.setState({signin: true});
  },
  handleSignUp() {
    this.setState({signin: false});
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
    this.refs.search.setValue('');
  },
  /* add verse */
  showNewVerseDialog() {
    this.refs.newVerseDialog.show();
  },
  handleAddVerse() {
    //TODO handle style on required field
    let title = this.refs.title.getValue();
    let topic = this.refs.topic.getValue();
    Meteor.call("getESV", title, (err, res) => {
      //TODO: check error
			var content = res.content.trim().replace(/\s{2,}/g, ' ');
      Meteor.call('addVerse', title, topic, content);
    });
    //React.findDOMNode(this.refs.title).value = '';
    this.refs.title.setValue('');
    this.refs.topic.setValue('');
    this.refs.newVerseDialog.dismiss();
  },

  handleSearch() {
    this.setState({search: this.refs.search.getValue()});
  }
});
