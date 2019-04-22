/*
 * Copyright (c) 2018, 2019 Oracle and/or its affiliates. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package sttc.demo.loyaltyms;

import com.mongodb.client.MongoClients;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.util.JSON;

import static com.mongodb.client.model.Filters.*;

import org.bson.Document;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import javax.json.JsonObject;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

import io.helidon.common.http.Http;
import io.helidon.common.http.MediaType;
import io.helidon.common.http.Parameters;
import io.helidon.config.Config;
import io.helidon.webserver.ResponseHeaders;
import io.helidon.webserver.Routing;
import io.helidon.webserver.ServerRequest;
import io.helidon.webserver.ServerResponse;
import io.helidon.webserver.Service;

/**
 * A simple service to greet you. Examples:
 *
 * Get default greeting message: curl -X GET http://localhost:8080/greet
 *
 * Get greeting message for Joe: curl -X GET http://localhost:8080/greet/Joe
 *
 * Change greeting curl -X PUT -H "Content-Type: application/json" -d
 * '{"greeting" : "Howdy"}' http://localhost:8080/greet/greeting
 *
 * The message is returned as a JSON object
 */

public class MovementService implements Service {

    /**
     * The config value for the key {@code greeting}.
     */

    private static final String DB_COLLECTION = "movements";
    private static String dbURI = "mongodb+srv://sttcloyalty:oAJbxwmxK8K5YnFRW4G9@cluster0-kktxv.mongodb.net/sttcloyaltyms?retryWrites=true";
    private static String dbName = "sttcloyaltyms";

    private static String myResult;
    Client client = Client.create();


    MovementService(Config config) {
        // this.greeting = config.get("app.greeting").asString().orElse("Ciao");
    }


    MongoClient mongoClient = MongoClients.create(dbURI);
    MongoDatabase database = mongoClient.getDatabase(dbName);

    MongoCollection<Document> collection = database.getCollection(DB_COLLECTION);

    
    Block<Document> buildJSONAllDocuments = new Block<Document>() {
        @Override
        public void apply(final Document document) {
            
            myResult = myResult + document.toJson() + ",";
            
        }
    };
      

    /**
     * A service registers itself by updating the routine rules.
     * @param rules the routing rules.
     */
    @Override
    public void update(Routing.Rules rules) {
        rules
            .get("/", this::getAllMovements)
            .get("/balance/{customer}", this::getCustomerBalance)
            .get("/orders/{customer}", this::getOrdersProxy)
            .get("/shippinginfo/{orderNo}", this::getShippingInfo)
            .get("/login", this::loginSTTC)
            .post("/create", this::createMovement)
            .post("/compensate", this::compensateMovement)
            .get("/{customer}", this::getCustomerMovements)
            ;
    }

    /**
     * Return a wordly greeting message.
     * @param request the server request
     * @param response the server response
     */
    private void getAllMovements(ServerRequest request,
                                   ServerResponse response) {

        MediaType contentType = MediaType.APPLICATION_JSON;
        
        myResult = "[";
        
        collection.find().forEach(buildJSONAllDocuments);
        myResult = myResult.substring(0, myResult.length() - 1);
        myResult = myResult + "]";
        response.headers().contentType(contentType);
        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().add("Cache-Control","max-age=120");
        response.status(Http.Status.OK_200).send(myResult);
    }

    /**
     * Return a greeting message using the name that was provided.
     * @param request the server request
     * @param response the server response
     */



     private void getCustomerMovements(ServerRequest request,
                            ServerResponse response) {
        String customer = request.path().param("customer");
        MediaType contentType = MediaType.APPLICATION_JSON;
        //Http.Header originHeader = Http.Header.ORIGIN;

        myResult = "[";
        collection.find(eq("customerId", customer)).forEach(buildJSONAllDocuments);
        myResult = myResult.substring(0, myResult.length() - 1);
        myResult = myResult + "]";

        response.headers().contentType(contentType);
        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().add("Cache-Control","max-age=120");
        response.send(myResult);
    }

    private void createMovementInMongoDB(JsonObject jo, ServerResponse response) {
        System.out.println("Inside Create" + jo.toString());

        Document document = new Document("customerId", jo.getString("customerId"))
               .append("orderId", jo.getString("orderId"))
               .append("orderNetValue", jo.getJsonNumber("orderNetValue").doubleValue())
               .append("loyaltyPoints", (int)Math.ceil(jo.getJsonNumber("orderNetValue").doubleValue()/4))
               .append("transactionId", jo.getString("transactionId"))
               .append("movementDate", new Date());

                collection.insertOne(document);

        
        response.headers().contentType(MediaType.APPLICATION_JSON);
        response.headers().add("Access-Control-Allow-Origin","*");
        response.status(Http.Status.CREATED_201).send(jo.toString());
    }

    /**
     * Set the greeting to use in future messages.
     * @param request the server request
     * @param response the server response
     */
    private void createMovement(ServerRequest request,
                                       ServerResponse response) {
        System.out.println("Before Creating");
        // request.content().as(JsonObject.class).thenAccept(jo -> compensateMovementInMongoDB(jo, response));
        request.content().as(JsonObject.class).thenAccept(jo -> createMovementInMongoDB(jo, response));
        System.out.println("After Creating");
    }



