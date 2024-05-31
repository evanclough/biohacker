const { DynamoDBClient, GetItemCommand } = require( "@aws-sdk/client-dynamodb" );

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const path = "/getMyProfile";

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


//TODO: likely insecure theres proba better way
// gets an authenticated users profile info
//also currently BROKEN!
app.get(path, async function(req, res) {
  
  const a = req.apiGateway.event.requestContext.identity.cognitoIdentityPoolId;
  res.json({a});
  /*

  const command = new GetItemCommand({
    TableName: "users",
    Key: {
      id: {
        "S": req.apiGateway.event.requestContext.identity.cognitoIdentityPoolId.split(":")[1]
      }
    },  
    ProjectionExpression:"#N, #U, #V, #T, #D, #I, #G, #E",
    ExpressionAttributeNames: {
      "#N": "name",
      "#U": "username",
      "#V": "verified",
      "#T": "tags",
      "#D": "demographics",
      "#I": "id",
      "#G": "genetics",
      "#E": "email"
    }
  });
  try {
    const response = await client.send(command);
    res.json(response);
  }catch(err){
    res.json(err);
  }
  */
  
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app