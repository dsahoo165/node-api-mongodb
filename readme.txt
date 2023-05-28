nodemon index.js

docker build -t dsahoo165/node_api_mongo .
docker container run -it -p 8082:8081 -d --network mongo-network --name node-api-mongo dsahoo165/node_api_mongo