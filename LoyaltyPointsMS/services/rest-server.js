/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require ('express');
var bodyParser = require ('body-parser');


function listenEvents (config) {
    console.log ("I am listening to kafka on " + config.kafka.brokerIp + ":" + config.kafka.brokerPort);
}


function start (config, router) {
    var app = express();
    
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })

    app.use("/", router);

    var server = app.listen(config.server.port);
    listenEvents(config);
}

module.exports.start = start;