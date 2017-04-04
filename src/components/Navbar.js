import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

import LoginModal from './LoginModal';
import { signOut, signInWithGoogle, signInWithFacebook } from '../actions/auth';
import { listenToLoggedUser, listenToMessages } from '../actions/firebaseDb';

class Navbar extends Component {

  componentDidMount() {
    if (this.props.loggedIn) {
      // console.log('in CDM');
      this.props.listenToMessages();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loggedIn && nextProps.loggedIn) {
      // console.log('in CRP');
      this.props.listenToMessages();
    }
  }

  logOut = () => {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const {
      loggedIn,
      user,
      signInWithGoogle,
      signInWithFacebook,
      messages,
    } = this.props;

    // console.log('user:', user);
    let messageCount = 0;
    if (messages) {
      messageCount = Object.keys(messages).filter(key => (
        messages[key].read === false
      )).length;
      // console.log('messageCount:', messageCount);
    }

    let notificationIcon = (
      <FontIcon
        className="fa fa-envelope"
        onClick={() => browserHistory.push('/messages')}
      />
    );

    if (messageCount) {
      notificationIcon = (
        <Badge
          className="pointer"
          badgeContent={messageCount}
          primary
        >
          <FontIcon
            className="fa fa-envelope"
            onClick={() => browserHistory.push('/messages')}
          />
        </Badge>
      );
    }

    const login = (
      <ToolbarGroup>
        <LoginModal
          googleSignIn={signInWithGoogle}
          facebookSignIn={signInWithFacebook}
        />
      </ToolbarGroup>
    );

    const logged = (
      <ToolbarGroup>
        {notificationIcon}
        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Dashboard" leftIcon={<FontIcon className="fa fa-tachometer" />} onClick={() => browserHistory.push('/dashboard')} />
          <MenuItem primaryText="Profile" leftIcon={<FontIcon className="fa fa-user" />} onClick={() => browserHistory.push(`/profile/${user.uid}`)} />
          <MenuItem primaryText="Climbing Gyms" leftIcon={<FontIcon className="fa fa-building" />} onClick={() => browserHistory.push('/gyms')} />
          <MenuItem primaryText="Groups" leftIcon={<FontIcon className="fa fa-users" />} onClick={() => browserHistory.push('/groups')} />
          <MenuItem primaryText="Sign out" leftIcon={<FontIcon className="fa fa-sign-out" />} onClick={this.logOut} />
        </IconMenu>
      </ToolbarGroup>
    );

    const rightMenu = loggedIn ? logged : login;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <img className="pointer" id="topLogo" src="/logo.png" alt="" onClick={() => browserHistory.push('/')} />
          </ToolbarGroup>
          {rightMenu}
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  loggedIn: state.auth.authenticated,
  user: state.auth.user,
  messages: state.messages,
}));

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut());
  },
  listenToLoggedUser() {
    dispatch(listenToLoggedUser());
  },
  signInWithGoogle() {
    dispatch(signInWithGoogle());
  },
  signInWithFacebook() {
    dispatch(signInWithFacebook());
  },
  listenToMessages() {
    dispatch(listenToMessages());
  },
});

Navbar.propTypes = {
  loggedIn: PropTypes.bool,
  listenToMessages: PropTypes.func,
  signOut: PropTypes.func,
  signInWithGoogle: PropTypes.func,
  signInWithFacebook: PropTypes.func,
  user: PropTypes.object,
  messages: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
