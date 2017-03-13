import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { listenToGroup, joinGroup, leaveGroup, startGroupDiscussion } from '../actions/firebaseDb';

import GroupDiscussions from './GroupDiscussions';
import StartDiscussion from './StartDiscussion';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Group extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 'a',
  //   };
  // }

  componentDidMount() {
    this.props.listenToGroup(this.props.params.id);
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  }

  join = () => {
    const { currentGroup, joinGroup } = this.props;
    const { name, description } = currentGroup;
    const obj = {
      name,
      description,
      id: this.props.params.id,
    };
    joinGroup(obj);
  }

  render() {
    const { currentGroup, joinGroup, leaveGroup, uid, startGroupDiscussion } = this.props;
    // console.log('uid:', uid);
    let name = '';
    let description = '';
    let membersList = '';
    let leader = '';
    let joinButton = '';
    let discussions;

    if (currentGroup) {
      name = currentGroup.name;
      description = currentGroup.description;
      discussions = currentGroup.discussions;
      const members = currentGroup.members;
      membersList = Object.keys(members).map((memberId) => {
        const { displayName, photoURL } = members[memberId];
        return (
          <ListItem
            key={memberId}
            leftAvatar={<Avatar src={photoURL} />}
            primaryText={displayName}
            onClick={() => browserHistory.push(`/profile/${memberId}`)}
          >
          </ListItem>
        )
      })

      if (Object.keys(members).includes(uid)) {
        joinButton = (
          <RaisedButton
            icon={<FontIcon className="fa fa-user-times" />}
            label="Leave group"
            style={{ height: 36 }}
            onTouchTap={() => { leaveGroup(this.props.params.id); }}
          />
        );
      } else {
        joinButton = (
          <RaisedButton
            icon={<FontIcon className="fa fa-user-plus" />}
            label="Join"
            style={{ height: 36 }}
            onTouchTap={this.join}
          />
        );
      }
      // console.log('currentGroup:', currentGroup);
    }

    return (
      <div>
        <div className="profile">
          <div className="profileLeft">
            <h2>Members:</h2>
            <List>
              {membersList}
            </List>
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <p>{description}</p>
            {joinButton}
            <br />
            <h3>Discussions:</h3>
            <StartDiscussion submit={startGroupDiscussion} groupId={this.props.params.id} />
            <GroupDiscussions discussions={discussions} />
          </div>
          <div className="profileRight"></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGroup: state.currentGroup,
  uid: state.auth.user.uid,
}));

const mapDispatchToProps = dispatch => ({
  listenToGroup(id) {
    dispatch(listenToGroup(id));
  },
  joinGroup(obj) {
    dispatch(joinGroup(obj));
  },
  leaveGroup(id) {
    dispatch(leaveGroup(id));
  },
  startGroupDiscussion(groupId, obj) {
    dispatch(startGroupDiscussion(groupId, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
