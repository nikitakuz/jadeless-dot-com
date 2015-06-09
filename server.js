global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}

var http = require('http');
var port = parseInt(process.env.PORT || '5000', 10);

var server = http.createServer(function (request, response) {
  require('./server/routes').route(request, response);
});

server.listen(port, '0.0.0.0', function() {
  var a = server.address();
  console.log('App listening at http://%s:%s', a.address, a.port);
  console.log("Press Ctrl+C to quit.");
});