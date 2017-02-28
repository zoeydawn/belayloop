import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import Login from './Login';
import { signOut } from '../actions/auth';
import { listenToMessages } from '../actions/firebaseDb';

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
      this.props.listenToMessages();
    }
  }

  logOut = () => {
    this.props.signOut();
    browserHistory.push('/');
  }

  render() {
    const { loggedIn, user, signOut, messages } = this.props;
    console.log('messages:', messages);

    const login = (
      <ToolbarGroup>
        {/* <FlatButton label="Login/Join" /> */}
        <Login />
      </ToolbarGroup>
    );

    const logged = (
      <ToolbarGroup>
        <FontIcon
          className="fa fa-bell"
          onClick={() => browserHistory.push('/messages')}
        />
        {/* <FontIcon
          className="fa fa-comments"
        />
      <Avatar src={user.photoURL} id="navbarAvitar" /> */}
        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Dashboard" onClick={() => browserHistory.push('/dashboard')} />
          <MenuItem primaryText="Profile" onClick={() => browserHistory.push(`/profile/${user.uid}`)} />
          <MenuItem primaryText="Sign out" onClick={this.logOut} />
        </IconMenu>
      </ToolbarGroup>
    );

    const rightMenu = loggedIn ? logged : login;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <img className="pointer" id="topLogo" src="" alt="" onClick={() => browserHistory.push('/')} />
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
  messages: state.messages,
}));

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOut());
  },
  listenToMessages() {
    dispatch(listenToMessages());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
