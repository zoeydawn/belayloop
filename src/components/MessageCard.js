import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const MessageCard = (props) => {
  const { details, conversationId } = props;
  const { displayName, photoURL, subject, uid } = details;

  return (
    <Card onClick={() => browserHistory.push(`conversation/${conversationId}`)}>
      <CardHeader
        actAsExpander
        title={displayName}
        subtitle={subject}
        avatar={photoURL}
      />
    </Card>
  );
};

export default MessageCard;
