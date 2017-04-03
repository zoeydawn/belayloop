import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { getUser } from '../actions/userActions';
import {
  startListeningToUser,
  startConversation,
  listenToPosts,
  joinPost,
  listenToUserGroups,
} from '../actions/firebaseDb';

import Message from './Message';
import PostList from './PostList';

class Profile extends Component {
  componentDidMount() {
    const { userId } = this.props.params;
    // console.log('in cwm');
    this.props.getUser(userId);
    this.props.startListeningToUser(userId);
    this.props.listenToPosts(userId);
    this.props.listenToUserGroups(userId);
  }

  render() {
    const { userDetails, userInfo, posts, user, startConversation, joinPost, groups } = this.props;
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
    }

    if (groups) {
      groupsList = (
        Object.keys(groups).map((groupId) => {
          const { name, description } = groups[groupId];
          return (
            <ListItem
              key={groupId}
              primaryText={name}
              secondaryText={description}
              onClick={() => browserHistory.push(`/group/${groupId}`)}
            />
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
            submit={startConversation}
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
          <List>
            <ListItem
              disabled
              primaryText="Skill Level:"
              secondaryText={details.skill}
            />
            <ListItem
              disabled
              primaryText="Boldering Level:"
              secondaryText={details.boldering}
            />
            <ListItem
              disabled
              primaryText="Belay Qualified:"
              secondaryText={details.belay}
            />
            <ListItem
              disabled
              primaryText="Lead Qualified:"
              secondaryText={details.lead}
            />
          </List>
          <p>{details.bio}</p>
          <PostList
            posts={posts}
            submitMessage={startConversation}
            joinPost={joinPost}
            user={user}
          />
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
  user: state.auth.user,
  groups: state.userGroups,
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
  joinPost(userId, obj) {
    dispatch(joinPost(userId, obj));
  },
  listenToUserGroups(userId) {
    dispatch(listenToUserGroups(userId));
  },
});

Profile.propTypes = {
  startConversation: PropTypes.func,
  userInfo: PropTypes.object,
  userDetails: PropTypes.object,
  posts: PropTypes.object,
  user: PropTypes.object,
  groups: PropTypes.object,
  params: PropTypes.object,
  getUser: PropTypes.func,
  startListeningToUser: PropTypes.func,
  listenToPosts: PropTypes.func,
  joinPost: PropTypes.func,
  listenToUserGroups: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
