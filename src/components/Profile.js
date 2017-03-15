import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
// import Avatar from 'material-ui/Avatar';
// import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { getUser } from '../actions/userActions';
import { startListeningToUser, startConversation, listenToPosts } from '../actions/firebaseDb';

import Message from './Message';
import PostList from './PostList';

class Profile extends Component {
  componentDidMount() {
    const { userId } = this.props.params;
    // console.log('in cwm');
    this.props.getUser(userId);
    this.props.startListeningToUser(userId);
    this.props.listenToPosts(userId);
  }

  render() {
    const { userDetails, userInfo, posts } = this.props;
    // const { userInfo } = this.props;
    // console.log('userInfo:', userInfo);
    let displayName = '';
    let photoURL = '';
    let groupsList = '';

    if (userInfo) {
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      groupsList = `${displayName} is not in any groups`;
    }
    // console.log('userDetails:', userDetails);

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
      };
      groupsList = (
        Object.keys(userDetails.groups).map((groupId) => {
          const { name, description } = userDetails.groups[groupId];
          return (
            <ListItem
              key={groupId}
              // leftAvatar={<Avatar src={photoURL} />}
              primaryText={name}
              secondaryText={description}
              onClick={() => browserHistory.push(`/group/${groupId}`)}
            >
            </ListItem>
          );
        })
      );
    }

    return (
      <div className="profile">
        <div className="profileLeft">
          <img className="profileAvatar" src={photoURL} alt={displayName} />
          <br />
          <br />
          <Message
            displayName={displayName}
            submit={this.props.startConversation}
            userId={this.props.params.userId}
            photoURL={photoURL}
          />
          <br />
          <h3>Groups:</h3>
          <List>
            {groupsList}
          </List>
        </div>
        <div className="profileCenter">
          <h1>{displayName}</h1>
          <h3>{`${details.city} ${details.state} ${details.country}`}</h3>
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
          <p>{details.bio}</p>
          <PostList posts={posts} submitMessage={this.props.startConversation} />
        </div>
        <div className="profileRight">

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  userInfo: state.userInfo,
  userDetails: state.userDetails,
  posts: state.posts,
}));

const mapDispatchToProps = dispatch => ({
  getUser(id) {
    dispatch(getUser(id));
  },
  startListeningToUser(userId) {
    dispatch(startListeningToUser(userId));
  },
  listenToPosts(userId) {
    dispatch(listenToPosts(userId));
  },
  startConversation(userId, obj) {
    dispatch(startConversation(userId, obj));
  },
});

Profile.propTypes = {
  startConversation: PropTypes.func,
  userInfo: PropTypes.object,
  userDetails: PropTypes.object,
  posts: PropTypes.object,
  params: PropTypes.object,
  getUser: PropTypes.func,
  startListeningToUser: PropTypes.func,
  listenToPosts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
