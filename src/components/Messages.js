import React, { Component } from 'react';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
//
// import { getUser } from '../actions/userActions';
// import { startListeningToUser, startConversation } from '../actions/firebaseDb';
import MessageCard from './MessageCard';

class Messages extends Component {

  render() {
    const { loggedUser } = this.props;
    console.log('loggedUser:', loggedUser);
    let messageList = 'messageList';
    let messages;
    if (loggedUser) {
      messages = loggedUser.messages;
      // console.log('messages:', messages);
      messageList = Object.keys(messages).map((conversationId, i) => {
        // console.log('messages[message]:', messages[message]);
        return (
          <MessageCard
            details={messages[conversationId]}
            conversationId={conversationId}
            key={i}
          />
        );
      });
    }

    return (
      <div>
        {messageList}
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  loggedUser: state.loggedUser,
}));

export default connect(mapStateToProps)(Messages);
