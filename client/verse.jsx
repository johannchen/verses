var { Card, CardTitle, CardText, CardActions, FlatButton, Dialog } = MUI;

Verse = React.createClass({
  getInitialState() {
    return {
      modal: false
    }
  },
  render() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    return (
      <div>
      <Card initiallyExpanded={true} className="verse">
        <CardTitle
          title={this.props.verse.title}
          showExpandableButton={true} />
        <CardText expandable={true}>
          {this.props.verse.content}
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Note"/>
          <FlatButton label="Memorize" onTouchTap={this._handleDiaglogTouchTap}/>
        </CardActions>
      </Card>
      <Dialog
        ref="dialog"
        title={this.props.verse.title}
        actions={standardActions}
        actionFocus="submit"
        modal={this.state.modal}>
        The actions in this window are created from the json that's passed in.
      </Dialog>
      </div>
    )
  },

  _handleDiaglogTouchTap() {
    this.refs.dialog.show();
  }
});
