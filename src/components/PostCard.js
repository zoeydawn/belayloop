import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import moment from 'moment';

import MessageModal from './MessageModal';

export default class PostCard extends Component {
  state = { messageOpen: false }

  handleMessageOpen = () => {
    this.setState({ messageOpen: true });
  }

  handleMessageClose = () => {
    this.setState({ messageOpen: false });
  }
// Message
  render() {
    const { user, gym, timestamp, message, climbType } = this.props.post;
    const { uid, photoURL, displayName } = user;
    const { messageOpen } = this.state;

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
            onClick={this.handleMessageOpen}
          />
          <FlatButton
            label="Join!"
            primary
            // keyboardFocused
          />
        </CardActions>
        <MessageModal
          displayName={displayName}
          submit={this.props.submitMessage}
          userId={uid}
          photoURL={photoURL}
          open={messageOpen}
          handleOpen={this.handleMessageOpen}
          handleClose={this.handleMessageClose}
        />
      </Card>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  submitMessage: PropTypes.func,
};
