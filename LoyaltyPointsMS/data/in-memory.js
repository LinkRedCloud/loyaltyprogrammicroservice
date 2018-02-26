/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Dependency definitions
var movementsfiledata = require('./loyaltypoints.json');
var movements = {};
var currentMovement = 1;


movementsfiledata.data.forEach(function (movement) {
    var moveId = currentMovement++;
    movement.movementId = moveId;
    movements[moveId] = movement;
});











getMovementPoints = function (customer_id, date_from, date_to, order_id, transaction_id,callback) {
    var summary = [];
    var filtered = summary;
//    Default date values
    var dateFrom = date_from ? new Date(date_from) : new Date("1970-01-01T00:00:00.000Z");
    var dateTo = date_to ? new Date(date_to) : new Date();

console.log("Nº de moves até agora A " + movements);

    for (ids in movements) {
        currMove = movements[ids];
        console.log("Por Move: " + JSON.stringify(currMove, null, 2));
        summary.push({
            movementId: currMove.movementId,
            loyaltyPoints: currMove.loyaltyPoints,
            customerId: currMove.customerId,
            orderId: currMove.orderId,
            orderNetValue: currMove.orderNetValue,
            transactionId: currMove.transactionId,
            movementDate: currMove.movementDate
        });
        
    };
    // console.log("Summary: " + JSON.stringify(summary, null, 2));
    // console.log("Filtered: " + JSON.stringify(filtered, null, 2));

//    for (ids in summary) {
//        currMove = summary[ids];
//        console.log("Move " + currMove.movementId + " - Curr move: " + currMove);
//        console.log("Move " + currMove.movementId + " - customerId: " + customer_id);
//        console.log("Move " + currMove.movementId + " - Curr move Customer Id: " + currMove.customerId);
//        console.log("Move " + currMove.movementId + " - orderId: " + order_id);
//        console.log("Move " + currMove.movementId + " - Curr move Order Id: " + currMove.orderId);
//        console.log("Move " + currMove.movementId + " - TransactionId: " + transaction_id);
//        console.log("Move " + currMove.movementId + " - Curr move Transaction Id: " + currMove.TransactionId);
//        console.log("Move ----------------------------------------------------------------------");
//        console.log("Move " + currMove.movementId + " - Dates From " + dateFrom + " to " + dateTo);
//        console.log("Move " + currMove.movementId + " - Movement Date: " + currMove.movementDate);
//        console.log("Move " + currMove.movementId + " - criteria A: " + currMove.movementDate >= dateFrom);
//        console.log("Move " + currMove.movementId + " - criteria Total: " + (currMove.movementDate >= dateFrom && currMove.movementDate <= dateTo));
//        
    if (customer_id) {
        console.log("Filtering by Customer Id " + customer_id);
        filtered = summary.filter(currMove => currMove.customerId === customer_id);
    }
    ;
//        console.log("Move " + currMove.movementId + " - Dates From " + dateFrom + " to " + dateTo);
    if (order_id) {
        console.log("Filtering by Order Id " + order_id);
        filtered = filtered.filter(currMove => currMove.orderId === order_id);
    }
    ;
    if ((date_from) || (date_to)) {
        console.log("Filtering by Date Interval");
        moveDate = new Date(currMove.movementDate);
        filtered = filtered.filter(currMove => moveDate >= dateFrom && moveDate <= dateTo);
    }
    ;
    if (transaction_id) {
        console.log("Filtering by Transaction");
        filtered = filtered.filter(currMove => currMove.transactionId === transaction_id);
    }
    ;

//    }
    callback(filtered);
};

getUniqueCustomerIds = function (movements,callback) {
    var uniqueList = [];

    movements.forEach(function (move) {
        if (uniqueList.find(customerId => move.customerId === customerId)) {
            console.log("Já encontrei!");
        } else {
            uniqueList.push(move.customerId);
        }
        ;
    });
    callback(uniqueList);
};

convertOrderValueToPoints = function (order_net_value) {
        return (isNaN(order_net_value)? 0 : Math.ceil(order_net_value));
};


createLoyaltyPointsMovement = function (customer_id, transaction_id, order_id, order_net_value,callback) {
    var loyaltyPoints = convertOrderValueToPoints(order_net_value);
     var id = currentMovement++;
    var movement = {
            movementId: id,
            loyaltyPoints: loyaltyPoints,
            customerId: customer_id,
            orderId: order_id,
            orderNetValue: order_net_value,
            transactionId: transaction_id,
            movementDate: new Date().toString()
        };
   movements[id]=Object.assign({}, movement); 
//    console.log("O meu objecto dentro: " + JSON.stringify(movement, null, 2))
//    console.log("O erf : " + JSON.stringify(movements[id], null, 2));
//    console.log("Os meus objectos dentro: " + JSON.stringify(movements, null, 2));
    callback(movement);
};

