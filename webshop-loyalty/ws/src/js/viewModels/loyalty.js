define(
    ['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojarraytabledatasource', 'ojs/ojpictochart'],
    function (oj, ko, $) {
        'use strict';
        function LoyaltyModel() {
            var self = this;
            // var currentCustomer = "CUST0001";

            // self.productData = [{ name: 'Stroopwafels', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            // { name: 'Klompen', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            // { name: 'Mini-Molentjes', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            // { name: 'Delfts Blauw Spul', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 },
            // { name: 'Drop', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8 }
            // ];
            // self.dataProvider = new oj.ArrayDataProvider(self.productData,
            //     {
            //         keys: self.productData.map(function (value) {
            //             return value.name;
            //         })
            //     });


            self.lPointsMovements = ko.observableArray();
            $.getJSON("https://loyaltyprogramms-soaringcloudloyaltyms.eucom-north-1.oraclecloud.com/api/v1/").then(function (movements) {
                var tempArray = [];
                $.each(movements, function () {
                    tempArray.push({
                        movementId: this.movementId,
                        customerId: this.customerId,
                        orderId: this.orderId,
                        orderNetValue: this.orderNetValue,
                        loyaltyPoints: this.loyaltyPoints,
                        transactionId: this.transactionId,
                        movementDate: new Date(this.movementDate)
                    });
                });
                self.lPointsMovements(tempArray);
            });

            self.datasource = new oj.ArrayTableDataSource(
                self.lPointsMovements,
                { idAttribute: 'movementId' }
            );





            // self.pictoChartItems = ko.observableArray([
            //     { name: 'Tier', shape: 'star', count: 2, color: '#ffd700' },
            //     { name: 'Tier levels', shape: 'star', count: 2, borderColor: '#aaaaaa', color: '#ffffff' }
            // ]);

            self.pointsBalance = ko.observable();
            self.statusTier = ko.observable();

            self.username = ko.observable("");
            self.customerIdentifier = ko.observable("");
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

            updateModelFromGlobalContext(rootViewModel.globalContext)
            function updateModelFromGlobalContext(globalContext) {

                var customer = globalContext.customer
                if (customer) {
                    self.username(customer.title + " " + customer.firstName + " " + customer.lastName)
                    self.customerIdentifier(customer.customerIdentifier)
                } else {
                    self.customerIdentifier("CUST0001");
                }
            }



            $.getJSON("https://loyaltyprogramms-soaringcloudloyaltyms.eucom-north-1.oraclecloud.com/api/v1/status/" + self.customerIdentifier())
                .then(function (results) {
                    self.pointsBalance(results[0].balance);
                    self.statusTier(results[0].status);
                    // currentBalance = results[0].balance;
                    // currentStatus = results[0].status;
                });

                var pictLevelData = {};
                pictLevelData["SILVER"] = {
                    count: 1,
                    color: '#aaaaaa'
                };
                pictLevelData["GOLD"] = {
                    count: 2,
                    color: '#ffd700'
                };
                pictLevelData["PLATINUM"] = {
                    count: 3,
                    color: '#cccccc'
                };
                pictLevelData["DIAMOND"] = {
                    count: 4,
                    color: '#aa0000'
                };


                self.pictoChartItems = ko.observableArray([
                    { name: 'Tier', shape: 'star', count: pictLevelData["GOLD"].count, color: pictLevelData["GOLD"].color },
                    { name: 'Tier levels', shape: 'star', count: 4 - pictLevelData["GOLD"].count, borderColor: '#aaaaaa', color: '#ffffff' }
                ]);

            // self.handleSelectionChanged = function (event) {
            //     // Access selected elements via ui.items
            //     var selectedProduct = event.detail.value;
            //     console.log("selected product " + selectedProduct);

            //     var productSelectionEvent = {
            //         "eventType": "productSelectionEvent"
            //         , "source": "Products Portlet"
            //         , "payload": {
            //             "nameSelectedProduct": selectedProduct
            //         }
            //     }
            //     var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            //     rootViewModel.callParent(productSelectionEvent)
            // }

            rootViewModel.registerGlobalContextListener(
                function (globalContext) {
                    console.log("loyalty - global context listener - receiving global context " + JSON.stringify(globalContext))
                    updateModelFromGlobalContext(globalContext)
                }
            )

        }

        return new LoyaltyModel();
    }
);
