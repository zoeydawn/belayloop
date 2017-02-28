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

import { listenToConversation, sendMessage } from '../actions/firebaseDb';

class Conversation extends Component {
  componentDidMount() {
    // console.log('this.props.params.id:', this.props.params.id);
    this.props.listenToConversation(this.props.params.id);
  }

  render() {
    const { user, conversation, sendMessage } = this.props;
    console.log('conversation:', conversation);
    let conversationList = '';
    if (conversation) {
      conversationList = Object.keys(conversation).map((messageId) => {
        const { displayName, message, photoURL, timestamp, uid } = conversation[messageId];
        // console.log('messageId:', messageId);
        return (
          <ListItem
            key={messageId}
            disabled={true}
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  conversation: state.conversation,
  user: state.auth.user,
}));

const mapDispatchToProps = dispatch => ({
  listenToConversation(id) {
    dispatch(listenToConversation(id));
  },
  sendMessage(id, obj) {
    dispatch(sendMessage(id, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
