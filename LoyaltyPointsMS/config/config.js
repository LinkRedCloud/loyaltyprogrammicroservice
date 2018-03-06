/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    server:{
        port: process.env.PORT || 8888
    },
    db: {
        connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "192.168.99.100/orcl",
        user: process.env.DBAAS_USER_NAME || "loyaltyms_usr",
        password: process.env.DBAAS_USER_PASSWORD || "oracle"
    },
    kafka: {
        zookeeperIp: process.env.KAFKA_ZOOKEEPER_IP || "129.150.77.116",
        zookeeperPort: process.env.KAFKA_ZOOKEEPER_PORT || "6667",
        brokerIp: process.env.KAFKA_BROKER_IP || "129.150.77.116",
        brokerPort: process.env.KAFKA_BROKER_PORT || "2181",
        schemaRegistryIp: process.env.SCHEMA_REGISTRY_IP || "129.150.114.134",
        schemaRegistryPort: process.env.SCHEMA_REGISTRY_PORT || "8081"
    }
};
