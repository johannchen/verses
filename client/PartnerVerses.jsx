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
      lastPointAt: {$gte: startOfWeek}
    };

    var versesHandle = Meteor.subscribe('verses', partnerId);
    var data = {
      loaded: versesHandle.ready(),
      verses: Verses.find(query, {sort: {lastPointAt: -1, createdAt: -1}}).fetch(),
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
            <Goal points={this.data.pointsThisWeek} goal={this.data.goal} partner={this.props.partner.username} />
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

  goMyVerses() {
    this.props.goBack();
  }
});
