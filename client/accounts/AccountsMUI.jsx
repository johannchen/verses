AccountsMUI = React.createClass({
  render() {
    if (this.props.page === "signin") {
      return <Login />;
    } else if (this.props.page === "signup") {
      return <Signup />;
    }
  }

})
