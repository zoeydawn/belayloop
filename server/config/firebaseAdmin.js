const admin = require('firebase-admin');
const path = require('path');

const configPath = path.join(__dirname, '../../firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(configPath),
  databaseURL: "https://belayloop-472f1.firebaseio.com/",
});

module.exports = admin;
