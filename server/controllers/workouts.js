const fs = require('fs');
const path = require('path');

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
    let filter = this.actitivities.filter(item => item.email === req.query.email);
    return filter;
  }

  addActivity(req) {
    if (typeof req.body == 'string') {
      JSON.parse(req.body)
    }

    this.actitivities.push(req.body);
    return ({ status: true, message: 'Activity added successfully' })
  }
}

module.exports = new Workouts();


