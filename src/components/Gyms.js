import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Map from './Map';
import AddGym from './AddGym';
import GymList from './GymList';

import { addGym, listenToGyms } from '../actions/firebaseDb';

class Gyms extends Component {
  componentDidMount() {
    this.props.listenToGyms();
  }

  render() {
    const { addGym, gyms } = this.props;
    let mapPoints = [];
    if (gyms) {
      mapPoints = Object.keys(gyms).map((gym) => {
        // console.log('gym:', gym);
        return gyms[gym].location;
      });
    }
    return (
      <div>
        <Map points={mapPoints} />
        <div className="profile">
          <div className="pageLeft" />
          <div className="profileCenter">
            <GymList listObj={gyms} />
            <AddGym submit={addGym} />
          </div>
          <div className="profileRight" />
        </div>
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

Gyms.propTypes = {
  addGym: PropTypes.func,
  listenToGyms: PropTypes.func,
  gyms: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gyms);
