/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var server = require('./services/rest-server.js');
var config = require('./config/config.js');
var data = require('./data/pointsdb.js');


var dataSource = data.open(config);
var router = require('./services/router.js');
var controller = require('./controllers/pointsController.js');

var pointsController = controller(dataSource);
var pointsRouter =  router(pointsController);

//starts the server with the given configuration and using a specific data repository
server.start (config, pointsRouter); 

