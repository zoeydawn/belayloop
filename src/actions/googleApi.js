import axios from 'axios';

export function getLocation(address) {
  return new Promise((res, rej) => {
    const location = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA1ClOXgxqrpOrHvkyB7oFm8hqsxss7tA8`)
    .then((res) => {
      const { lat, lng } = res.data.results[0].geometry.location;
      // console.log('lat:', lat);
      // console.log('lng:', lng);
      return { lat, lng };
    })
    .catch(err => console.error('error getting location', err));
    if (location) {
      res(location);
    } else {
      rej('lat/lng api request failed');
    }
  });
}
