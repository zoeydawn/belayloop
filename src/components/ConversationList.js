import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

const ConversationList = (props) => {
  const { conversation } = props;
  let conversationList = '';
  if (conversation) {
    conversationList = Object.keys(conversation).map((messageId) => {
      const { displayName, message, photoURL, timestamp, uid } = conversation[messageId];
      console.log('conversation:', conversation);
      return (
        <ListItem
          key={messageId}
          onClick={() => browserHistory.push(`/profile/${uid}`)}
          leftAvatar={<Avatar src={photoURL} />}
          primaryText={message}
          secondaryText={`${displayName} - ${moment(timestamp).fromNow()}`}
        >
        </ListItem>
      );
    });
  }

  return (
    <List>
      {conversationList}
    </List>
  );
};

export default ConversationList;
