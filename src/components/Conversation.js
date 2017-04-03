import React, { Component, PropTypes } from 'react';
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
    const { user, conversation, sendMessage } = this.props;
    const { otherPartyUid } = this.props.params;

    return (
      <div className="profile">
        <div className="pageLeft" />
        <div className="profileCenter">
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
        <div className="profileRight" />
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
  sendMessage(conId, obj, uid) {
    dispatch(sendMessage(conId, obj, uid));
  },
  markAsRead(conId) {
    dispatch(markAsRead(conId));
  },
});

Conversation.propTypes = {
  params: PropTypes.object,
  listenToConversation: PropTypes.func,
  sendMessage: PropTypes.func,
  markAsRead: PropTypes.func,
  user: PropTypes.object,
  conversation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
