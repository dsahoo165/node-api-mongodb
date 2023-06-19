var express = require('express');
const cors = require('cors');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

// use when starting application locally
//let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

let mongoUrlLocal = "mongodb://admin:password@44.201.168.183:27017";


// use when starting application as docker container
//let mongoUrlLocal = "mongodb://admin:password@mongodb";


// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

let databaseName = "food";


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
   extended: true
 }));
app.use(bodyParser.json());

 

var fs = require("fs");

// app.get('/createdb', function (req, res) {
//    let response = {};
//    let url = mongoUrlLocal + "/" + databaseName;
//    console.log(url, ':url')
//    MongoClient.connect(url, function (err, db) {
//       if (err) throw err;
//       console.log("Database created!");
//       response = result;
//       db.close();
//       // Send response
//       res.send('Database created');
//    });

// });


app.get('/users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

app.get("/users-array", (req, res, next) => {
    res.json([
         {
           "name" : "mahesh",
           "password" : "password1",
           "profession" : "teacher",
           "id": 1
        },
        {
       
           "name" : "suresh",
           "password" : "password2",
           "profession" : "librarian",
           "id": 2
        },        
        {
           "name" : "ramesh",
           "password" : "password3",
           "profession" : "clerk",
           "id": 3
        }
     ]);
});

app.get("/", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food","Deepak Kumar Sahoo qa"]);
});


app.get('/get-fruits', function (req, res) {
   let response = {};
   // Connect to the db
   MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
      if (err) {
         console.log(err);
         throw err
      };
 
     let db = client.db(databaseName);
 
     let myquery = { };
 
     db.collection("fruits").find(myquery).toArray(function (err, result) {
       if (err) throw err;
       response = result;
       client.close();
 
       // Send response
       res.send(response ? response : {});
     });
   });
 });
 

app.post('/update-record', function (req, res) {
   let reqObj = req.body;
 
   MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
     if (err) throw err;
 
     console.log(reqObj,'reqObj')
     let db = client.db(databaseName);     
 
     let myquery = { id: reqObj.id };
     let newvalues = { $set: reqObj };
 
     db.collection("fruits").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
       if (err) throw err;
       client.close();
     });
 
   });
   // Send response
   res.send(reqObj);
 });
 
 app.post('/insert-many', function (req, res) {
   let reqObj = req.body;
 
   MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
     if (err) throw err;
     
     let db = client.db(databaseName);     
 
     db.collection("fruits").insertMany(reqObj, function(err, res) {
       if (err) throw err;
       client.close();
     });
 
   });
   // Send response
   res.send(reqObj);
 });


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
