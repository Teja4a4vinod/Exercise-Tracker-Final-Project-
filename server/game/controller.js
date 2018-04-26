var express = require('express');
var Exercise = require('./model');

var app = express.Router();


var Exercise = new Exercise();

module.exports = app
    .get('/activities', (req, res) => res.send( Exercise.GetActivities() ) )
    .get('/state', (req, res) => res.send(Exercise) )
    .get('/users', (req, res) => res.send( Exercise.GetUsers(req.query.userId)))
    .get('/workouts', (req, res) => res.send( Exercise.DisplayActivities()))
    .post('/activities', (req, res) => {
        res.send( Exercise.SubmitActivity(req.body.Text, req.body.UserId))

        console.log(req.body)
    })