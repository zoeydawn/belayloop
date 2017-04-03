import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const GymList = (props) => {
  const { listObj } = props;
  let listItems = 'nothing here';
  if (listObj) {
    listItems = Object.keys(props.listObj).map((item) => {
      const { name, city, state, image } = listObj[item];
      return (
        <ListItem
          key={item}
          leftAvatar={<Avatar src={image} />}
          primaryText={name}
          secondaryText={`${city}, ${state.substring(0, 2)}`}
          onClick={() => browserHistory.push(`/gym/${item}`)}
        />
      );
    });
  }

  return (
    <List>
      <h1 className="soft">Climbing Gyms:</h1>
      {listItems}
    </List>
  );
};

GymList.propTypes = {
  listObj: PropTypes.object,
};

export default GymList;
