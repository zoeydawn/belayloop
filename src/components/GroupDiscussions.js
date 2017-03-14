import React from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const GroupDiscussions = (props) => {
  const { discussions, groupId } = props;
  let discussionList = 'This group does not yet have any discussions';
  if (discussions) {
    discussionList = Object.keys(discussions).map((conversationId) => {
      const { title, displayName, photoURL, uid, initialComment } = discussions[conversationId];
      return (
        <ListItem
          key={conversationId}
          onClick={() => browserHistory.push(`/discussion/${conversationId}/${groupId}`)}
          primaryText={displayName}
          secondaryText={title}
          leftAvatar={<Avatar src={photoURL} />}
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
