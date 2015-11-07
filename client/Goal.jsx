let { FlatButton, LinearProgress } = MUI;
Goal = React.createClass({
  render() {
    return (
      <div>
        <FlatButton label={this.goalDisplay()} disabled={true} />
        <LinearProgress mode="determinate" value={this.percentage()} size={3} />
      </div>
    )
  },

  goalDisplay() {
    let who = "My";
    if (this.props.partner) { who = this.props.partner;}
    var goal = `${who} Weekly Goal: ${this.props.points}/${this.props.goal}`;
    let reward = "";
    if (this.props.reward) { reward = `Reward Partner: ${this.props.reward}`; }
    return `${goal} ${reward}`
  },

  percentage() {
    let percentage = 0;
    if (this.props.points) {
      percentage = Math.round(this.props.points / this.props.goal * 100);
    }
    return percentage;
  },


});
