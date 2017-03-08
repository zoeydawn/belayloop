import React, { Component } from 'react';
import { connect } from 'react-redux';
// import RaisedButton from 'material-ui/RaisedButton';

import AddGroup from './AddGroup';
import GroupList from './GroupList';

import { addGroup, listenToGroups } from '../actions/firebaseDb';

class Groups extends Component {
  componentDidMount() {
    this.props.listenToGroups();
  }

  render() {
    const { addGroup, groups } = this.props;
    // console.log('this.props.groups:', this.props.groups);
    return (
      <div>
        {/* <RaisedButton label="Add a Gym" style={{ margin: 12 }} /> */}
        <GroupList listObj={groups} />
        <AddGroup submit={addGroup} />
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  groups: state.groups,
}));

const mapDispatchToProps = dispatch => ({
  addGroup(obj) {
    dispatch(addGroup(obj));
  },
  listenToGroups() {
    dispatch(listenToGroups());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
