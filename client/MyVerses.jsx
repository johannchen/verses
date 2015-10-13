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

MyVerses = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {owner: this.props.currentUser._id};
    if (this.state.search) {
      q = new RegExp(this.state.search, 'i');
      query = { $or: [
        { title: q },
        { topic: q },
        { content: q}
      ]};
    }

    let startOfWeek = moment().startOf('week').valueOf();
    let pointQuery = {
      owner: this.props.currentUser._id,
      lastStarAt: {$gte: startOfWeek}
    };


    return {
      verses: Verses.find(query, {sort: {lastStarAt: -1, createdAt: -1}}).fetch(),
      starThisWeek: Verses.find(pointQuery).count()
    };
  },

  getInitialState() {
    return {
      search: null,
      verseModal: false,
      partnerModal: false,
      goalModal: false,
      partner: false
    };
  },

  render() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Add Verse', onTouchTap: this.handleAddVerse, ref: 'submit' }
    ];
    let partnerActions = [
      { text: 'Cancel' },
      { text: 'Add Partner', onTouchTap: this.handleAddPartner, ref: 'addPartner' }
    ];
    let goalActions = [
      { text: 'Cancel' },
      { text: 'Set Goal', onTouchTap: this.handleSetGoal, ref: 'setGoal' }
    ];
    return (
      <div>
      { this.state.partner ?
        <div>
          <PartnerVerses partner={this.props.currentUser.profile.partner} goBack={this.goMyVerses}/>
        </div>
      :
      <div>
        <AppBar
          title={this.props.currentUser.username}
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
                { this.props.currentUser.profile.partner ?
                  <MenuItem primaryText={this.props.currentUser.profile.partner.username} onTouchTap={this.showPartner}/>
                : <MenuItem primaryText="Add Partner" onTouchTap={this.showPartnerDialog} />
                }
                <MenuItem primaryText="Set Goal" onTouchTap={this.showGoalDialog} />
                <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignOut} />
              </IconMenu>
            </div>
          } />
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
          modal={this.state.verseModal}>
          <TextField hintText="John 3:16" ref="title" list="books" />
          <br />
          <TextField hintText="Topic" ref="topic" />
        </Dialog>
        <Dialog
          ref="partnerDialog"
          title="Add Accountability Partner"
          actions={partnerActions}
          actionFocus="addPartner"
          modal={this.state.partnerModal}>
          <TextField hintText="partner's username" ref="partner" />
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
            defaultValue={this.props.currentUser.profile.goal}/>
        </Dialog>
        {this.renderVerses()}
      </div>
      }
    </div>
    )
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
      return <Verse key={verse._id} verse={verse} partner={false} expanded={false} />;
    });
  },

  goalDisplay() {
    return `Weekly Goal: ${this.data.starThisWeek}/${this.props.currentUser.profile.goal}`;
  },

  percentage() {
    let percentage = 0;
    let stars = this.data.starThisWeek;
    if (stars) {
      percentage = Math.round(stars / this.props.currentUser.profile.goal * 100);
    }
    return percentage;
  },

  goMyVerses() {
    this.setState({partner: false});
  },
  handleSignOut() {
    Meteor.logout();
  },


  handleClearSearch() {
    this.setState({search: null});
    this.refs.search.setValue('');
  },

  /* add partner */
  showPartnerDialog() {
    this.refs.partnerDialog.show();
  },

  handleAddPartner() {
    console.log(this.refs.partner.getValue());
    Meteor.call('addPartner', this.refs.partner.getValue());
    this.refs.partnerDialog.dismiss();
  },

  showPartner() {
    this.setState({partner: true});
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
