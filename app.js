// Get http, fs, and path
const http = require('http');
const fs = require('fs');
const webpack = require('webpack');
const webpack_config = require('./webpack.config');

webpack(webpack_config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log("Unable to complete webpack!");
        console.log(err);
        console.log(stats);
    } else {
        console.log("Finished compiling webpack!");
    }
});

console.log("Listening on localhost:8000");

// Start a server at port 8000
http.createServer((request, response) => {
    console.log(request.url);

    // Check if this is a main.js request
    if (request.url === "/mod.js") {
        const contentType = "text/javascript";
        const content = fs.readFileSync("./main.js");
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    } else {
        response.writeHead(404, { 'Content-type': 'text/plan' });
        response.write('Invalid URL Try : http://localhost:8000/mod.js');
        response.end();
    }
}).listen(8000);
