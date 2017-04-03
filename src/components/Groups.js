import React, { Component, PropTypes } from 'react';
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
      <div className="profile">
        <div className="pageLeft" />
        <div className="profileCenter">
          <GroupList listObj={groups} />
          <AddGroup submit={addGroup} />
        </div>
        <div className="profileRight" />
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

Groups.propTypes = {
  addGroup: PropTypes.func,
  listenToGroups: PropTypes.func,
  groups: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
