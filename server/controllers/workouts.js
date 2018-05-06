const fs = require('fs');
const path = require('path');
const moment = require('moment');

class Workouts {
  constructor() {
    this.Workouts = [{ type: 'Running' }, { type: 'Jogging' }, { type: 'Pushups' }];
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
    req.body.createdAt=moment().format("HH:mm:ss");;

    this.actitivities.push(req.body);
    return ({ status: true, message: 'Activity added successfully' })
  }
}

module.exports = new Workouts();

