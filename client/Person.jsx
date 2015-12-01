let {
  TableRow,
  TableRowColumn
  } = MUI;

Person = React.createClass({
  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.props.person.username}</TableRowColumn>
        <TableRowColumn>{this.props.person.emails[0].address}</TableRowColumn>
        <TableRowColumn>{this.props.person.createdAt.toString()}</TableRowColumn>
      </TableRow>
    )
  }
});
