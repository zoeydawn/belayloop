import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';

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

export default class Map extends Component {
  state = { infoWindows: [] }
  // onMapCreated = (map) => {
  //   map.setOptions({
  //     // disableDefaultUI: true,
  //   });
  // }
  //
  // onDragEnd = (e) => {
  //   console.log('onDragEnd', e);
  // }
  //
  // onCloseClick = () => {
  //   console.log('onCloseClick');
  // }
  //
  // onClick = (e) => {
  //   console.log('onClick', e);
  // }
  //
  // // viewInfo = (lat, lng, content) => {
  // //   this.setState({
  // //     lat,
  // //     lng,
  // //     content,
  // //   });
  // // }
  //
  // render() {
  //   console.log('process.env.API_KEY:', process.env.API_KEY);
  //   return (
  //     <Gmaps
  //       width={'100%'}
  //       height={'600px'}
  //       lat={coords.lat}
  //       lng={coords.lng}
  //       zoom={4}
  //       loadingMessage={'Loading map...'}
  //       params={{ v: '3.exp', key: process.env.API_KEY }}
  //       onMapCreated={this.onMapCreated}
  //     >
  //       <Marker
  //         lat={coords.lat}
  //         lng={coords.lng}
  //         draggable={false}
  //         // onDragEnd={this.onDragEnd}
  //         // onClick={() => {}}
  //         animation={'DROP'}
  //       />
  //       <InfoWindow
  //         lat={coords.lat}
  //         lng={coords.lng}
  //         content={'content'}
  //         open={false}
  //         onCloseClick={this.onCloseClick}
  //       />
  //       <Circle
  //         lat={coords.lat}
  //         lng={coords.lng}
  //         radius={500}
  //         onClick={this.onClick}
  //       />
  //     </Gmaps>
  //   );
  // }

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
    return points.map((coords, index) => {
      if (!infoWindows[index]) return null;
      return (
        <InfoWindow
          key={index}
          lat={coords.lat}
          lng={coords.lng}
          onCloseClick={() => this.toggleInfoWindow(index)}
        />
      );
    });
  }

  renderMarkers() {
    const { points } = this.props;
    console.log('points:', points);
    return points.map((coords, index) =>
      <Marker
        key={index}
        lat={coords.lat}
        lng={coords.lng}
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
        params={{ v: '3.exp', key: 'AIzaSyA1ClOXgxqrpOrHvkyB7oFm8hqsxss7tA8' }}
      >
        {this.renderMarkers()}
        {this.renderInfoWindows()}
      </Gmaps>
    );
  }
}
