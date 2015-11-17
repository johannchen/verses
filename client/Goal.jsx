let { FlatButton, FontIcon, LinearProgress } = MUI;
Goal = React.createClass({
  render() {
    return (
      <div>
        <FlatButton label={this.goalDisplay()} disabled={true} />
        <FlatButton label={this.props.reward} labelPosition="after" style={{float: 'right'}} disabled={true}>
          <FontIcon className="zmdi zmdi-favorite-outline" />
        </FlatButton>
        <LinearProgress mode="determinate" value={this.percentage()} size={3} />
      </div>
    )
  },

  goalDisplay() {
    let who = "My";
    if (this.props.partner) { who = this.props.partner;}
    return `${who} Weekly Goal: ${this.props.points}/${this.props.goal}`;
  },

  percentage() {
    let percentage = 0;
    if (this.props.points) {
      percentage = Math.round(this.props.points / this.props.goal * 100);
    }
    return percentage;
  },


});
