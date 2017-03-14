import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';

import MessageForm from './MessageForm';
import ConversationList from './ConversationList';

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
    }

    return (
      <div>
        <div className="pointer" onClick={() => browserHistory.push('/messages')}>
          <FontIcon className="fa fa-chevron-left" />
          Back to conversations
        </div>
        <ConversationList conversation={conversation} />
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
