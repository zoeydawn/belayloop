import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

class Messages extends Component {

  render() {
    const { messages } = this.props;
    // console.log('loggedUser:', loggedUser);
    let messageList = 'Your inbox in empty';
    // let messages;
    if (messages) {
      // messages = loggedUser.messages;
      // console.log('messages:', messages);
      messageList = Object.keys(messages).map((conversationId) => {
        // console.log('messages[conversationId]:', messages[conversationId]);
        const { displayName, photoURL, subject, read, uid } = messages[conversationId];
        if (read) {
          return (
            <ListItem
              key={conversationId}
              onClick={() => browserHistory.push(`conversation/${conversationId}/${uid}`)}
              primaryText={displayName}
              secondaryText={subject}
              leftAvatar={<Avatar src={photoURL} />}
              // rightIcon={<CommunicationChatBubble />}
            />
          );
        }
        return (
          <ListItem
            key={conversationId}
            onClick={() => browserHistory.push(`conversation/${conversationId}/${uid}`)}
            primaryText={displayName}
            secondaryText={subject}
            leftAvatar={<Avatar src={photoURL} />}
            rightIcon={<FontIcon className="fa fa-comments" />}
          />
        );
      });
    }

    return (
      <div className="profile">
        <div className="pageLeft" />
        <div className="profileCenter">
          <h1 className="soft">Your Conversations:</h1>
          {/* <Subheader inset>Your Conversations:</Subheader> */}
          <List>
            {messageList}
          </List>
        </div>
        <div className="profileRight" />
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  messages: state.messages,
}));

Messages.propTypes = {
  messages: PropTypes.object,
};

export default connect(mapStateToProps)(Messages);
