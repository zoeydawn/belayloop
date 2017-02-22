const atob = require('atob');

const admin = require('./firebaseAdmin');

module.exports = function(req, res, next) {
  let token = req.headers['x-auth-token'];
  // console.log('req.headers:', req.headers);
  admin.auth().verifyIdToken(token || '')
    .then(() => {
      req.user = JSON.parse(atob(token.split('.')[1]));
      next();
    })
    .catch((err) => {
      console.log('authenication error');
      res.status(401).send({ error: 'Must be authenticated' });
    });
};
