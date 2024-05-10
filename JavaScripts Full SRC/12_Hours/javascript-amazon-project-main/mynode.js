var http = require('http');
//var dt = require('./myfirtsmodule');
var fs = require('fs');

http.createServer(function (req, res) {
  fs.readFile('amazon.html',function(err,data){
     res.writeHead(200,{'Content-Type': 'text/html'});
     //res.write(dt);
     res.write(data);
     return res.end();
  });
}).listen(3000);