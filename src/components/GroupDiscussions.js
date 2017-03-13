import React from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
// import FontIcon from 'material-ui/FontIcon';

// import MessageForm from './MessageForm';
// import ConversationList from './ConversationList';

const GroupDiscussions = (props) => {
  const { discussions } = props;
  let discussionList = 'This group does not yet have any discussions';
  if (discussions) {
    discussionList = Object.keys(discussions).map((conversationId) => {
      const { title, displayName, photoURL, uid, initialComment } = discussions[conversationId];
      return (
        <ListItem
          key={conversationId}
          onClick={() => browserHistory.push(`conversation/${conversationId}`)}
          primaryText={displayName}
          secondaryText={title}
          leftAvatar={<Avatar src={photoURL} />}
          // rightIcon={<CommunicationChatBubble />}
        />
      )
    })
  }
  return (
    <div>
      <List>
        {discussionList}
      </List>
    </div>
  );
};

export default GroupDiscussions;
