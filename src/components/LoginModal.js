import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import Auth from './Auth';

export default class LoginModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _googleSignIn = () => {
    const { googleSignIn, hideModal } = this.props;
    googleSignIn();
    this.setState({ open: false });
    // if (hideModal) {
    //   hideModal();
    // }
    // browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <FlatButton
          label="Login/Join"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Sign In to BelayLoop:"
          // actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Auth googleSignIn={this._googleSignIn} />
        </Dialog>
      </div>
    );
  }
}
