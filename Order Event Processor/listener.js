var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require('http');

// local modules
var eventHubListener = require("./orderEventConsumer.js");
var orderCreatedEventProcessor = require("./loyaltyProgramInvoker.js");

var PORT = process.env.PORT || 8099;
var APP_VERSION = "0.0.11"
var APP_NAME = "Soaring Avro Event Monitor MS"
console.log("Running " + APP_NAME + " version " + APP_VERSION + "; listening at port " + PORT);

var totalEventCount = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(PORT);

console.log("Listening to Port ->" + PORT);

app.get('/about', function (req, res) {
    var about = {
        "about": "Soaring Avro Event Consumer",
        "PORT": process.env.PORT,
        "APP_VERSION ": APP_VERSION
    }
    res.json(about);
})


app.get('/', function (req, res) {
    var health = { "status": "OK", "uptime": process.uptime(), "version": APP_VERSION, "numberOfEventsProcessed": totalEventCount }
    res.setHeader('Content-Type', 'application/json');
    res.send(health);
});


eventHubListener.subscribeToEvents(
    (topic, message) => {
        console.log("Avro EventBridge: Received event from event hub on topic " + topic);
        totalEventCount++;
        try {
            console.log("The event:")
            console.log(JSON.stringify(message))
            if (topic == "soaring-ordercreated-2" ) {
                orderCreatedEventProcessor.handleOrderEventHubEvent(message)
            }
            } catch (error) {
            console.log("failed to handle message from event hub", error);

        }
    }
);


// async function handleOrderEventHubEvent(message) {
//     console.log("Order Event payload " + JSON.stringify(message));
//     var event = {
//         "eventType": "ProductEvent",
//         "payload": {
//             "productIdentifier": message.productId,
//             "productCode": message.productCode.string,
//             "productName": message.productName.string,
//             "imageUrl": message.imageUrl ? message.imageUrl.string : null,
//             "price": message.price ? message.price.double : null,
//             "size": message.size ? message.size.int : null,
//             "weight": message.weight ? message.weight.double : null,
//             "categories": message.categories,
//             "tags": message.tags,
//             "dimension": message.dimension ? {
//                 "unit": message.dimension.unit ? message.dimension.unit.string : null,
//                 "length": message.dimension.length ? message.dimension.length.double : null,
//                 "height": message.dimension.height ? message.dimension.height.double : null,
//                 "width": message.dimension.width ? message.dimension.width.double : null
//             } : null,
//             "color": message.color ? message.color.string : null

//         }
//         ,
//         "module": "products.microservice",
//         "transactionIdentifier": message.productId,
//         "timestamp": getTimestampAsString()
//     }

//     var product =
//         {
//             "id": message.productId,
//             "name": message.productName.string,
//             "weight": message.weight ? message.weight.double : null,
//             "dimension": message.dimension ? {
//                 "unit": message.dimension.unit ? message.dimension.unit.string : null,
//                 "length": message.dimension.length ? message.dimension.length.double : null,
//                 "height": message.dimension.height ? message.dimension.height.double : null,
//                 "width": message.dimension.width ? message.dimension.width.double : null
//             } : null,
//             "categories": message.categories
//         }
// }


getTimestampAsString = function (theDate) {
    var sd = theDate ? theDate : new Date();
    try {
        var ts = sd.getUTCFullYear() + '-' + (sd.getUTCMonth() + 1) + '-' + sd.getUTCDate() + 'T' + sd.getUTCHours() + ':' + sd.getUTCMinutes() + ':' + sd.getSeconds();
        return ts;
    } catch (e) { "getTimestampAsString exception " + JSON.stringify(e) }
}

