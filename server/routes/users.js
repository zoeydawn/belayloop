const express = require('express');

const router = express.Router();

const admin = require('../config/firebaseAdmin');
const authMiddleware = require('../config/authMiddleware');

// GET USER INFO
router.get('/:userId', (req, res) => {
  admin.auth().getUser(req.params.userId)
  .then((userRecord) => {
    const { displayName, photoURL, metadata } = userRecord;
    const userInfo = {
      displayName,
      photoURL,
      metadata,
    };
    console.log('Successfully fetched user data:', userRecord.toJSON());
    return res.send(userInfo);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    return res.status(400);
  });
});

// UPDATE USER INFO
router.put('/', authMiddleware, (req, res) => {
  // const { uid } = req.body;
  console.log('req.body in routes:', req.body);
  admin.auth().getUser(req.user).updateProfile(req.body)
  .then((userRecord) => {
    // const { displayName, photoURL, metadata } = userRecord;

    console.log('Successfully updated user:', userRecord.toJSON());
    return res.send(userRecord);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    return res.status(400);
  });
});

module.exports = router;
