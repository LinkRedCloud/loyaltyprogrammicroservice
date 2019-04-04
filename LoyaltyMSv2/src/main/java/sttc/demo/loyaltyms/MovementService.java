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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import javax.json.JsonObject;

import io.helidon.common.http.Http;
import io.helidon.common.http.MediaType;
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
            .get("/{customer}", this::getCustomerMovements)
            .post("/create", this::createMovement)
            .post("/compensate", this::compensateMovement);
    }

    /**
     * Return a wordly greeting message.
     * @param request the server request
     * @param response the server response
     */
    private void getAllMovements(ServerRequest request,
                                   ServerResponse response) {

        MediaType contentType = MediaType.APPLICATION_JSON;
        
        myResult = "{\"movements\" : [";
        
        collection.find().forEach(buildJSONAllDocuments);
        myResult = myResult.substring(0, myResult.length() - 1);
        myResult = myResult + "]}";
        response.headers().contentType(contentType);
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
        myResult = "{\"movements\" : [";
        collection.find(eq("customerId", customer)).forEach(buildJSONAllDocuments);
        myResult = myResult.substring(0, myResult.length() - 1);
        myResult = myResult + "]}";
        response.send(myResult);
    }

    private void createMovementInMongoDB(JsonObject jo, ServerResponse response) {

        Document document = new Document("customerId", jo.getString("customerId"))
               .append("orderId", jo.getString("orderId"))
               .append("orderNetValue", jo.getJsonNumber("orderNetValue").doubleValue())
               .append("loyaltyPoints", (int)Math.ceil(jo.getJsonNumber("orderNetValue").doubleValue()/4))
               .append("transactionId", jo.getString("transactionId"))
               .append("movementDate", new Date());

                collection.insertOne(document);

        response.status(Http.Status.CREATED_201).send(jo.toString());
    }

    /**
     * Set the greeting to use in future messages.
     * @param request the server request
     * @param response the server response
     */
    private void createMovement(ServerRequest request,
                                       ServerResponse response) {
        request.content().as(JsonObject.class).thenAccept(jo -> createMovementInMongoDB(jo, response));
    }



    private void compensateMovementInMongoDB(JsonObject jo, ServerResponse response) {

        String orderToCompensate = jo.getString("orderId");
        // ResponseHeaders headers = response.headers();
        // MediaType contentType = MediaType.APPLICATION_JSON;


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

        response.status(Http.Status.OK_200).send(result.toJson());
    }
}