compensateMovement = function (movement) {
    compensatingMovement=Object.assign({}, movement);
    // console.log("O meu objecto a compensar: " + JSON.stringify(compensatingMovement, null, 2));
    // console.log("Quanto valem os pontos " + compensatingMovement.loyaltyPoints + " e o negativo é " + (compensatingMovement.loyaltyPoints * -1));
    compensatingMovement.orderNetValue = 0;
    compensatingMovement.movementId = currentMovement++;
    compensatingMovement.loyaltyPoints = compensatingMovement.loyaltyPoints * -1;
    compensatingMovement.movementDate = new Date().toString();

    return compensatingMovement;
}

compensateLoyaltyPointsMovement = function (customer_id,order_id,callback) {
    var movementToCompensate = getMovementPoints(null, null, null, order_id);

    // console.log("O meu objecto para compensar ("+ movementToCompensate.length +") " + JSON.stringify(movementToCompensate, null, 2));

    if (movementToCompensate.length = 1) {
        var compensatedMove = compensateMovement(movementToCompensate[0]);
        movements[currentMovement++]=Object.assign({}, compensatedMove);
        callback(compensatedMove);
    } else {
        callback (null);
    }
     
//    console.log("O meu objecto dentro: " + JSON.stringify(movement, null, 2))
//    console.log("O erf : " + JSON.stringify(movements[id], null, 2));
//    console.log("Os meus objectos dentro: " + JSON.stringify(movements, null, 2));
};

// Function Exports

module.exports.open = function (config) {
    var datasource = {};

    datasource.getMovementPoints = getMovementPoints;
    datasource.createLoyaltyPointsMovement = createLoyaltyPointsMovement;
    datasource.compensateLoyaltyPointsMovement = compensateLoyaltyPointsMovement;
    datasource.updateLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date, loyalty_points,callback) {
        callback(null);
    };
    datasource.deleteLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date,callback) {
        callback(null);
    };
    datasource.getPointsBalance = module.exports.getPointsBalance = function (customer_id, date,callback) {
        var dateFrom = new Date("1970-01-01T00:00:00.000Z");
        var dateTo = date ? new Date(date) : new Date();
        var balanceMovements = getMovementPoints(customer_id, dateFrom, dateTo);
        var balance = [];
        if (customer_id) {
            balance.push({
                "customerId": customer_id,
                "balance": balanceMovements.reduce((total, movement) => total + movement.loyaltyPoints, 0)
            });
        } else {
            var customerList = getUniqueCustomerIds(balanceMovements);
    
            if (customerList.length > 0) {
                customerList.forEach(function (customerId) {
                    balance.push({
                        "customerId": customerId,
                        "balance": getMovementPoints(customerId, dateFrom, dateTo).reduce((total, movement) => total + movement.loyaltyPoints, 0)
                    });
                });
            }
    
        }

        callback(balance);
    };

    return datasource;

}

// // Returns the set of Loyalty Points Transactions contained within the given criteria arguments.
// module.exports.getMovementPoints = getMovementPoints;

// // Creates a new loyalty points movement into the customer's loyalty points account
// module.exports.createLoyaltyPointsMovement = createLoyaltyPointsMovement;

// // Compensate for a loyalty points movement in the customer's loyalty points account, typically associated with cancelled orders
// module.exports.compensateLoyaltyPointsMovement = compensateLoyaltyPointsMovement;

// // Updates a specific for a loyalty points movement in the customer's loyalty points account.
// module.exports.updateLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date, loyalty_points) {

// };

// // Deletes a specific for a loyalty points movement in the customer's loyalty points account.
// module.exports.deleteLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date) {

// };


// // Returns the Loyalty Points account balance on a given date. If no date is supplied, the current date will be used. 
// module.exports.getPointsBalance = function (customer_id, date) {
//     var dateFrom = new Date("1970-01-01T00:00:00.000Z");
//     var dateTo = date ? new Date(date) : new Date();
//     var balanceMovements = getMovementPoints(customer_id, dateFrom, dateTo);
//     var balance = [];
//     if (customer_id) {
//         balance.push({
//             "customerId": customer_id,
//             "balance": balanceMovements.reduce((total, movement) => total + movement.loyaltyPoints, 0)
//         });
//     } else {
//         var customerList = getUniqueCustomerIds(balanceMovements);

//         if (customerList.length > 0) {
//             customerList.forEach(function (customerId) {
//                 balance.push({
//                     "customerId": customerId,
//                     "balance": getMovementPoints(customerId, dateFrom, dateTo).reduce((total, movement) => total + movement.loyaltyPoints, 0)
//                 });
//             });
//         }

//     }
// //    console.log("Unique Customers" + customerList);
// //
// //    var balance = {
// //        "customerId": customer_id,
// //        "balance": balanceMovements.reduce((total, movement) => total + movement.loyaltyPoints, 0)
// //    };
//     return balance;
// };