    private void compensateMovementInMongoDB(JsonObject jo, ServerResponse response) {
        System.out.println("Inside Compensate" + jo.toString());

        String orderToCompensate = jo.getString("orderId");
        // ResponseHeaders headers = response.headers();
        // MediaType contentType = MediaType.APPLICATION_JSON;
        MediaType contentType = MediaType.APPLICATION_JSON;

        Document orderDocument = collection.find(eq("orderId", orderToCompensate)).first();


        Document document = new Document("customerId", orderDocument.getString("customerId"))
               .append("orderId", orderDocument.getString("orderId"))
               .append("orderNetValue", 0)
               .append("loyaltyPoints", orderDocument.getInteger("loyaltyPoints")*-1)
               .append("transactionId", orderDocument.getString("transactionId"))
               .append("movementDate", new Date());

                collection.insertOne(document);

        // headers.contentType(Http.Header.CONTENT_TYPE;
        // response.headers(Http.Header.)
        response.headers().contentType(contentType);
        response.headers().add("Access-Control-Allow-Origin","*");
        response.status(Http.Status.CREATED_201).send(jo);
    }

    /**
     * Set the greeting to use in future messages.
     * @param request the server request
     * @param response the server response
     */
    private void compensateMovement(ServerRequest request,
                                       ServerResponse response) {
        request.content().as(JsonObject.class).thenAccept(jo -> compensateMovementInMongoDB(jo, response));
    }
    
    Block<Document> printBlock = new Block<Document>() {
        @Override
        public void apply(final Document document) {
            System.out.println(document.toJson());
        }
    };


    public static boolean isBetween(int x, int lower, int upper) {
        return lower <= x && x <= upper;
      }

    private void getCustomerBalance(ServerRequest request, ServerResponse response) {
        String customer = request.path().param("customer");
        Integer currentBalance;
        String currentStatus;

        MediaType contentType = MediaType.APPLICATION_JSON;


        AggregateIterable<Document> balanceDoc = collection.aggregate(
            Arrays.asList(
                Aggregates.match(Filters.eq("customerId", customer)),
                Aggregates.group("$customerId", Accumulators.sum("balance", "$loyaltyPoints" ))

        ));
        currentBalance = (balanceDoc.first().getInteger("balance"));
        if(isBetween(currentBalance, 0, 99)) {
            currentStatus="Standard";
          } else if (isBetween(currentBalance, 100, 199)) {
            currentStatus="Silver";
          } else if (isBetween(currentBalance, 200, 399)) {
            currentStatus="Gold";
          } else {
            currentStatus="Platinum";
          };

        BasicDBObject result = new BasicDBObject(balanceDoc.first()).append("status", currentStatus);

        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().contentType(contentType);
        response.headers().add("Cache-Control","max-age=120");
        response.status(Http.Status.OK_200).send(result.toJson());
    }

    private void getShippingInfo(ServerRequest request, ServerResponse response) {
        String order = request.path().param("orderNo");
        
        WebResource webResource = client.resource("http://129.213.11.15/soaring/logistics/shipping/forOrder/" + order);
        ClientResponse getInfo = webResource.get(ClientResponse.class);
        String shippingInfo = getInfo.getEntity(String.class);


        MediaType contentType = MediaType.APPLICATION_JSON;


        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().contentType(contentType);
        response.headers().add("Cache-Control","max-age=120");
        response.status(Http.Status.OK_200).send(shippingInfo);
    }

    private void loginSTTC(ServerRequest request, ServerResponse response) {
        Parameters queryparams = request.queryParams();

        String qp = queryparams.toString();

        System.out.println("os params são: " + qp);

        Optional<String> username = queryparams.first("username");
        Optional<String> password = queryparams.first("password");
        
        WebResource webResource = client.resource("http://129.213.126.223:8011/customer/signin");
        String body = "{\"username\":\"" + username.get() + "\",\"password\":\"" + password.get() +"\"}";
        System.out.println("Criei o resource e o body e" + body);
        
        ClientResponse loginCall = webResource.type("application/json").post(ClientResponse.class, body);
        System.out.println("fiz o post");
        String loginInfo = loginCall.getEntity(String.class);
        System.out.println("A resposta é esta" + loginInfo);


        MediaType contentType = MediaType.APPLICATION_JSON;

        System.out.println("prepara a resposta do proxy");
        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().contentType(contentType);
        response.headers().add("Cache-Control","max-age=120");
        System.out.println("Vai enviar a resposta do proxy");
        response.status(Http.Status.OK_200).send(loginInfo);
        System.out.println("Enviou resposta do proxy");

    }

    private void getOrdersProxy(ServerRequest request, ServerResponse response){

        String customer = request.path().param("customer");
        String output = "";
        
        System.out.print("this is the customer" + customer);
        // WebResource webResource = client.resource("https://129.213.126.223:9022/api/orders?shoppingCart_id=" + customer);
        // ClientResponse getInfo = webResource.header("api-key", "351801a3-0c02-41c1-b261-d0e5aaa4a0e6").get(ClientResponse.class);
        // String ordersInfo = getInfo.getEntity(String.class);

        String command = "curl -X GET -H \"Content-Type: application/json\" -H \"api-key: 351801a3-0c02-41c1-b261-d0e5aaa4a0e6\" --insecure \"https://129.213.126.223:9022/api/orders?shoppingCart_id=" + customer + "\"";
        try {
        Process process = Runtime.getRuntime().exec(command);
        System.out.println();
        InputStream istreams = process.getInputStream();

        StringBuilder textBuilder = new StringBuilder();
        Reader reader = new BufferedReader(new InputStreamReader (istreams));
        int c = 0;
        while ((c = reader.read()) != -1) {
            textBuilder.append((char) c);
        }

        System.out.println("LALALA   ->>>> " + textBuilder.toString());
        output=textBuilder.toString();

        process.destroy();
        } catch (IOException e) {

        }

        MediaType contentType = MediaType.APPLICATION_JSON;


        response.headers().add("Access-Control-Allow-Origin","*");
        response.headers().contentType(contentType);
        response.headers().add("Cache-Control","max-age=120");
        response.status(Http.Status.OK_200).send(output);
    }
    

}