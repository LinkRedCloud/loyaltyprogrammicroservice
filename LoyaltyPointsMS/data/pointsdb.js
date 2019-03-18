var oracledb = require('oracledb');
var connProperties = {};
oracledb.autoCommit = false;



////FUNCTIONS
function convertDateToStringDB (date) {
    var datestring = date.toISOString();

    datestring=datestring.replace("T"," ");
    datestring=datestring.slice(0, datestring.lastIndexOf("."));

    return "TO_DATE('" + datestring + "', 'YYYY-MM-DD HH24:MI:SS')" ;
}

getMovementPoints = function (customer_id, date_from, date_to, order_id, transaction_id, callback) {
    var summary = [];
    //    Default date values
    var dateFrom = date_from ? new Date(date_from) : new Date("1970-01-01T00:00:00.000Z");
    var dateTo = date_to ? new Date(date_to) : new Date();

    //// Query Filter String Factory
    var queryFilter = "";

    if (customer_id) {
        queryFilter=queryFilter + " AND CUSTOMERID='" + customer_id + "'";
    }    ;
    if (order_id) {
        queryFilter=queryFilter + " AND ORDERID='" + order_id + "'";
    }    ;
    if ((date_from) || (date_to)) {
        queryFilter=queryFilter + " AND MOVEMENTDATE >= " + convertDateToStringDB(dateFrom) + " AND MOVEMENTDATE <= " + convertDateToStringDB(dateTo);
    }    ;
    if (transaction_id) {
        queryFilter=queryFilter + " AND TRANSACTIONID='" + transaction_id + "'";
    }    ;
    if (queryFilter.length > 0) {
        queryFilter = "WHERE" + queryFilter.slice(4); 
    };

    console.log ("Going to execute the following query" + "SELECT * FROM LOYALTYPOINTMOVEMENTS " + queryFilter);

    oracledb.getConnection(connProperties, function (err, connection) {
        if (err) {
            if (callback) {callback();};
            console.error(err.message);
            return;
        }
        connection.execute("SELECT * FROM LOYALTYPOINTMOVEMENTS " + queryFilter,
            [],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    callback();
                    return;
                }
                result.rows.forEach(function (row) {
                    summary.push({
                        movementId: row.MOVEMENTID,
                        loyaltyPoints: row.LOYALTYPOINTS,
                        customerId: row.CUSTOMERID,
                        orderId: row.ORDERID,
                        orderNetValue: row.ORDERNETVALUE,
                        transactionId: row.TRANSACTIONID,
                        movementDate: row.MOVEMENTDATE
                    });
                });
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
                if (callback) {
                    callback(summary);
                } else {
                    return summary;
                }
            });
    });
};

convertOrderValueToPoints = function (order_net_value) {
    return (isNaN(order_net_value) ? 0 : Math.ceil(order_net_value/4));
};

function connRelease (connection) {
    connection.release (function (err) {
        if (err) {
            console.error (err.message);
        };
    });
}

function insertMoveInDB (connProperties, movement, callback) {
    const movementInsertStatement = "INSERT INTO LOYALTYPOINTMOVEMENTS (MOVEMENTID, CUSTOMERID, TRANSACTIONID, ORDERID, ORDERNETVALUE, MOVEMENTDATE, LOYALTYPOINTS)" + 
    " VALUES (LPMOVES_SEQ.NEXTVAL, :customerId, :transactionId, :orderId, :orderNetValue, :movementDate, :loyaltyPoints) RETURNING MOVEMENTID INTO :outId";

    oracledb.getConnection(connProperties, function (err, connection) {
        if (err) {
            callback();
            console.error(err.message);
            return;
        }
        connection.execute(movementInsertStatement,
            movement,
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    callback();
                    return;
                }
                movement.movementId=result.outBinds.outId[0];
                connection.commit(function (err){
                    connRelease(connection);
                });
            });
        });
    
}

createLoyaltyPointsMovement = function (customer_id, transaction_id, order_id, order_net_value, callback) {
    var loyaltyPoints = convertOrderValueToPoints(order_net_value);
    var movement = {
        loyaltyPoints: loyaltyPoints,
        customerId: customer_id,
        orderId: order_id,
        orderNetValue: order_net_value,
        transactionId: transaction_id,
        movementDate: new Date(),
        outId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
    };

    insertMoveInDB (connProperties, movement,callback);
    callback(movement);
};

