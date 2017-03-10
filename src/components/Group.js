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

import { listenToGroup, joinGroup } from '../actions/firebaseDb';
// import { startListeningToUser, updateUserInfo } from '../actions/firebaseDb';
// import EditInfo from './EditInfo';
// import PublicInfoModal from './PublicInfoModal';

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
    // console.log('currentGroup:', currentGroup);
    const obj = {
      name,
      description,
      id: this.props.params.id,
    };
    joinGroup(obj);
  }

  render() {
    const { currentGroup, joinGroup } = this.props;
    let name = '';
    let description = '';
    let membersList = '';
    let leader = '';

    if (currentGroup) {
      name = currentGroup.name;
      description = currentGroup.description;
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
      // leader = currentGroup.leader;
      console.log('currentGroup:', currentGroup);
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
            <RaisedButton
              icon={<FontIcon className="fa fa-user-plus" />}
              label="Join"
              style={{ height: 36 }}
              onTouchTap={this.join}
            />
          </div>
          <div className="profileRight"></div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGroup: state.currentGroup,
}));

const mapDispatchToProps = dispatch => ({
  listenToGroup(id) {
    dispatch(listenToGroup(id));
  },
  joinGroup(obj) {
    dispatch(joinGroup(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
