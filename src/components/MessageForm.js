import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

export default class MessageForm extends Component {
  state = { message: '' }

  _onType = (e) => {
    const { value } = e.target;
    this.setState({ message: value });
  }

  _onSubmit = () => {
    // console.log('this.props.user:', this.props.user);
    const { submit, user, conversation } = this.props;
    const { uid, displayName, photoURL } = user;
    const { message } = this.state;
    const messageObj = {
      message,
      uid,
      displayName,
      photoURL,
      timestamp: Date.now(),
    };
    // console.log('messageObj:', messageObj);
    // console.log('conversation:', conversation);
    submit(conversation, messageObj);
    this.setState({ message: '' });
  }

  render() {
    // const { displayName } = this.props;
    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    //   <FlatButton
    //     label="Send"
    //     primary={true}
    //     keyboardFocused={true}
    //     onTouchTap={this._onSubmit}
    //   />,
    // ];
    return (
      <div>
        <TextField
          name="message"
          // defaultValue={bio}
          // floatingLabelText={`Send message to ${displayName}`}
          multiLine={true}
          rows={2}
          onChange={this._onType}
        />
        <FlatButton
          label="Send"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this._onSubmit}
        />
      </div>
    );
  }
}
