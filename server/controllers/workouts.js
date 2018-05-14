const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Workouts {
  constructor() {
    this.Workouts = [{ type: 'Running' }, { type: 'Jogging' }, { type: 'Pushups' },{type: 'Walking'},{type: 'Swimming'},{type: 'Jumping'},{type: 'Skipping'},{type: 'Step-Ups'},{type: 'Jump Squats'},{type: 'Jumba'},{type: 'Badminton'}];
    this.actitivities = [];
  }
  FetchAllWorkouts() {
    return this.Workouts;
  }
  FetchAllActivities(req) {
    if (typeof req === 'string')
      req = JSON.parse(req);
      let filter = this.actitivities.filter(item =>{
      if(req.query.isPrivate==='false'){
        if((item.email === req.query.email) && !item.isPrivate){
          return true
        }else{
          return false;
        }
      }else if((item.email === req.query.email)){
        return true
      }else{return false}
    });
    return filter;
  }

  addActivity(req) {
    if (typeof req.body == 'string') {
      JSON.parse(req.body)
    }
    req.body.createdAt=moment().format('MMMM Do YYYY, h:mm:ss a');;

    this.actitivities.push(req.body);
    return ({ status: true, message: 'Activity added successfully' })
  }
}

module.exports = new Workouts();


