let {
  AppBar,
  IconButton,
  FlatButton } = MUI;

PartnerVerses = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          title={this.getTitle()}
          iconElementLeft={<IconButton iconClassName="material-icons" onTouchTap={this.goMyVerses}>arrow_back</IconButton>} />
        <Goal points={this.props.points} goal={this.props.goal} partner={this.props.username} />
        {this.renderVerses()}
      </div>
    )
  },

  renderVerses() {
    return this.props.verses.map( (verse) => {
      return <Verse key={verse._id} verse={verse} partner={true} expanded={true} />;
    });
  },

  getTitle() {
    return `${this.props.versesCount} ${this.props.username}`;
  },

  goMyVerses() {
    this.props.goBack();
  }
});
