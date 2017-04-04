import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class MessageForm extends Component {
  state = { message: '' }

  _onType = (e) => {
    const { value } = e.target;
    const lastChar = value.charCodeAt([value.length - 1]);
    if (lastChar === 10) {
      this._onSubmit();
    } else {
      this.setState({ message: value });
    }
  }

  _onSubmit = () => {
    console.log('in _onSubmit');
    const { submit, user, conversation, otherPartyUid } = this.props;
    const { uid, displayName, photoURL } = user;
    const { message } = this.state;
    if (message) {
      const messageObj = {
        message,
        uid,
        displayName,
        photoURL,
        timestamp: Date.now(),
      };
      submit(conversation, messageObj, otherPartyUid);
      this.setState({ message: '' });
    }
  }

  render() {
    return (
      <div>
        <TextField
          name="message"
          value={this.state.message}
          multiLine
          fullWidth
          rows={2}
          onChange={this._onType}
        />
        <FlatButton
          label="Send"
          primary
          keyboardFocused
          onTouchTap={this._onSubmit}
        />
      </div>
    );
  }
}

MessageForm.propTypes = {
  user: PropTypes.object,
  submit: PropTypes.func,
  conversation: PropTypes.string,
  otherPartyUid: PropTypes.string,
};
