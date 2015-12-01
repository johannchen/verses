let {
  AppBar,
  IconButton,
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
  TableFooter
  } = MUI;

Admin = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let loaded = false;
    let currentUser = Meteor.user();
    if (currentUser && currentUser.profile.admin) {
      loaded = Meteor.subscribe('people').ready();
    }
    return {
      loaded,
      people: Meteor.users.find({}, {sort: {createdAt: -1}}).fetch(),
      headCount: Meteor.users.find().count()
    }
  },
  render() {
    return (
      <div>
      { this.data.loaded ?
        <div>
          <AppBar
            title={this.getTitle()}
            iconElementLeft={<IconButton iconClassName="zmdi zmdi-home" onTouchTap={this.goHome}></IconButton>} />
          <Table selectable={false}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Username</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Join At</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderPeople()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn colSpan="3">
                  {this.renderEmails()}
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        : ''
      }
      </div>
    )
  },

  renderPeople() {
    return this.data.people.map( (user) => {
      return <Person key={user._id} person={user} />
    });
  },

  renderEmails() {
    let emails = this.data.people.map( (user) => {
      return user.emails[0].address
    });
    return emails.join();
  },

  getTitle() {
    return `Admin (${this.data.headCount})`;
  },

  goHome() {
    FlowRouter.go('/');
  }
});
