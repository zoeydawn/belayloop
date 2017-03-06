import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import AddGym from './AddGym';

import { addGym, listenToGyms } from '../actions/firebaseDb';

class Gyms extends Component {
  componentDidMount() {
    this.props.listenToGyms();
  }

  render() {
    console.log('this.props.gyms:', this.props.gyms);
    return (
      <div>
        {/* <RaisedButton label="Add a Gym" style={{ margin: 12 }} /> */}
        <AddGym submit={this.props.addGym} />
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
