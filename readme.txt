Update variables accordingly in index.js
// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlLocal = "mongodb://admin:password@mongodb";

commands to run
-------------------------------------
nodemon index.js

docker build -t dsahoo165/node_api_mongo .
docker container run -it -p 8081:8081 -d --network mongo-network --name node-api-mongo dsahoo165/node_api_mongo
