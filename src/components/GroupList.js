import React from 'react';
import { browserHistory } from 'react-router';
// import MobileTearSheet from '../../../MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
// import ActionInfo from 'material-ui/svg-icons/action/info';
// import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
// import FileFolder from 'material-ui/svg-icons/file/folder';
// import ActionAssignment from 'material-ui/svg-icons/action/assignment';
// import { blue500, yellow600 } from 'material-ui/styles/colors';
// import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

const GroupList = (props) => {
  // console.log('props.listObj:', props.listObj);
  const { listObj } = props;
  let listItems = 'nothing here';
  if (listObj) {
    listItems = Object.keys(listObj).map((item) => {
      const { name, description } = listObj[item];
      // console.log('listObj[item]:', listObj[item]);
      return (
        <ListItem
          key={item}
          // leftAvatar={<Avatar src={image} />}
          // rightIcon={<ActionInfo />}
          primaryText={name}
          secondaryText={description}
          onClick={() => browserHistory.push(`/group/${item}`)}
        />
      );
    });
  }

  return (
    <List>
      <Subheader inset>Climbing Groups:</Subheader>
      {listItems}
    </List>
  );
};

export default GroupList;
