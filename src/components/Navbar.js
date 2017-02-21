import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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

// class Login extends Component {
//   static muiName = 'FlatButton';
//
//   render() {
//     return (
//       <FlatButton {...this.props} label="Login" />
//     );
//   }
// }

class Navbar extends Component {
  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    const Login = (
      <ToolbarGroup>
        <FlatButton label="Login/Join" />
      </ToolbarGroup>
    );
    const Logged = (
      <ToolbarGroup>
        <Avatar src="http://www.nndb.com/people/094/000039974/ron-paul-1-sized.jpg" />
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Dashboard" />
          <MenuItem primaryText="Profile" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </ToolbarGroup>
    );

    const rightMenu = this.state.logged ? Logged : Login;

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

export default Navbar;
