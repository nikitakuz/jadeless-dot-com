var path = require('path');
var jade = require('jade');
var data = rootRequire('server/lib/data');

module.exports = {
  render: function(request, response) {
    data.getHomepage(function(data) {
      var indexPath = path.join(process.cwd(), '/client/src/index.jade');
      var fn = jade.compileFile(indexPath, {});
      var html = fn({ homepage: data });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(html, 'binary');
      response.end();
    });
  }
};