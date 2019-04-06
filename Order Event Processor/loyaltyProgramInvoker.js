var request = require("request");
const http = require("http");



require('request-debug')(request);

var LOYALTY_MS_API_ENDPOINT = process.env.LOYALTY_MS_API_ENDPOINT || 'http://130.61.120.241:8080/api/v2/create';

console.log("Loyalty MS available at: " +  LOYALTY_MS_API_ENDPOINT);
var orderCreatedEventProcessor = module.exports;

orderCreatedEventProcessor.handleOrderEventHubEvent = async function (message) {
    console.log("Process Order Created:  Order Created Event payload " + JSON.stringify(message));
    var event = {
        "eventType": "OrderCreatedEvent",
        "payload": {
            "orderId": message.orderId,
            "shoppingCartId": message.shoppingCartId,
            "status": message.status,
            "totalPrice": message.totalPrice,
            "currency": message.currency,
            "payment": !message.payment ? null : {
                "cardType": message.payment.cardType,
                "cardNumber": message.payment.cardNumber ? message.payment.cardNumber.string : null,
                "startYear": message.payment.startYear ? message.payment.startYear.int : null,
                "startMonth": message.payment.startMonth ? message.payment.startMonth.int : null,
                "expiryYear": message.payment.expiryYear ? message.payment.expiryYear.int : null,
                "expiryMonth": message.payment.expiryMonth ? message.payment.expiryMonth.int : null
            },
            "customer": !message.customer ? null : {
                "customerId": message.customer.customerId ? message.customer.customerId.string : null,
                "firstName": message.customer.firstName ? message.customer.firstName.string : null,
                "lastName": message.customer.lastName ? message.customer.lastName.string : null,
                "phone": message.customer.phone ? message.customer.phone.string : null,
                "email": message.customer.email ? message.customer.email.string : null
            }
            , "addresses": (!message.addresses || !message.addresses.array) ? null
                : message.addresses.array.reduce((orderAddresses, address) => {
                    var orderAddress = { "type": address.name.string, "city": address.city.string, "country": address.country.string }
                    orderAddresses.push(orderAddress); return orderAddresses
                }
                    , []),
            "items": (!message.items || !message.items.array) ? null
                : message.items.array.reduce((orderItems, item) => {
                    var orderItem = {
                        "productId": item.productId.string, "productCode": item.productCode.string
                        , "productName": item.productName.string, "quantity": item.quantity.int
                    }
                    orderItems.push(orderItem); return orderItems
                }
                    , [])
        }
        ,
        "module": "orders.microservice",
        "transactionIdentifier": message.orderId,
        "timestamp": message.updatedAt
    }
    console.log("Handle order, event =  " + JSON.stringify(event))
    //TODO invoke Logistics API to create shipping for order
    console.log("Compose and send request to Loyalty MS API at " + LOYALTY_MS_API_ENDPOINT + " to create shipping")

    //note:
    // to resolved an issue with the certificate (unable to verify the first certificate)
    // I added the  "rejectUnauthorized": false, based on this resource: https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs
    var options = {
        method: 'POST',
        //"rejectUnauthorized": false,
        url: LOYALTY_MS_API_ENDPOINT,
        headers:
            {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
        body:
            {
                order_id: event.payload.orderId,
                customer_id: event.payload.customer.customerId,
                transaction_id: event.transactionIdentifier,
                order_net_value: event.payload.totalPrice,
            },
        json: true
    };
    const data = JSON.stringify({
        customerId: event.payload.customer.customerId,
        orderId: event.payload.orderId,
        orderNetValue: event.payload.totalPrice,
        transactionId:event.transactionIdentifier
      })
    
      const params = {
        hostname: '130.61.120.241',
        port: 8080,
        path: '/api/v2/create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
    
      const pedido = http.request(params, (resultado) => {
        console.log(`statusCode: ${resultado.statusCode}`)
      
        resultado.on('data', (d) => {
          process.stdout.write(d)
        })
      })
    console.log ("My Status=" + event.payload.status + "and my options are" + options);
    pedido.write(data);
    pedido.end();
    console.log(options);
    // if (event.payload.status=="CANCELED") {
    //     console.log("I'm going to compensate.....");
    //     options.method = 'PUT';
    // };
    request(options, function (error, res, body) {
        console.log('REQUEST RESULTS:', error, res.statusCode, body);
    });

}



    // var a = {
    //     , "addresses": { "array": [{ "name": { "string": "BILLING" }, "line1": { "string": "22" }
    //, "line2": { "string": "King street" }, "city": { "string": "Leamington Spa" }
    //, "county": { "string": "Warkwickshire" }, "postcode": { "string": "CV31" }, "country": { "string": "GB" } }] }

