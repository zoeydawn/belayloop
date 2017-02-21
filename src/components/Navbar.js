import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';

import Login from './Login';
import { signOut } from '../actions/auth';

class Navbar extends Component {
  state = {
    logged: false,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  logOut = () => {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const { loggedIn, user, signOut } = this.props;
    console.log('loggedIn:', loggedIn);

    const login = (
      <ToolbarGroup>
        {/* <FlatButton label="Login/Join" /> */}
        <Login />
      </ToolbarGroup>
    );
    const logged = (
      <ToolbarGroup>
        <Avatar src={user.photoURL} />
        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Dashboard" />
          <MenuItem primaryText="Profile" />
          <MenuItem primaryText="Sign out" onClick={this.logOut} />
        </IconMenu>
      </ToolbarGroup>
    );

    const rightMenu = loggedIn ? logged : login;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <img className="pointer" id="topLogo" src="https://www.logogarden.com/wp-content/uploads/lg-logo-samples/Interior-Design-Logo-1.png" alt="" />
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
}));

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
