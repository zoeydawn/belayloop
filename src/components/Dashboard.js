import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { updateUser } from '../actions/userActions';
import { startListeningToUser, updateUserInfo } from '../actions/firebaseDb';
import EditInfo from './EditInfo';
import PublicInfoModal from './PublicInfoModal';

class Dashboard extends Component {

  componentDidMount() {
    this.props.startListeningToUser(this.props.user.uid);
  }

  // editInfo = () => {
  //   this.props.updateUser({ displayName: 'Donovan' });
  // }
  updateInfo = (obj) => {
    this.props.updateUserInfo(this.props.user.uid, obj);
  }

  render() {
    const { userDetails } = this.props;
    // const { belay, bio, boldering, city, country, lead, skill, state } = userDetails;
    const { displayName, email, uid, photoURL } = this.props.user;
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

    console.log('this.props.userDetails:', this.props.userDetails);
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

          <h3>{`${details.city} ${details.state} ${details.country}`}</h3>

          <PublicInfoModal submit={this.updateInfo} userDetails={details} />
          <h4>About me</h4>
          <p>{details.bio}</p>
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
              <TableRow displayBorder={false}>
                <TableRowColumn>Rope skill level:</TableRowColumn>
                <TableRowColumn>{details.skill}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Boldering skill level:</TableRowColumn>
                <TableRowColumn>{details.boldering}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Can belay?</TableRowColumn>
                <TableRowColumn>{details.belay}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn>Can lead?</TableRowColumn>
                <TableRowColumn>{details.lead}</TableRowColumn>
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
  userDetails: state.userDetails,
}));

const mapDispatchToProps = dispatch => ({
  updateUser(obj) {
    dispatch(updateUser(obj));
  },
  startListeningToUser(userId) {
    dispatch(startListeningToUser(userId));
  },
  updateUserInfo(userId, obj) {
    dispatch(updateUserInfo(userId, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
