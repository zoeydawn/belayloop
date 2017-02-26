import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { updateUser } from '../actions/userActions';
import { startListeningToUser } from '../actions/firebaseDb';
import EditInfo from './EditInfo';

class Dashboard extends Component {

  componentDidMount() {
    this.props.startListeningToUser(this.props.user.uid);
  }

  // editInfo = () => {
  //   this.props.updateUser({ displayName: 'Donovan' });
  // }

  render() {
    const { displayName, email, uid, photoURL } = this.props.user;
    // console.log('firebaseAuth:', firebaseAuth);
    return (
      <div className="profile">
        <div className="profileLeft">
          <img className="profileAvatar" src={photoURL} alt={displayName} />
          <EditInfo
            name="photoURL"
            title="Avatar"
            defaultVal={photoURL}
            submit={this.props.updateUser}
          />
        </div>
        <div className="profileCenter">
          <h1>{displayName}</h1>
          <h3>Chapel Hill, NC</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</p>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={false}>
                <TableRowColumn>Display Name</TableRowColumn>
                <TableRowColumn>{displayName}</TableRowColumn>
                <TableRowColumn>
                  <EditInfo
                    name="displayName"
                    title="Display Name"
                    defaultVal={displayName}
                    submit={this.props.updateUser}
                  />
                </TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Email</TableRowColumn>
                <TableRowColumn>{email}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>User ID</TableRowColumn>
                <TableRowColumn>{uid}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="profileRight"></div>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  user: state.auth.user,
}));

const mapDispatchToProps = dispatch => ({
  updateUser(obj) {
    dispatch(updateUser(obj));
  },
  startListeningToUser(userId) {
    dispatch(startListeningToUser(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
