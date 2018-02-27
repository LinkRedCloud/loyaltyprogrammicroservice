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
    }
};
