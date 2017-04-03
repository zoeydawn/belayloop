import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { List, ListItem } from 'material-ui/List';

const GroupList = (props) => {
  const { listObj } = props;
  let listItems = 'nothing here';
  if (listObj) {
    listItems = Object.keys(listObj).map((item) => {
      const { name, description } = listObj[item];
      return (
        <ListItem
          key={item}
          primaryText={name}
          secondaryText={description}
          onClick={() => browserHistory.push(`/group/${item}`)}
        />
      );
    });
  }

  return (
    <List>
      <h1 className="soft">Climbing Groups:</h1>
      {listItems}
    </List>
  );
};

GroupList.propTypes = {
  listObj: PropTypes.object,
};

export default GroupList;
