Session.setDefault('sortByPoint', false);

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
  Snackbar,
  Dialog} = MUI;
//let IconMenu = MUI.Libs.Menu;
let MenuItem = MUI.Libs.MenuItem;
let { Colors } = Styles;

MyVerses = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {

    var handle, partnerId, partnerGoal, partnerReward;
    if (this.props.currentUser.profile.partner || this.state.partner) {
      partnerId = this.props.currentUser.profile.partner.id;
      handle = Meteor.subscribe("verses", partnerId);
      var partnerHandle = Meteor.subscribe('partner');
      if(partnerHandle.ready()) {
        profile = Meteor.users.findOne(partnerId).profile;
        partnerGoal = profile.goal;
        partnerReward = profile.rewardPartner;
      }
    } else {
      handle = Meteor.subscribe("verses", null);
    }

    return {
      loaded: handle.ready(),
      verses: this.getMyVerses().fetch(),
      versesCount: this.getMyVerses().count(),
      pointsOfThisWeek: this.getPointsOfThisWeek(this.props.currentUser._id),
      partnerVerses: this.getPartnerVerses(),
      partnerVersesCount: this.getPartnerVersesCount(),
      partnerPointsOfThisWeek: this.getPointsOfThisWeek(partnerId),
      partnerGoal,
      partnerReward
    };
  },

  getMyVerses() {
    let query = {};
    if (this.state.search) {
      q = new RegExp(this.state.search, 'i');
      query = { $or: [
        { title: q },
        { topic: q },
        { content: q}
      ]};
    }
    let sort = {createdAt: -1};
    if (Session.get('sortByPoint')) { sort = {lastPointAt: -1}; }
    query.owner = this.props.currentUser._id;
    return Verses.find(query, {sort: sort});
  },

  getPointsOfThisWeek(id) {
    let startOfWeek = moment().startOf('week').valueOf();
    let pointQuery = {
      owner: id,
      lastPointAt: {$gte: startOfWeek}
    };
    return Verses.find(pointQuery).count();
  },

  getPartnerVerses() {
    if (this.props.currentUser.profile.partner) {
      return Verses.find({owner: this.props.currentUser.profile.partner.id}, {sort: {lastPointAt: -1, createdAt: -1}}).fetch();
    }
  },

  getPartnerVersesCount() {
    if (this.props.currentUser.profile.partner) {
      return Verses.find({owner: this.props.currentUser.profile.partner.id}).count();
    }
  },

  getInitialState() {
    return {
      search: null,
      sortMessage: '',
      showSearchField: false,
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
          <PartnerVerses verses={this.data.partnerVerses}
            versesCount={this.data.partnerVersesCount}
            points={this.data.partnerPointsOfThisWeek}
            goal={this.data.partnerGoal}
            username={this.props.currentUser.profile.partner.username}
            goBack={this.goMyVerses} />
        </div>
      :
      <div>
        <AppBar
          title={this.getTitle()}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.showNewVerseDialog}>add</IconButton>}
          iconElementRight={
            <div>
              <IconButton onTouchTap={this.toggleSort}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>sort</FontIcon>
              </IconButton>
              <IconButton onTouchTap={this.toggleSearchField}>
                <FontIcon
                  className="material-icons"
                  color={Colors.grey50}>search</FontIcon>
              </IconButton>
              { this.state.showSearchField ?
                <TextField hintText="Search"
                  ref="search"
                  underlineFocusStyle={{borderColor: Colors.amber900}}
                  style={{width: '100px'}}
                  onEnterKeyDown={this.handleSearch} />
                : ''
              }
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <FontIcon className="material-icons" color={Colors.grey50}>more_vert</FontIcon>
                  </IconButton>
                }>
                { this.props.currentUser.profile.partner ?
                  <span>
                    <MenuItem primaryText={this.props.currentUser.profile.partner.username} onTouchTap={this.showPartner}/>
                    <MenuItem primaryText="Remove Partner" onTouchTap={this.removePartner}/>
                  </span>
                : <MenuItem primaryText="Add Partner" onTouchTap={this.showPartnerDialog} />
                }
                <MenuItem primaryText="Set Goal" onTouchTap={this.showGoalDialog} />
                <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignOut} />
              </IconMenu>
            </div>
          } />
        { this.data.loaded ?
          <div>
            { this.props.currentUser.profile.partner ?
              <Goal points={this.data.partnerPointsOfThisWeek}
                goal={this.data.partnerGoal}
                partner={this.props.currentUser.profile.partner.username}
                reward={this.data.partnerReward}
                 />
              : ''
            }
            <Goal points={this.data.pointsOfThisWeek}
              goal={this.props.currentUser.profile.goal}
              reward={this.props.currentUser.profile.rewardPartner}
              />
            {this.renderVerses()}
          </div>
          :
          <p>Loading</p>
        }

        <Snackbar
          ref="sortIndicator"
          message={this.state.sortMessage}
          autoHideDuration={2000} />

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
          <br />
          { this.props.currentUser.profile.partner ?
            <TextField hintText="reward your partner (e.g. 10 min massage)"
              ref="reward"
              defaultValue={this.props.currentUser.profile.rewardPartner} />
            : ''
          }
        </Dialog>
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

    return books.map( (book, index) => {
      return <option value={book} key={index} />
    });
  },

  renderVerses() {
    return this.data.verses.map( (verse) => {
      return <Verse key={verse._id} verse={verse} partner={false} expanded={false} />;
    });
  },

  getTitle() {
    return `${this.data.versesCount} ${this.props.currentUser.username}`;
  },
  goMyVerses() {
    this.setState({partner: false});
  },

  handleSignOut() {
    Meteor.logout();
  },

  toggleSort() {
    if (Session.get('sortByPoint')) {
      this.setState({sortMessage: "Sort By Entered Date"});
    } else {
      this.setState({sortMessage: "Sort By Most Recent Memorized"});
    }
    Session.set('sortByPoint', !Session.get('sortByPoint'));
    this.refs.sortIndicator.show();
  },

  toggleSearchField() {
    this.setState({showSearchField: !this.state.showSearchField});
    this.setState({search: null});
  },

  /* add partner */
  showPartnerDialog() {
    this.refs.partnerDialog.show();
  },

  handleAddPartner() {
    Meteor.call('addPartner', this.refs.partner.getValue(), (err, result) => {
      if (err) {
        this.refs.partner.setErrorText("Sorry, there is problem adding this partner.");
      } else if (! result) {
        this.refs.partner.setErrorText("Sorry, this partner is not available.");
      } else {
        this.refs.partnerDialog.dismiss();
      }
    });
  },

  showPartner() {
    this.setState({partner: true});
  },
  removePartner() {
    if (confirm("Are you sure to remove your partner?")) {
      Meteor.call("removePartner", this.props.currentUser.profile.partner.id);
    }
  },
  /* set goal */
  showGoalDialog() {
    this.refs.goalDialog.show();
  },

  handleSetGoal() {
    let reward = '';
    if (this.refs.reward) { reward = this.refs.reward.getValue();}
    Meteor.call('setGoal', this.refs.goal.getValue(), reward );
    this.refs.goalDialog.dismiss();
  },

  /* add verse */
  showNewVerseDialog() {
    this.refs.newVerseDialog.show();
  },

  handleAddVerse() {
    let title = this.refs.title.getValue();
    if (Verses.findOne({title: title, owner: this.props.currentUser._id})) {
      this.refs.title.setErrorText('this verse already exists!');
    } else {
      let topic = this.refs.topic.getValue();
      Meteor.call("getESV", title, (err, res) => {
  			var content = res.content.trim().replace(/\s+/g, ' ');
        Meteor.call('addVerse', title, topic, content);
      });
      this.refs.title.setValue('');
      this.refs.topic.setValue('');
      this.refs.newVerseDialog.dismiss();
    }
  },

  handleSearch() {
    this.setState({search: this.refs.search.getValue()});
  }
});
