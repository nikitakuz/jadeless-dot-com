var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = parseInt(process.env.PORT || '5000', 10);

var contentTypesByExtension = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
};

var server = http.createServer(function (request, response) {

  var uri = url.parse(request.url).pathname;

  var filename = path.join(process.cwd(), '/client/dist' + uri);

  fs.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, 'binary', function (err, file) {
      if (err) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(err + '\n');
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers['Content-Type'] = contentType;
      response.writeHead(200, headers);
      response.write(file, 'binary');
      response.end();
    });
  });
});

server.listen(port, '0.0.0.0', function() {
  var a = server.address();
  console.log('App listening at http://%s:%s', a.address, a.port);
  console.log("Press Ctrl+C to quit.");
});