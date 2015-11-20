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
          iconElementLeft={<IconButton iconClassName="zmdi zmdi-arrow-left" onTouchTap={this.goMyVerses}></IconButton>} />
        <div style={{paddingTop: '5px'}}>
          <Goal points={this.props.points} goal={this.props.goal} reward={this.props.reward} partner={this.props.username} />
          {this.renderVerses()}
        </div>
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
