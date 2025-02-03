import type { APIGatewayProxyHandler } from "aws-lambda";
export const handler: APIGatewayProxyHandler = async () => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({ message: "Hello from APIGW + Lambda!" }),
  };
  return response;
};
