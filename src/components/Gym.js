import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { listenToGym } from '../actions/firebaseDb';
// import { startListeningToUser, updateUserInfo } from '../actions/firebaseDb';
// import EditInfo from './EditInfo';
// import PublicInfoModal from './PublicInfoModal';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  componentDidMount() {
    this.props.listenToGym(this.props.params.id);
    // console.log('this.props.params:', this.props.params);
    // console.log('this.props.gyms:', this.props.gyms);
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { currentGym } = this.props;
    // // const { belay, bio, boldering, city, country, lead, skill, state } = userDetails;
    // const { displayName, email, uid, photoURL } = this.props.user;
    // let details = {
    let address = '';
    let city = '';
    let description = '';
    let image = '';
    let name = '';
    let offerings = '';
    let size = '';
    let state = '';
    let streetAddress = '';
    let wallHeight = '';
    let website = '';
    // }let
    if (currentGym) {
      const { boldering, top, lead } = currentGym.offering;
      // details = {
      address = currentGym.address;
      city = currentGym.city;
      description = currentGym.description;
      image = currentGym.image;
      name = currentGym.name;
      // offering = currentGym.offering;
      size = currentGym.size;
      state = currentGym.state;
      streetAddress = currentGym.streetAddress;
      wallHeight = currentGym.wallHeight;
      website = currentGym.website;
      // };
      offerings = boldering ? offerings + ' boldering,' : offerings;
      offerings = top ? offerings + ' top rope,' : offerings;
      offerings = lead ? offerings + ' lead' : offerings;
    }

    // console.log('this.props.currentGym:', this.props.currentGym);
    return (
      <div>
        <div className="profile">
          {/* <h1>Gym</h1> */}
          <div className="profileLeft">
            <img className="profileAvatar" src={image} alt={name} />
            <p>{size} square feet</p>
            <p>{wallHeight} foot walls</p>
            <p>{offerings}</p>
            <a href={website} target="_blank" rel="noopener noreferrer">Website</a>
            <br />
            <a href={`http://maps.google.com/?q=${address}`} target="_blank" rel="noopener noreferrer">Map</a>
          </div>
          <div className="profileCenter">
            <h1>{name}</h1>
            <h3>{`${city}, ${state.substring(0, 2)}`}</h3>
            <p>{description}</p>
          </div>
          <div className="profileRight"></div>
        </div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          >
          <Tab label="Climbers" value="a" >
            <div>
              <h2 style={styles.headline}>Climbers</h2>
              {/* <p>
                Tabs are also controllable if you want to programmatically pass them their values.
                This allows for more functionality in Tabs such as not
                having any Tab selected or assigning them different values.
              </p> */}
            </div>
          </Tab>
          <Tab label="Reviews" value="b">
            <div>
              <h2 style={styles.headline}>Reviews</h2>
              {/* <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p> */}
            </div>
          </Tab>
        </Tabs>

      </div>
    );
  }
}

const mapStateToProps = (state => ({
  currentGym: state.currentGym,
}));

const mapDispatchToProps = dispatch => ({
  listenToGym(id) {
    dispatch(listenToGym(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gym);