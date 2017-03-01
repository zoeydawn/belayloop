import React, { Component } from 'react';
import { browserHistory } from 'react-router';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
//
// import { getUser } from '../actions/userActions';
// import { startListeningToUser, startConversation } from '../actions/firebaseDb';
// import MessageCard from './MessageCard';

class Messages extends Component {

  render() {
    const { loggedUser } = this.props;
    // console.log('loggedUser:', loggedUser);
    let messageList = 'Your inbox in empty';
    let messages;
    if (loggedUser && loggedUser.messages) {
      messages = loggedUser.messages;
      // console.log('messages:', messages);
      messageList = Object.keys(messages).map((conversationId) => {
        console.log('messages[conversationId]:', messages[conversationId]);
        const { displayName, photoURL, subject, read } = messages[conversationId];
        if (read) {
          return (
            <ListItem
              key={conversationId}
              onClick={() => browserHistory.push(`conversation/${conversationId}`)}
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
            onClick={() => browserHistory.push(`conversation/${conversationId}`)}
            primaryText={displayName}
            secondaryText={subject}
            leftAvatar={<Avatar src={photoURL} />}
            rightIcon={<FontIcon className="fa fa-comments" />}
          />
        );
      });
    }

    return (
      <div>
        <Subheader inset={true}>Your Conversations:</Subheader>
        <List>
          {messageList}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  loggedUser: state.loggedUser,
}));

export default connect(mapStateToProps)(Messages);
