const express = require('express');
const router = express.Router();
const friends = require('./../controllers/friends');
const workouts = require('./../controllers/workouts');

router.get('/friends', (req, res, next) => {
  friends.findAllFriends()
    .then(friends => res.status(200).send(friends)
    ).catch(err => res.status(422).send(err));
});

router.post('/login', (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    res.status(400).send({ status: false, message: 'email & password must be provided' })
  friends.getFriend(req)
    .then(success => res.status(200).send(success)
    ).catch(err => res.status(422).send(err));
});

router.post('/register', (req, res, next) => {
  if(typeof req.body ==='string') req.body=JSON.parse(req.body);
  if (Object.keys(req.body).length === 0)
    res.status(400).send({ status: false, message: 'username,email & password must be provided' })
  friends.addFriend(req)
    .then(success => res.status(200).send(success)
    ).catch(err => res.status(422).send(err));
});

router.get('/workouts', (req, res, next) => res.status(200).send(workouts.FetchAllWorkouts(req)));
router.get('/activities', (req, res, next) => res.status(200).send(workouts.FetchAllActivities(req)));
router.get('/friends'), (req, res, next) => res.status(200).send(friends.getSearch(req)));

router.post('/activity', (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    res.status(400).send({ status: false, message: 'activity & email must be provided' });
  res.status(200).send(workouts.addActivity(req))
});

router.post('/logout', (req, res, next) => {
  friends.updateStatus(req)
    .then(success => res.status(200).send(success)
    ).catch(err => res.status(422).send(err));
});

module.exports = router;
