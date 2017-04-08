import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';

import MessageForm from './MessageForm';
import ConversationList from './ConversationList';

import { listenToConversation, addMessageToDiscussion } from '../actions/firebaseDb';

class Discussion extends Component {
  componentDidMount() {
    this.props.listenToConversation(this.props.params.id);
  }

  render() {
    const { user, conversation, sendMessage } = this.props;
    const { groupId, id, type } = this.props.params;

    return (
      <div className="profile">
        <div className="pageLeft" />
        <div className="profileCenter">
          <div className="pointer" onClick={() => browserHistory.push(`/${type}/${groupId}`)}>
            <FontIcon className="fa fa-chevron-left" />
            Back to {type} page
          </div>
          <ConversationList conversation={conversation} />
          <MessageForm
            conversation={id}
            submit={sendMessage}
            user={user}
            otherPartyUid={null}
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

Discussion.propTypes = {
  user: PropTypes.object,
  conversation: PropTypes.object,
  params: PropTypes.object,
  sendMessage: PropTypes.func,
  listenToConversation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
