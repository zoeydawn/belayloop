import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import moment from 'moment';

import MessageModal from './MessageModal';
import JoinModal from './JoinModal';

export default class PostCard extends Component {
  state = { messageOpen: false, joinOpen: false }

  handleOpen = (modal) => {
    this.setState({ [modal]: true });
  }

  handleClose = (modal) => {
    this.setState({ [modal]: false });
  }

  render() {
    const { user, gym, timestamp, message, climbType } = this.props.post;
    const { uid, photoURL, displayName } = user;
    const { messageOpen, joinOpen } = this.state;
    const dateAndTime = moment(JSON.parse(timestamp)).format('dddd MMMM Do, h:mm a');
    // console.log('this.props.user:', this.props.user);

    return (
      <Card>
        <CardHeader
          title={`${climbType} with ${displayName} ${moment(JSON.parse(timestamp)).fromNow()}`}
          avatar={<Avatar className="pointer" src={photoURL} onClick={() => browserHistory.push(`/profile/${uid}`)} />}
        />
        <CardTitle
          title={`${displayName} wants to ${climbType} at ${gym.name}`}
          subtitle={`Join them on ${dateAndTime}`}
        />
        <CardText>
          {message}
        </CardText>
        <CardActions>
          <FlatButton
            label="Message"
            onClick={() => this.handleOpen('messageOpen')}
          />
          <FlatButton
            label="Join!"
            primary
            onClick={() => this.handleOpen('joinOpen')}
          />
        </CardActions>
        <MessageModal
          displayName={displayName}
          submit={this.props.submitMessage}
          userId={uid}
          photoURL={photoURL}
          open={messageOpen}
          handleOpen={() => this.handleOpen('messageOpen')}
          handleClose={() => this.handleClose('messageOpen')}
        />
        <JoinModal
          displayName={displayName}
          submit={this.props.submitMessage}
          userId={uid}
          photoURL={photoURL}
          open={joinOpen}
          gym={gym.name}
          climbType={climbType}
          dateAndTime={dateAndTime}
          day={moment(JSON.parse(timestamp)).format('dddd MMMM Do')}
          handleOpen={() => this.handleOpen('joinOpen')}
          handleClose={() => this.handleClose('joinOpen')}
          user={this.props.user}
        />
      </Card>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  submitMessage: PropTypes.func,
};
