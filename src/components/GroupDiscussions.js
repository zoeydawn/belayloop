import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const GroupDiscussions = (props) => {
  const { discussions, groupId, type } = props;
  let discussionList = 'This page does not yet have any discussions';
  if (discussions) {
    discussionList = Object.keys(discussions).map((conversationId) => {
      const { title, displayName, photoURL } = discussions[conversationId];
      return (
        <ListItem
          key={conversationId}
          onClick={() => browserHistory.push(`/discussion/${conversationId}/${type}/${groupId}`)}
          primaryText={displayName}
          secondaryText={title}
          leftAvatar={<Avatar src={photoURL} />}
        />
      );
    });
  }
  return (
    <div>
      <List>
        {discussionList}
      </List>
    </div>
  );
};

GroupDiscussions.propTypes = {
  discussions: PropTypes.object,
  groupId: PropTypes.string,
  type: PropTypes.string,
};

export default GroupDiscussions;
