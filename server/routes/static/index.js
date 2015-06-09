var contentTypesByExtension = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript'
};


var fs = require('fs');
var url = require('url');
var path = require('path');

module.exports = {
  render: function(uri, response) {
    var filename = path.join(process.cwd(), '/client/dist' + uri);

    fs.exists(filename, function (exists) {
      if (!exists) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) {
        // If uri is a directory and has no trailing slash, redirect to trailing slash equivalent.
        if (uri.substr(-1) !== '/') {
          response.writeHead(301, { Location: uri + '/' } );
          response.end();
          return;
        }

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
  }
}