import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

export default class Message extends Component {
  state = { open: false, message: '' }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  _onType = (e) => {
    const { value } = e.target;
    this.setState({ message: value });
  }

  _onSubmit = () => {
    const { submit, userId } = this.props;
    submit(userId, this.state.message);
    console.log('this.state:', this.state);
    this.setState({ open: false });
  }

  render() {
    const { displayName } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._onSubmit}
      />,
    ];
    return (
      <div>
        <RaisedButton
          icon={<FontIcon className="fa fa-comment-o" />}
          label="Message"
          style={{ height: 36 }}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={`Send message to ${displayName}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="message"
            // defaultValue={bio}
            floatingLabelText={`Send message to ${displayName}`}
            multiLine={true}
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
      </div>
    );
  }
}
