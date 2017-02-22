import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

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
      <div className="profile">
        <div className="profileLeft">
          <img className="profileAvatar" src={photoURL} alt={displayName} />
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={false}>
                <TableRowColumn>Skill Level:</TableRowColumn>
                <TableRowColumn>5.9</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Boldering Level:</TableRowColumn>
                <TableRowColumn>V2</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Belay Qualified:</TableRowColumn>
                <TableRowColumn>Yes</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Lead Qualified:</TableRowColumn>
                <TableRowColumn>No</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="profileCenter">
          <h1>{displayName}</h1>
          <h3>Chapel Hill, NC</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</p>
        </div>
        <div className="profileRight">
          <RaisedButton
            icon={<FontIcon className="fa fa-comment-o" />}
            label="Message"
            style={{ height: 36 }}
          />
        </div>
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
