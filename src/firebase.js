import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB5y04A2ENhX3UT6tNTtvx3SuITbLCg27s',
  authDomain: 'belayloop-472f1.firebaseapp.com',
  databaseURL: 'https://belayloop-472f1.firebaseio.com',
  storageBucket: 'belayloop-472f1.appspot.com',
  messagingSenderId: '254688916075',
};

// firebase.initializeApp(config);
// export const database = app.database();
export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
