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
                    self.customerIdentifier("0019283036");
                }
            }

            console.log("Getting customers ll from http://130.61.120.241:8080/api/v2/" + self.customerIdentifier());


            self.lPointsMovements = ko.observableArray();

            $.getJSON("http://130.61.120.241:8080/api/v2/" + self.customerIdentifier()).then(function (movements) {
                var tempArray = [];
                $.each(movements, function () {
                    tempArray.push({
                        customerId: this.customerId,
                        orderId: this.orderId,
                        orderNetValue: this.orderNetValue,
                        loyaltyPoints: this.loyaltyPoints,
                        transactionId: this.transactionId,
                        movementDate: new Date(this.movementDate.$date)
                    });
                });
                self.lPointsMovements(tempArray);
            });
            

            self.datasource = new oj.ArrayTableDataSource(
                self.lPointsMovements,
                { idAttribute: 'orderId' }
            );

            var currentStatus = "Gold";

            $.getJSON("http://130.61.120.241:8080/api/v2/balance/" + self.customerIdentifier())
                .then(function (results) {
                    currentStatus=(' ' + results.status).slice(1);
                    self.pointsBalance(results.balance);
                    self.statusTier(results.status);
                     
                });
                var pictLevelData = {};
                pictLevelData["Standard"] = {
                    count: 1,
                    color: '#aaaaaa'
                };
                pictLevelData["Silver"] = {
                    count: 2,
                    color: '#cccccc'
                };
                pictLevelData["Gold"] = {
                    count: 3,
                    color: '#ffd700'
                };
                pictLevelData["Platinum"] = {
                    count: 4,
                    color: '#aa0000'
                };

console.log("my Status= " + self.statusTier() );
                self.pictoChartItems = ko.observableArray([
                    { name: 'Tier', shape: 'star', count: pictLevelData[currentStatus].count, color: pictLevelData[currentStatus].color },
                    { name: 'Tier levels', shape: 'star', count: 4 - pictLevelData[currentStatus].count, borderColor: '#aaaaaa', color: '#ffffff' }
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
