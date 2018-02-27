function callbackFunction(response) {
    return function (obj) {
        if (obj) {
            response.send(JSON.stringify(obj, null, 2));
        } else {
            response.status(404);
            response.send("not found");
        }
    }
}


module.exports = function (data) {
    var controller = {};

    controller.getMovementPoints = function (request, response) {
        var customerId = request.query.customer_id;
        var dateFrom = request.query.date_from;
        var dateTo = request.query.date_to;
        var orderId = request.query.order_id;
        var transactionId = request.query.transaction_id;
        data.getMovementPoints(customerId,dateFrom,dateTo,orderId,transactionId,callbackFunction(response));
    };

    controller.getCustomerMovements = function (request, response) {
        var customerId = request.params.customer_id;
        var dateFrom = request.query.date_from;
        var dateTo = request.query.date_to;
        var orderId = request.query.order_id;
        var transactionId = request.query.transaction_id;

        data.getMovementPoints(customerId, dateFrom, dateTo, orderId, transactionId, callbackFunction(response));
    };

    controller.getPointsBalance = function (request, response) {
        var customerId = request.query.customer_id;
        var date = request.query.date;

        data.getPointsBalance(customerId, date, callbackFunction(response));
    };

    controller.createMovement = function (request, response) {
        var requestbody = request.body;
        var customerId = requestbody.customer_id;
        var transactionId = requestbody.transaction_id;
        var orderId = requestbody.order_id;
        var orderValue = requestbody.order_net_value;

        if (customerId && transactionId && orderId && orderValue) {
            data.createLoyaltyPointsMovement(customerId, transactionId, orderId, orderValue, callbackFunction(response));
        } else {
            response.status(404);
            response.send("Not enough order information was passed to this request.");
        };
    };

    controller.compensateMovement = function (request, response) {
        var requestbody = request.body;
        var customerId = requestbody.customer_id;
        var orderId = requestbody.order_id;
        if (customerId && orderId) {
            data.compensateLoyaltyPointsMovement(customerId, orderId, callbackFunction(response));
        };
    };

    controller.getCustomerStatus = function (request, response) {
        var customerId = request.params.customer_id;
        var date = request.query.date;

        data.getCustomerStatus(customerId, date, callbackFunction(response));
    }

    controller.calculateStatusTier = function (request, response) {

    }

    return controller;

}