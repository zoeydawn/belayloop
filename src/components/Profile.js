import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import { getUser } from '../actions/userActions';
import { startListeningToUser, sendMessage } from '../actions/firebaseDb';

import Message from './Message';

class Profile extends Component {
  componentWillMount() {
    const { userId } = this.props.params;
    this.props.getUser(userId);
    this.props.startListeningToUser(userId);
  }

  render() {
    const { userDetails } = this.props;
    // console.log('userDetails:', userDetails);
    const { userInfo } = this.props;
    let displayName = '';
    let photoURL = '';

    if (userInfo) {
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      // console.log('userInfo:', this.props.userInfo);
    }

    let details = {
      belay: '',
      bio: '',
      boldering: '',
      city: '',
      country: '',
      lead: '',
      skill: '',
      state: '',
    };
    if (userDetails) {
      details = {
        belay: userDetails.belay,
        bio: userDetails.bio,
        boldering: userDetails.boldering,
        city: userDetails.city,
        country: userDetails.country,
        lead: userDetails.lead,
        skill: userDetails.skill,
        state: userDetails.state,
      }
    }

    return (
      <div className="profile">
        <div className="profileLeft">
          <img className="profileAvatar" src={photoURL} alt={displayName} />
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={false}>
                <TableRowColumn>Skill Level:</TableRowColumn>
                <TableRowColumn>{details.skill}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Boldering Level:</TableRowColumn>
                <TableRowColumn>{details.boldering}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Belay Qualified:</TableRowColumn>
                <TableRowColumn>{details.belay}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Lead Qualified:</TableRowColumn>
                <TableRowColumn>{details.lead}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="profileCenter">
          <h1>{displayName}</h1>
          <h3>{`${details.city} ${details.state} ${details.country}`}</h3>
          <p>{details.bio}</p>
        </div>
        <div className="profileRight">
          {/* <RaisedButton
            icon={<FontIcon className="fa fa-comment-o" />}
            label="Message"
            style={{ height: 36 }}
          /> */}
          <Message
            displayName={displayName}
            submit={this.props.sendMessage}
            userId={this.props.params.userId}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  userInfo: state.userInfo,
  userDetails: state.userDetails,
}));

const mapDispatchToProps = dispatch => ({
  getUser(id) {
    dispatch(getUser(id));
  },
  startListeningToUser(userId) {
    dispatch(startListeningToUser(userId));
  },
  sendMessage(userId, obj) {
    dispatch(sendMessage(userId, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
