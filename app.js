var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.status(200).send('Hello, heroku!');
});

/* Include the app engine handlers to respond to start, stop, and health checks. */
app.use(require('./lib/appengine-handlers'));

var server = app.listen(process.env.PORT || '5000', '0.0.0.0', function() {
  var a = server.address();
  console.log('App listening at http://%s:%s', a.address, a.port);
  console.log("Press Ctrl+C to quit.");
});