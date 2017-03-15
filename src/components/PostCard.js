import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';

import Message from './Message';

const PostCard = (props) => {
  const { user, gym, timestamp, message, climbType } = props.post;
  const { uid, photoURL, displayName } = user;
  // let photoURL = '';
  // if (user) {
  //   photoURL = user.photoURL;
  // }
  console.log('props.post:', props.post);
  return (
    <Card>
      <CardHeader
        title={`${climbType} with ${displayName} ${moment(JSON.parse(timestamp)).fromNow()}`}
        // subtitle="Subtitle"
        avatar={photoURL}
      />
      <CardTitle
        title={`${displayName} wants to ${climbType} at ${gym.name}`}
        subtitle={`Join them on ${moment(JSON.parse(timestamp)).format('dddd MMMM Do, h:mm a')}`}
      />
      <CardText>
        {message}
      </CardText>
      <CardActions>
        <FlatButton
          label="Message"
          // primary
        />
        {/* <Message
          displayName={displayName}
          // submit={this.props.startConversation}
          userId={uid}
          photoURL={photoURL}
        /> */}
        <FlatButton
          label="Join"
          primary
          // keyboardFocused
        />
      </CardActions>
    </Card>
  );
};

PostCard.propTypes = {
  post: React.PropTypes.object.isRequired,
};

export default PostCard;
