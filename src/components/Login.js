import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';

import { signInWithGoogle, signInWithFacebook } from '../actions/auth';

class Login extends React.Component {
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
        {/* <RaisedButton label="Dialog" onTouchTap={this.handleOpen} /> */}
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
          <RaisedButton
            className="logInButton"
            label="Sign In with Google"
            backgroundColor="rgb(220, 74, 56)"
            icon={<FontIcon className="fa fa-google" />}
            onTouchTap={this._googleSignIn}
          />
          <RaisedButton
            className="logInButton"
            label="Sign In with Facebook"
            backgroundColor="rgb(59, 89, 152)"
            icon={<FontIcon className="fa fa-facebook-f" />}
          />
          <RaisedButton
            className="logInButton"
            label="Sign In with Email"
            icon={<FontIcon className="fa fa-envelope" />}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  googleSignIn() {
    dispatch(signInWithGoogle());
  },
  facebookSignIn() {
    dispatch(signInWithFacebook());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
