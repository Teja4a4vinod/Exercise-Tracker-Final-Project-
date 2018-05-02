const fs = require('fs');
const path = require('path');
const qs = require('qs');
class Friends {
  constructor() {
    this.path = path.join(__dirname, './../data/friends.json');
  }
  findAllFriends() {
    let self = this;
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, friends) => {
        if (err) return reject(err);
        if (friends === '') friends = [];
        if (typeof friends === 'string') friends = JSON.parse(friends);
        return resolve(friends);
      })
    });
  }

  addFriend(req) {
    let body;
    body = qs.parse(req.body);
    let self = this;
    return new Promise((resolve, reject) => {
      this.findAllFriends()
        .then(friends => {
          let filter = friends.map(item => item.email);

          if (filter.indexOf(req.body.email) >= 0) {
            return resolve({ status: true, message: `You've already registered` })
          }

          req.body.isLogin = false;
          friends.push(req.body);
          fs.writeFile(this.path, JSON.stringify(friends), 'utf8', (err, success) => {
            if (err) return reject(err);
            return resolve({ status: true, message: 'Friend added successfully' });
          });
        });
    })
  }

  getFriend(req) {
    let body;
    if (typeof req.body === 'string') body = JSON.parse(req.body);
    body = req.body;
    let self = this;
    return new Promise((resolve, reject) => {
      this.findAllFriends()
        .then(friends => {
          let filter = friends.map(item => item.email);
          let index = filter.indexOf(body.email);
          if (index >= 0) {
            if (String(friends[index].password) === String(req.body.password)) {
              friends[index].isLogin = true;
              fs.writeFile(this.path, JSON.stringify(friends), 'utf8', (err, success) => {
                if (err) return reject(err);
                return resolve({ status: true, message: `Logged in successfully` });
              });
            } else {
              return reject({ status: false, message: `Invalid  credentials` })
            }
          } else {
            return reject({ status: false, message: `You are not registered` })
          }
        });
    })
  }
  updateStatus(req) {
    let body;
    if (typeof req.body === 'string') body = JSON.parse(req.body);
    body = req.body;
    let self = this;
    return new Promise((resolve, reject) => {
    this.findAllFriends()
      .then(friends => {
        let filter = friends.map(item => item.email);
        let index = filter.indexOf(body.email);
        if (index >= 0) {
          friends[index].isLogin = false;
          fs.writeFile(this.path, JSON.stringify(friends), 'utf8', (err, success) => {
            if (err) return reject(err);
            return resolve({ status: true, message: `Logged out successfully` });
          });

        } else {
          return reject({ status: false, message: `You are not registered` })
        }
      });
    });
  }
}

module.exports = new Friends();


