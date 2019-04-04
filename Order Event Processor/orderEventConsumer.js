var KafkaAvro = require('kafka-avro');
var fmt = require('bunyan-format');
var kafkaLog = KafkaAvro.getLogger();

console.log("Order Events Consumer - Starting...")
var EVENT_HUB_PUBLIC_IP = process.env.EVENT_HUB_HOST || '130.61.35.61';
var SCHEMA_REGISTRY = process.env.SCHEMA_REGISTRY || 'http://130.61.35.61:8081';

console.log("Env Setting EVENT_HUB_HOST: " + EVENT_HUB_PUBLIC_IP);
console.log("Env Setting SCHEMA_REGISTRY: " + SCHEMA_REGISTRY);


var kafkaAvro = new KafkaAvro({
    kafkaBroker: EVENT_HUB_PUBLIC_IP+':9092',
    schemaRegistry: SCHEMA_REGISTRY,
    parseOptions: { wrapUnions: true }
});

kafkaAvro.init()
    .then(function () {
        console.log('Ready to use');
    });


kafkaLog.addStream({
    type: 'stream',
    stream: fmt({
        outputMode: 'short',
        levelInString: true,
    }),
    level: 'debug',
});


kafkaAvro.getConsumer({
    'group.id': 'avro-event-monitor' + new Date(),
    'socket.keepalive.enable': true,
    'enable.auto.commit': true,
},
{'auto.offset.reset': 'earliest'})
    // the "getConsumer()" method will return a bluebird promise.
    .then(function (consumer) {
        console.log("create consumer")
        // Topic Name can be a string, or an array of strings

        var topicName = ['soaring-ordercreated'];
        console.log("Listening to topics " + topicName)
        var stream = consumer.getReadStream(topicName, {
            waitInterval: 0
        });

        stream.on('error', function () {
            process.exit(1);
        });

        consumer.on('error', function (err) {
            console.log(err);
            process.exit(1);
        });

        stream.on('data', function (message) {
            console.log('Received message from topic:', message.topic);
            console.log('Received message content:', message.parsed);
            subscribers.forEach((subscriber) => {
                subscriber(message.topic, message.parsed);

            })
        });
    });


var subscribers = [];

var avroEventHubListener = module.exports;

avroEventHubListener.subscribeToEvents = function (callback) {
    console.log("subscription received")
    subscribers.push(callback);
}
