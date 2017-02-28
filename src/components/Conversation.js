import React, { Component } from 'react';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { listenToConversation } from '../actions/firebaseDb';

class Conversation extends Component {
  componentDidMount() {
    // console.log('this.props.params.id:', this.props.params.id);
    this.props.listenToConversation(this.props.params.id);
  }

  render() {
    const { loggedUser, conversation } = this.props;
    console.log('conversation:', conversation);
    let conversationList = '';
    if (conversation) {
      conversationList = Object.keys(conversation).map((messageId) => {
        const { displayName, message, photoURL, timestamp, uid } = conversation[messageId];
        console.log('messageId:', messageId);
        return (
          <ListItem
            key={messageId}
            disabled={true}
            leftAvatar={<Avatar src={photoURL} />}
            primaryText={message}
            secondaryText={`${displayName} - ${moment(timestamp).fromNow()}`}
          >
            {/* {message} */}
          </ListItem>
        )
      });
    }

    return (
      <div>
        <List>
          {conversationList}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  conversation: state.conversation,
}));

const mapDispatchToProps = dispatch => ({
  listenToConversation(id) {
    dispatch(listenToConversation(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
