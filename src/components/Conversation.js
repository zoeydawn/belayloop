import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import MessageForm from './MessageForm';

import { listenToConversation, sendMessage, markAsRead } from '../actions/firebaseDb';

class Conversation extends Component {
  componentDidMount() {
    this.props.markAsRead(this.props.params.id);
    this.props.listenToConversation(this.props.params.id);
  }

  render() {
    const { user, conversation, sendMessage, loggedUser } = this.props;
    let otherPartyUid;
    if (loggedUser) {
      otherPartyUid = loggedUser.messages[this.props.params.id].uid;
      // console.log('loggedUser.messages[this.props.params.id].uid:', loggedUser.messages[this.props.params.id].uid);
    }
    let conversationList = '';
    if (conversation) {
      conversationList = Object.keys(conversation).map((messageId) => {
        const { displayName, message, photoURL, timestamp, uid } = conversation[messageId];
        console.log('conversation:', conversation);
        return (
          <ListItem
            key={messageId}
            // disabled={true}
            onClick={() => browserHistory.push(`/profile/${uid}`)}
            leftAvatar={<Avatar src={photoURL} />}
            primaryText={message}
            secondaryText={`${displayName} - ${moment(timestamp).fromNow()}`}
          >
            {/* {message} */}
          </ListItem>
        )
      });
    }

    return (
      <div>
        <div className="pointer" onClick={() => browserHistory.push('/messages')}>
          <FontIcon className="fa fa-chevron-left" />
          Back to conversations
        </div>
        <List>
          {conversationList}
        </List>
        <MessageForm
          conversation={this.props.params.id}
          submit={sendMessage}
          user={user}
          otherPartyUid={otherPartyUid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  conversation: state.conversation,
  user: state.auth.user,
  loggedUser: state.loggedUser,
}));

const mapDispatchToProps = dispatch => ({
  listenToConversation(id) {
    dispatch(listenToConversation(id));
  },
  sendMessage(conId, obj, uid) {
    dispatch(sendMessage(conId, obj, uid));
  },
  markAsRead(conId) {
    dispatch(markAsRead(conId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
