import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const MessageCard = (props) => {
  const { details, conversationId } = props;
  const { displayName, photoURL, subject, uid } = details;
  // console.log('details:', details);
  // console.log('details:', details);
  return (
    <Card onClick={() => browserHistory.push(`conversation/${conversationId}`)}>
      <CardHeader
        actAsExpander
        title={displayName}
        subtitle={subject}
        avatar={photoURL}
      />
      {/* <CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
      >
        <img src="images/nature-600-337.jpg" />
      </CardMedia> */}
      {/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
      {/* <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label="Action2" />
      </CardActions> */}
    </Card>
  );
};

export default MessageCard;
