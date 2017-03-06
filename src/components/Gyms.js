import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import AddGym from './AddGym';
import SimpleList from './SimpleList';

import { addGym, listenToGyms } from '../actions/firebaseDb';

class Gyms extends Component {
  componentDidMount() {
    this.props.listenToGyms();
  }

  render() {
    const { addGym, gyms } = this.props;
    // console.log('this.props.gyms:', this.props.gyms);
    return (
      <div>
        {/* <RaisedButton label="Add a Gym" style={{ margin: 12 }} /> */}
        <SimpleList listObj={gyms} />
        <AddGym submit={addGym} />
      </div>
    );
  }
}

const mapStateToProps = (state => ({
  gyms: state.gyms,
}));

const mapDispatchToProps = dispatch => ({
  addGym(obj) {
    dispatch(addGym(obj));
  },
  listenToGyms() {
    dispatch(listenToGyms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gyms);
