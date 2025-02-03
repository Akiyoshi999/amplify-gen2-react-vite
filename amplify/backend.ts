import { helloWolrd } from "./functions/hello-world/resouce";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  helloWolrd,
});

// 権限追加
const authUserRole = backend.auth.resources.authenticatedUserIamRole;
backend.helloWolrd.resources.lambda.grantInvoke(authUserRole);

//amplify_output.json にLambdaの関数名追加
backend.addOutput({
  custom: {
    helloWolrdLambdaName: backend.helloWolrd.resources.lambda.functionName,
  },
});
