AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.atForm,
      React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    return <span ref="container" />;
  }
});
