const { DynamoDBClient, GetItemCommand } = require( "@aws-sdk/client-dynamodb" );

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const path = "/getUser";

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

// gets a user given their id
app.get(path, async function(req, res) {

  const id = req.query.id

  const command = new GetItemCommand({
    TableName: "users",
    Key: {
      id: {
        "S": id
      }
    },
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
    res.json(err);
  }
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app