const express = require('express');

module.exports = function (controller) {
    var router = express.Router();

    router.route("/")
        .get(function (request,response) {
            response.send("OK");
        });


    router.route("/api/v1/")
        .get(controller.getMovementPoints)
        .post(controller.createMovement)
        .put(controller.compensateMovement);

    router.route("/api/v1/customer/:customer_id")
        .get(controller.getCustomerMovements);

    router.route("/api/v1/balance")
        .get(controller.getPointsBalance);

    router.route("/api/v1/status/:customer_id")
        .get(controller.getCustomerStatus)
        .post(controller.calculateStatusTier);

    return router;

}