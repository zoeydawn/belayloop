import React, { Component, PropTypes } from 'react';
// import { browserHistory } from 'react-router';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

// require('dotenv').config({ silent: true });
// require('dotenv').load();

// const coords = {
//   // lat: 'Chapel Hill, NC',
//   // lng: 'Chapel Hill, NC',
//   lat: 41.492537,
//   lng: -95,
// };

// const points = [{
//   lat: 35.816226,
//   lng: -79.072765,
// }, {
//   lat: 37.774929,
//   lng: -122.419416,
// }, {
//   lat: 42.360082,
//   lng: -71.058880,
// }];

// const params = { v: '3.exp', key: 'YOUR_API_KEY' };
const params = { v: '3.exp', key: 'AIzaSyA1ClOXgxqrpOrHvkyB7oFm8hqsxss7tA8' };

export default class Map extends Component {
  state = { infoWindows: [] }

  toggleInfoWindow(index) {
    const { infoWindows } = this.state;
    infoWindows[index] = !infoWindows[index];
    this.setState({
      infoWindows,
    });
  }

  renderInfoWindows() {
    const { points } = this.props;
    const { infoWindows } = this.state;
    return points.map((gym, index) => {
      const { location, id, name, type } = gym;
      if (!infoWindows[index]) return null;
      return (
        <InfoWindow
          key={index}
          lat={location.lat}
          lng={location.lng}
          content={`<a href="gym/${id}">${name}</a><p>${type}</p>`}
          onCloseClick={() => this.toggleInfoWindow(index)}
        />
      );
    });
  }

  renderMarkers() {
    const { points } = this.props;
    console.log('points:', points);
    return points.map((gym, index) =>
      <Marker
        key={index}
        lat={gym.location.lat}
        lng={gym.location.lng}
        onClick={() => this.toggleInfoWindow(index)}
      />
    );
  }

  render() {
    return (
      <Gmaps
        width={'100%'}
        height={'600px'}
        lat={'41.492537'}
        lng={'-95'}
        zoom={4}
        loadingMessage={'Loading map...'}
        params={params}
      >
        {this.renderMarkers()}
        {this.renderInfoWindows()}
      </Gmaps>
    );
  }
}

Map.propTypes = {
  points: PropTypes.array,
};
