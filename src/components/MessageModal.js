import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import Bar from './Bar';

export default class MessageModal extends Component {
  state = {
    // open: false,
    message: '',
    subject: '[no subject]',
    snackbarOpen: false,
  }

  // handleOpen = () => {
  //   this.setState({ open: true });
  // }
  //
  // handleClose = () => {
  //   this.setState({ open: false });
  // }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    // console.log('this.state:', this.state);
  }

  _onSubmit = () => {
    const { submit, userId, displayName, photoURL, handleClose } = this.props;
    const { message, subject } = this.state;
    const receiverObj = {
      uid: userId,
      displayName,
      photoURL,
    };
    const messageObj = {
      subject,
      message,
    };
    submit(receiverObj, messageObj);
    handleClose();
    // console.log('this.state:', this.state);
    this.setState({
      message: '',
      subject: '[no subject]',
      snackbarOpen: true,
    });
  }

  render() {
    const { displayName, handleOpen, handleClose, open } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Send"
        primary
        keyboardFocused
        onTouchTap={this._onSubmit}
      />,
    ];
    return (
      <div>
        <RaisedButton
          icon={<FontIcon className="fa fa-comment-o" />}
          label="Message"
          style={{ height: 36 }}
          onTouchTap={handleOpen}
        />
        <Dialog
          title={`Send message to ${displayName}`}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >
          <TextField
            name="subject"
            // defaultValue={bio}
            floatingLabelText="Subject"
            // multiLine={true}
            // rows={2}
            onChange={this._onType}
          />
          <br />
          <TextField
            name="message"
            // defaultValue={bio}
            floatingLabelText="Message"
            multiLine
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
        <Bar
          open={this.state.snackbarOpen}
          text="Message sent"
        />
      </div>
    );
  }
}

MessageModal.propTypes = {
  displayName: PropTypes.string,
  submit: PropTypes.func,
  userId: PropTypes.string,
  photoURL: PropTypes.string,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  open: PropTypes.bool,
};
