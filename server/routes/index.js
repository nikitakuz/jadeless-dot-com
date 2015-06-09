var url = require('url');

module.exports = {
  route: function(request, response) {
    var uri = url.parse(request.url).pathname;

    if (uri === '/') {
      require('./homepage').render(request, response);
    } else {
      require('./static').render(uri, response);
    }
  }
};