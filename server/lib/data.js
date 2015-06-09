var Firebase = require('firebase');

var fref = new Firebase('https://jadeless-dot-com.firebaseio.com/');

module.exports = {
  getHomepage: function(callback) {
    fref.child('homepage').once('value', function (snap) {
      callback(snap.val());
    });
  }
};