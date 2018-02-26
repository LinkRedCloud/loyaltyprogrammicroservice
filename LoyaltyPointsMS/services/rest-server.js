/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require ('express');
var bodyParser = require ('body-parser');

function start (config, router) {
    var app = express();
    
    app.use(bodyParser.json());

    app.use("/", router);

    var server = app.listen(config.server.port);
}

module.exports.start = start;