import React, { Component, PropTypes } from 'react';

import MessageModal from './MessageModal'

export default class Message extends Component {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { displayName, submit, userId, photoURL } = this.props;

    return (
      <div>
        <MessageModal
          displayName={displayName}
          submit={submit}
          userId={userId}
          photoURL={photoURL}
          open={this.state.open}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

Message.propTypes = {
  displayName: PropTypes.string,
  submit: PropTypes.func,
  userId: PropTypes.string,
  photoURL: PropTypes.string,
};
