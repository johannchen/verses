let {
  AppBar,
  IconButton,
  LinearProgress,
  FlatButton } = MUI;

PartnerVerses = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let partnerId = this.props.partner.id;
    let query = {owner: partnerId};
    let startOfWeek = moment().startOf('week').valueOf();
    let pointQuery = {
      owner: partnerId,
      lastStarAt: {$gte: startOfWeek}
    };

    var versesHandle = Meteor.subscribe('verses', partnerId);
    var data = {
      loaded: versesHandle.ready(),
      verses: Verses.find(query, {sort: {lastStarAt: -1, createdAt: -1}}).fetch(),
      pointsThisWeek: Verses.find(pointQuery).count()
    };

    var partnerHandle = Meteor.subscribe('partner');
    if(partnerHandle.ready()) {
      data.goal = Meteor.users.findOne(partnerId).profile.goal;
    }

    return data;
  },

  render() {
    return (
      <div>
        { this.data.loaded ?
          <div>
        <AppBar
          title={this.props.partner.username}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goMyVerses}>arrow_back</IconButton>} />
        <FlatButton label={this.goalDisplay()} disabled={true} />
        <LinearProgress mode="determinate" value={this.percentage()} size={3} />
        {this.renderVerses()}
        </div>
        : <p>Loading...</p>
        }
      </div>
    )
  },

  renderVerses() {
    return this.data.verses.map( (verse) => {
      return <Verse key={verse._id} verse={verse} partner={true} expanded={false} />;
    });
  },

  goalDisplay() {
    return `Weekly Goal: ${this.data.pointsThisWeek}/${this.data.goal}`;
  },

  percentage() {
    let percentage = 0;
    let stars = this.data.starThisWeek;
    if (stars) {
      percentage = Math.round(stars / this.data.goal * 100);
    }
    return percentage;
  },

  goMyVerses() {
    this.props.goBack();
  }

  
});
