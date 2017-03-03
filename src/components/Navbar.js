import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
// import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import Login from './Login';
import { signOut } from '../actions/auth';
import { listenToLoggedUser } from '../actions/firebaseDb';

class Navbar extends Component {
  // state = {
  //   logged: false,
  // };

  // handleChange = (event, logged) => {
  //   this.setState({logged: logged});
  // };

  componentDidMount() {
    // console.log('this.props.user', this.props.user);
    if (this.props.loggedIn) {
      this.props.listenToLoggedUser();
    }
  }

  logOut = () => {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const { loggedIn, user, signOut, loggedUser } = this.props;
    console.log('user:', user);
    let messageCount = 0;
    if (loggedUser && loggedUser.messages) {
      messageCount = Object.keys(loggedUser.messages).filter((key) => {
        return loggedUser.messages[key].read === false;
      }).length;
      console.log('messageCount:', messageCount);
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
          primary={true}
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
        {/* <FlatButton label="Login/Join" /> */}
        <Login />
      </ToolbarGroup>
    );

    const logged = (
      <ToolbarGroup>
        {notificationIcon}
        {/* <FontIcon
          className="fa fa-comments"
        />
      <Avatar src={user.photoURL} id="navbarAvitar" /> */}
        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={
            // <IconButton><MoreVertIcon /></IconButton>
            <Avatar src={user.photoURL} id="navbarAvitar" className="pointer" />
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Dashboard" leftIcon={<FontIcon className="fa fa-tachometer" />} onClick={() => browserHistory.push('/dashboard')} />
          <MenuItem primaryText="Profile" leftIcon={<FontIcon className="fa fa-user" />} onClick={() => browserHistory.push(`/profile/${user.uid}`)} />
          <MenuItem primaryText="Climbing Gyms" leftIcon={<FontIcon className="fa fa-building" />} onClick={() => browserHistory.push('/dashboard')} />
          <MenuItem primaryText="Groups" leftIcon={<FontIcon className="fa fa-users" />} onClick={() => browserHistory.push('/dashboard')} />
          <MenuItem primaryText="Sign out" leftIcon={<FontIcon className="fa fa-sign-out" />} onClick={this.logOut} />
        </IconMenu>
      </ToolbarGroup>
    );

    const rightMenu = loggedIn ? logged : login;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <img className="pointer" id="topLogo" src="/simplelogo.png" alt="" onClick={() => browserHistory.push('/')} />
          </ToolbarGroup>
          {/* <ToolbarGroup> */}
            {rightMenu}
          {/* </ToolbarGroup> */}
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  loggedIn: state.auth.authenticated,
  user: state.auth.user,
  loggedUser: state.loggedUser,
}));

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut());
  },
  listenToLoggedUser() {
    dispatch(listenToLoggedUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
