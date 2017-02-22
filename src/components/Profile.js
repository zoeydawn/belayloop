import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import { getUser } from '../actions/userActions';

class Profile extends Component {
  componentWillMount() {
    this.props.getUser(this.props.params.userId);
  }

  render() {
    // const { displayName, email, uid, photoURL } = this.props.userInfo;
    // console.log('firebaseAuth:', firebaseAuth);
    const { userInfo } = this.props;
    let displayName = '';
    let photoURL = '';

    if (userInfo) {
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      // console.log('userInfo:', this.props.userInfo);
    }

    return (
      <div>
        <img src={photoURL} alt={displayName} />
        <Table>
          <TableBody>
            <TableRow>
              <TableRowColumn>Display Name</TableRowColumn>
              <TableRowColumn>{displayName}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  userInfo: state.userInfo,
}));

const mapDispatchToProps = dispatch => ({
  getUser(id) {
    dispatch(getUser(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