compensateLoyaltyPointsMovement = function (customer_id, order_id, callback) {
    var movementToCompensate = [];

    oracledb.getConnection(connProperties, function (err, connection) {
        if (err) {
            if (callback) {callback();};
            console.error(err.message);
            return;
        }
        connection.execute("SELECT * FROM LOYALTYPOINTMOVEMENTS WHERE ORDERID='" + order_id + "'",
            [],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    callback();
                    return;
                }
                result.rows.forEach(function (row) {
                    movementToCompensate.push({
                        loyaltyPoints: row.LOYALTYPOINTS*-1,
                        customerId: row.CUSTOMERID,
                        orderId: row.ORDERID,
                        orderNetValue: 0,
                        transactionId: row.TRANSACTIONID,
                        movementDate: new Date(),
                        outId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT}
                    });
                });
                insertMoveInDB(connProperties,movementToCompensate[0],callback);

                callback(movementToCompensate[0]);
            });
        });
};


getCustomerStatus =  function (customerId, date, callback) {
    var summary = [];
    var dateFrom = date ? date : new Date();
    dateFrom.setFullYear(dateFrom.getFullYear()-1);
    var dateTo = date ? date : new Date();
    const SQLQuery = "SELECT BALANCES.CUSTOMERID, BALANCES.BALANCE, CASE WHEN BALANCES.BALANCE >= 400 THEN 'PLATINUM' WHEN BALANCES.BALANCE >= 200 THEN 'GOLD' WHEN BALANCES.BALANCE >= 100 THEN 'SILVER' WHEN BALANCES.BALANCE >= 0 THEN 'STANDARD' END AS TIER FROM (SELECT CUSTOMERID, SUM(LOYALTYPOINTS) AS BALANCE FROM LOYALTYPOINTMOVEMENTS WHERE CUSTOMERID='" + customerId + "' AND MOVEMENTDATE >= "+ convertDateToStringDB(dateFrom) +" AND MOVEMENTDATE <= "+ convertDateToStringDB(dateTo) + " GROUP BY CUSTOMERID) BALANCES";


    oracledb.getConnection(connProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(SQLQuery,
            [],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    callback();
                    return;
                }
                result.rows.forEach(function (row) {
                    summary.push({
                        customerId: row.CUSTOMERID,
                        balance: row.BALANCE,
                        status: row.TIER
                    });
                });
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
                callback(summary);
            });
    });


}

////EXPORTS
module.exports.open = function (config) {
    var datasource = {};

    console.log ("Vou ligar com os seguintes dados: " + config.db.connectString + " <-> " + config.db.user + " <-> " + config.db.password );
    connProperties = {
        user: config.db.user,
        password: config.db.password,
        connectString: config.db.connectString
    };

    datasource.getMovementPoints = getMovementPoints;
    datasource.createLoyaltyPointsMovement = createLoyaltyPointsMovement;
    datasource.compensateLoyaltyPointsMovement = compensateLoyaltyPointsMovement;
    datasource.updateLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date, loyalty_points, callback) {
        callback(null);
    };
    datasource.deleteLoyaltyPointsMovement = function (order_id, customer_id, points_movement_date, callback) {
        callback(null);
    };
    datasource.getPointsBalance = module.exports.getPointsBalance = function (customer_id, date, callback) {
        var balances = [];
        var dateTo = date ? new Date(date) : new Date();
        oracledb.getConnection(connProperties, function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute("SELECT CUSTOMERID, SUM(LOYALTYPOINTS) AS BALANCE FROM LOYALTYPOINTMOVEMENTS WHERE CUSTOMERID='" + customer_id + "' AND MOVEMENTDATE <= "+ convertDateToStringDB(dateTo) + " GROUP BY CUSTOMERID",
                [],
                { outFormat: oracledb.OBJECT },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        connection.release(function (err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                        callback();
                        return;
                    }
                    result.rows.forEach(function (row) {
                        balances.push({
                            customerId: row.CUSTOMERID,
                            balance: row.BALANCE
                        });
                    });
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                    callback(balances);
                });
        });
    };
    datasource.getCustomerStatus = getCustomerStatus;

    return datasource;

}