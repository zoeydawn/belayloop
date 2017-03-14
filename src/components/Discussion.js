import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';

import MessageForm from './MessageForm';
import ConversationList from './ConversationList';

import { listenToConversation, addMessageToDiscussion } from '../actions/firebaseDb';

class Discussion extends Component {
  componentDidMount() {
    // this.props.markAsRead(this.props.params.id);
    this.props.listenToConversation(this.props.params.id);
  }

  render() {
    const { user, conversation, sendMessage, loggedUser } = this.props;
    const { groupId, id } = this.props.params;
    // let otherPartyUid;
    // if (loggedUser) {
    //   otherPartyUid = loggedUser.messages[this.props.params.id].uid;
    // }
    console.log('conversation:', conversation);

    return (
      <div>
        <div className="pointer" onClick={() => browserHistory.push(`/group/${groupId}`)}>
          <FontIcon className="fa fa-chevron-left" />
          Back to group
        </div>
        <ConversationList conversation={conversation} />
        <MessageForm
          conversation={id}
          submit={sendMessage}
          user={user}
          otherPartyUid={null}
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
  sendMessage(conId, obj) {
    dispatch(addMessageToDiscussion(conId, obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
