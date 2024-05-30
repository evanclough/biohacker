/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');


const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger

  const userRecord = {
    "id": event?.userName ?? "ejfiefjwlfhwfe",
    "email": event.request.userAttributes?.email ?? "null email",
    "username": event.request.userAttributes?.preferred_username ?? "null username",
    "name": event.request.userAttributes?.name ??" null name",
    "demographics": {},
    "accountCreationTimestamp": Date.now().toString(),
    "genetics": [],
    "tags": [],
    "verified": false,
  }

  console.log(event);

  const putItemParams = {
      TableName: "users",
      Item: {
        "name": {
          "S": userRecord.name
        },
        "accountCreationTimestamp": {
          "S": userRecord.accountCreationTimestamp
        },
        "email": {
          "S": userRecord.email
        },
        "demographics": {
          "M": {
            "weight": {
              "N": "80"
            }
          }
        },
        "username": {
          "S": userRecord.username
        },
        "id": {
          "S": userRecord.id
        },
        "genetics": {
          "L": userRecord.genetics
        },
        "tags": {
          "L": userRecord.tags
        },
        "verified": {
          "BOOL": userRecord.verified
        }
      }
  }

  console.log(putItemParams);

  try{
    await ddbClient.send(new PutItemCommand(putItemParams));
    return {"success": true}
    return event;
  }catch (err) {
    console.log(err);
    return {"success": false};
  }
};
