const { DynamoDBClient } = require( "@aws-sdk/client-dynamodb" );
const { PutCommand, DynamoDBDocumentClient } = require( "@aws-sdk/lib-dynamodb" );
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const crypto = require("crypto")

const client = new DynamoDBClient({region: process.env.TABLE_REGION});
const docClient = DynamoDBDocumentClient.from(client);
const path = "/addCompound";

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

//adds a compound
app.post(path, async function(req, res) {

  const name = req.body["name"];
  const actions = req.body["actions"];
  const contraindications = req.body["contraindications"];
  const genetics = req.body["genetics"];
  const research = req.body["research"];
  const tags = req.body["tags"];
  const description = req.body["description"];
  const children = req.body["children"];
  const parents = req.body["parents"];
  const brandNames = req.body["brandNames"]
  const id = crypto.randomUUID();

  //todo: sanitize  

  const command = new PutCommand({
    TableName: "compound",
    Item: {
      name,
      actions,
      contraindications,
      genetics,
      research,
      tags,
      description,
      children,
      parents,
      id,
      brandNames
    }
  });

  try {
    const response = await docClient.send(command);
    res.json(response);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
  
});

app.listen(3000, function() {
  console.log("App started")
});

module.exports = app