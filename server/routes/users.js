const express = require('express');
const multer = require('multer');

const router = express.Router();

const User = require('../models/User');

// ADD OR UPDATE USER
router.post('/update', (req, res) => {
  User.find({ user_id: req.body.user_id })
    .then((user) => {
      if (user) {
        User.findOneAndUpdate(
          { user_id: req.body.user_id },
          { $set: req.body },
          { new: true }
        )
        .then(updatedUser => res.send(updatedUser))
        .catch(err => res.status(400).send(err));
      } else {
        User.create(req.body)
        .then(newUser => res.send(newUser))
        .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(err));
});

module.exports = router;
