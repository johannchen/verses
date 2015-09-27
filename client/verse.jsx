var { Card, CardTitle, CardText, CardActions, FlatButton, FontIcon, IconButton, Dialog } = MUI;

Verse = React.createClass({
  getInitialState() {
    return {
      modal: false,
      diff: { __html: ''}
    }
  },
  render() {
    let standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    let styles = {
      container: {
        textAlign: 'center',
        marginBottom: '16px'
      },
      exampleFlatButtonIcon: {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'left',
        paddingLeft: '12px',
        lineHeight: '36px'
      }
    };
    return (
      <div>
        <Card initiallyExpanded={true} className="verse">
          <CardTitle
            title={this.props.verse.title}
            subtitle={this.props.verse.topic}
            showExpandableButton={true} />
          <CardText expandable={true}>
            {this.props.verse.content}
          </CardText>
          <CardActions expandable={true}>
            <div style={styles.container}>
              <FlatButton label="Comments">
                <FontIcon style={styles.exampleFlatButtonIcon} className="material-icons">speaker_notes</FontIcon>
              </FlatButton>
              <FlatButton label={this.props.verse.starCount} onTouchTap={this._handleDiaglogTouchTap}>
                <FontIcon style={styles.exampleFlatButtonIcon} className="material-icons">grade</FontIcon>
              </FlatButton>
              <IconButton iconClassName="material-icons" tooltipPosition="top-center" tooltip="Remove" onTouchTap={this.removeVerse}>clear</IconButton>
            </div>
          </CardActions>
        </Card>
        <Dialog
          ref="dialog"
          title={this.props.verse.title}
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}>
          <textarea ref="textarea" rows="4" style={{width: '100%'}} />
          <p>
            <span dangerouslySetInnerHTML={this.state.diff} />
          </p>
        </Dialog>
      </div>
    )
  },

  diffText(text1, text2) {
  	let dmp = new diff_match_patch();
  	let d = dmp.diff_main(text1, text2);
  	dmp.diff_cleanupSemantic(d);
  	return dmp.diff_prettyHtml(d);
  },

  updateStar() {
    Meteor.call('updateStar', this.props.verse._id);
  },

  removeVerse() {
    Meteor.call('removeVerse', this.props.verse._id);
  },

  _handleDiaglogTouchTap() {
    this.refs.dialog.show();
  },

  _onDialogSubmit() {
    let typedVerse = this.refs.textarea.getDOMNode().value;
    if (typedVerse === this.props.verse.content) {
      this.updateStar();
      this.refs.dialog.dismiss();
    } else {
      let diff = this.diffText(typedVerse, this.props.verse.content);
      this.setState({diff: { __html: diff }});
    }
  }
});
