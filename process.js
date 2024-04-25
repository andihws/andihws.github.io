const http = require('http');
let url = require('url');
var qs = require('querystring');
var fs = require('fs');
const { find } = require('./find');

var port = process.env.PORT || 8080;


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let urlObj = url.parse(req.url, true);    
    if (urlObj.pathname == "/") {
        fs.readFile("./index.html", (err, html) => {
            if (err) throw err;
            res.write(html);
        });
        res.end();
    } else if (urlObj.pathname == "/process") {
        let query = urlObj.query;
        if (query.filter == "ticker") {
            find(query.search, true);
        } else if (query.filter == "company") {
            find(query.search, false);
        }
        res.end();
    }

}).listen(port);
