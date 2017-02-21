import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAQ8Col4_0hXFclNtw0_iDZcsYezgn8lwo",
  authDomain: "affiliato-10bb0.firebaseapp.com",
  databaseURL: "https://affiliato-10bb0.firebaseio.com",
  storageBucket: "affiliato-10bb0.appspot.com",
  messagingSenderId: "711603742996"
};

firebase.initializeApp(config);
export const database = app.database();
