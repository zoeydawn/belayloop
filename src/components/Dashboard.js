import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import { updateUser } from '../actions/userActions';

class Dashboard extends Component {

  editInfo = () => {
    this.props.updateUser({ bio: 'me!!' });
  }

  render() {
    const { displayName, email, uid, photoURL } = this.props.user;
    // console.log('firebaseAuth:', firebaseAuth);
    return (
      <div>
        <img src={photoURL} alt={displayName} />
        <Table>
          {/* <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            <TableRow>
              <TableRowColumn>Display Name</TableRowColumn>
              <TableRowColumn>{displayName}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Email</TableRowColumn>
              <TableRowColumn>{email}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>User ID</TableRowColumn>
              <TableRowColumn>{uid}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <FlatButton label="Edit" onClick={this.editInfo} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
