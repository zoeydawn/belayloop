import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

const SimpleList = (props) => {
  // console.log('props.listObj:', props.listObj);
  const { listObj } = props;
  let listItems = "nothing here";
  if (listObj) {
    listItems = Object.keys(props.listObj).map(item => {
      const { name, city, state, image } = listObj[item];
      console.log('listObj[item]:', listObj[item]);
      return (
        <ListItem
          key={item}
          leftAvatar={<Avatar src={image} />}
          rightIcon={<ActionInfo />}
          primaryText={name}
          secondaryText={city}
        />
      );
    });
  }

  return (
    <div>
      <List>
        <Subheader inset={true}>Climbing Gyms:</Subheader>
        {listItems}
        {/* <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIcon={<ActionInfo />}
          primaryText="Photos"
          secondaryText="Jan 9, 2014"
        />
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIcon={<ActionInfo />}
          primaryText="Recipes"
          secondaryText="Jan 17, 2014"
        />
        <ListItem
          leftAvatar={<Avatar icon={<FileFolder />} />}
          rightIcon={<ActionInfo />}
          primaryText="Work"
          secondaryText="Jan 28, 2014"
        /> */}
      </List>
      {/* <Divider inset={true} />
      <List>
        <Subheader inset={true}>Files</Subheader>
        <ListItem
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
          rightIcon={<ActionInfo />}
          primaryText="Vacation itinerary"
          secondaryText="Jan 20, 2014"
        />
        <ListItem
          leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
          rightIcon={<ActionInfo />}
          primaryText="Kitchen remodel"
          secondaryText="Jan 10, 2014"
        />
      </List> */}
    </div>
  );
};

export default SimpleList;
