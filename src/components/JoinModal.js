import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
// import FontIcon from 'material-ui/FontIcon';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import Bar from './Bar';

export default class JoinModal extends Component {
  state = {
    message: 'See you there!',
    // subject: '[no subject]',
    snackbarOpen: false,
  }

  _onType = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    // console.log('this.state:', this.state);
  }

  _onSubmit = () => {
    const { submit, userId, displayName, photoURL, handleClose, user, day } = this.props;
    const { message } = this.state;
    const receiverObj = {
      uid: userId,
      displayName,
      photoURL,
    };
    const messageObj = {
      subject: day,
      message,
    };
    submit(receiverObj, messageObj);
    handleClose();
    // console.log('this.state:', this.state);
    this.setState({
      message: 'See you there!',
      // subject: '[no subject]',
      snackbarOpen: true,
    });
  }

  render() {
    const { displayName, handleClose, open, gym, dateAndTime, climbType } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Join!"
        primary
        keyboardFocused
        onTouchTap={this._onSubmit}
      />,
    ];
    return (
      <div>
        {/* <RaisedButton
          icon={<FontIcon className="fa fa-comment-o" />}
          label="Message"
          style={{ height: 36 }}
          onTouchTap={handleOpen}
        /> */}
        <Dialog
          title={`${climbType} with ${displayName} at ${gym}!`}
          // subtitle={dateAndTime}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >
          {`Can you make it ${dateAndTime}?`}
          {/* <TextField
            name="subject"
            // defaultValue={bio}
            floatingLabelText="Subject"
            // multiLine={true}
            // rows={2}
            onChange={this._onType}
          /> */}
          <br />
          <TextField
            name="message"
            defaultValue="See you there!"
            floatingLabelText="Send them a message:"
            multiLine
            rows={2}
            onChange={this._onType}
          />
        </Dialog>
        <Bar
          open={this.state.snackbarOpen}
          text={`You are climbing with ${displayName}!`}
        />
      </div>
    );
  }
}

JoinModal.propTypes = {
  displayName: PropTypes.string,
  submit: PropTypes.func,
  userId: PropTypes.string,
  photoURL: PropTypes.string,
  gym: PropTypes.string,
  dateAndTime: PropTypes.string,
  climbType: PropTypes.string,
  day: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.object,
};
