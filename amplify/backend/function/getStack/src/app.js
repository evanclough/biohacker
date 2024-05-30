const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb" );
const { GetCommand, DynamoDBDocumentClient } = require( "@aws-sdk/lib-dynamodb" );

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const path = "/getStack";

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

// gets a stack given its id
app.get(path, async function(req, res) {

  const id = req.query.id

  const command = new GetCommand({
    TableName: "stacks",
    Key: {
      id
    },
  });
  
  try {
    const response = await docClient.send(command);
    res.json(response);
  }catch(err){
    res.json(err);
  }
  
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app