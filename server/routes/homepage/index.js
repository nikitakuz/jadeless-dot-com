var path = require('path');
var jade = require('jade');

module.exports = {
  render: function(request, response) {
    var indexPath = path.join(process.cwd(), '/client/src/index.jade');
    var fn = jade.compileFile(indexPath, {});
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(fn(), 'binary');
    response.end();
  }
};