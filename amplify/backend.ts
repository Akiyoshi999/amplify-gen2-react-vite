import { apiFunction } from "./functions/api-function/resouce";
import { helloWolrd } from "./functions/hello-world/resouce";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import * as apigw from "aws-cdk-lib/aws-apigateway";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  helloWolrd,
  apiFunction,
});

// 権限追加
const authUserRole = backend.auth.resources.authenticatedUserIamRole;
backend.helloWolrd.resources.lambda.grantInvoke(authUserRole);

const apiFunc = backend.apiFunction.resources.lambda;

// APIGW. CdkStackをAmplify Backendに追加
const apiStack = backend.createStack("ApiStack");

// APIGW を作成
const api = new apigw.RestApi(apiStack, "api", {
  restApiName: "amplify-api",
  defaultCorsPreflightOptions: {
    allowOrigins: apigw.Cors.ALL_ORIGINS,
    allowMethods: apigw.Cors.ALL_METHODS,
  },
});

// APIGW に Lambda を紐付け
const integration = new apigw.LambdaIntegration(apiFunc);
const helloApi = api.root.addResource("hello");
helloApi.addMethod("GET", integration);

//amplify_output.json にLambdaの関数名追加
backend.addOutput({
  custom: {
    [api.restApiName]: {
      apiName: api.restApiName,
      endpoint: api.url,
      region: apiStack.region,
    },
    helloWolrdLambdaName: backend.helloWolrd.resources.lambda.functionName,
  },
});
