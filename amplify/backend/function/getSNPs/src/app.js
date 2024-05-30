import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const client = new DynamoDBClient({ region: process.env.TABLE_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const path = "/getSNPs";

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

// gets all SNPs
app.get(path, async function(req, res) {

  const command = new ScanCommand({
    TableName: "SNP"
  });
  
  try {
    const response = await docClient.send(command);
    return response;
  }catch(err){
    return err;
  }
  
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app