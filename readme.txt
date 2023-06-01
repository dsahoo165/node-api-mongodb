Update variables accordingly in index.js
// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlLocal = "mongodb://admin:password@mongodb";

Note: create a db with name : food

commands to run
-------------------------------------
To run in local:
nodemon index.js

To create the image:
docker build -t dsahoo165/node_api_mongo .

To run the image in local:
docker container run -it -p 8081:8081 -d --network mongo-network --name node-api-mongo dsahoo165/node_api_mongo


Docker compose:

#For older version
docker-compose -f dc-website.yaml up
docker-compose -f dc-website.yaml down

#For new version
docker compose up -d
docker compose down
Note: docker-compose.yml file should be the current folder