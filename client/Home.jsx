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
  Styles,
  Dialog} = MUI;
//let IconMenu = MUI.Libs.Menu;
let MenuItem = MUI.Libs.MenuItem;
let { Colors } = Styles;

Home = React.createClass({
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

    let startOfWeek = moment().startOf('week').valueOf();

    return {
      verses: Verses.find(query, {sort: {lastStarAt: -1, createdAt: -1}}).fetch(),
      currentUser: Meteor.user(),
      starThisWeek: Verses.find({lastStarAt: {$gte: startOfWeek}}).count()
    };
  },

  getInitialState() {
    return {
      search: null,
      signin: true,
      modal: false,
      goalModal: false
    };
  },

  render() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Add Verse', onTouchTap: this.handleAddVerse, ref: 'submit' }
    ];
    let goalActions = [
      { text: 'Cancel' },
      { text: 'Set Goal', onTouchTap: this.handleSetGoal, ref: 'setGoal' }
    ];
    return (
      <AppCanvas>
        {this.data.currentUser ?
        <AppBar
          title={this.title()}
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
                <MenuItem primaryText="Set Goal" onTouchTap={this.showGoalDialog} />
                <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignOut} />
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
            <FlatButton label={this.goalDisplay()} disabled={true} />
            <LinearProgress mode="determinate" value={this.percentage()} size={3} />
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
            <Dialog
              ref="goalDialog"
              title="Set Weekly Goal"
              actions={goalActions}
              actionFocus="setGoal"
              modal={this.state.goalModal}>
              <TextField
                type="number" min="1" max="20"
                style={{width: '50px'}}
                ref="goal"
                defaultValue={this.data.currentUser.profile.goal}/>
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

  title() {
    //TODO: avatar, switch username
    return this.data.currentUser.username;
  },

  goalDisplay() {
    return `Weekly Goal: ${this.data.starThisWeek}/${this.data.currentUser.profile.goal}`;
  },

  percentage() {
    let percentage = 0;
    let stars = this.data.starThisWeek;
    if (stars) {
      percentage = Math.round(stars / this.data.currentUser.profile.goal * 100);
    }
    return percentage;
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
      return <Verse key={verse._id} verse={verse} expanded={false} />;
    });
  },

  handleClearSearch() {
    this.setState({search: null});
    this.refs.search.setValue('');
  },

  /* set goal */
  showGoalDialog() {
    this.refs.goalDialog.show();
  },

  handleSetGoal() {
    Meteor.call('setGoal', this.refs.goal.getValue());
    this.refs.goalDialog.dismiss();
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
