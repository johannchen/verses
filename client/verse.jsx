var { Card, CardTitle, CardText, CardActions, FlatButton } = MUI;
Verse = React.createClass({
  render() {
    return (
      <Card initiallyExpanded={true} className="verse">
        <CardTitle
          title={this.props.verse.title}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.props.verse.content}
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Note"/>
          <FlatButton label="Memorize"/>
        </CardActions>
      </Card>
    )
  }
});
