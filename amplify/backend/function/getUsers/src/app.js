const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb" );
const  { ScanCommand, DynamoDBDocumentClient } = require( "@aws-sdk/lib-dynamodb" );

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });

const path = "/getUsers";

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// gets all compounds
app.get(path, async function(req, res) {

  const command = new ScanCommand({
    TableName: "users",
    ProjectionExpression:"#N, #U, #V, #T, #D, #I, #G",
    ExpressionAttributeNames: {
      "#N": "name",
      "#U": "username",
      "#V": "verified",
      "#T": "tags",
      "#D": "demographics",
      "#I": "id",
      "#G": "genetics"
    }
  });
  
  try {
    const response = await client.send(command);
    res.json(response);
  }catch(err){
    res.json(error);
  }
  
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app