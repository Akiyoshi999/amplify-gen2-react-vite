import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { useState } from "react";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "../amplify_outputs.json";
import { fetchAuthSession } from "aws-amplify/auth";

function App() {
  const [text, setText] = useState("");

  async function invokeHelloWorld() {
    const { credentials } = await fetchAuthSession();
    const awsRegion = outputs.auth.aws_region;
    const funcName = outputs.custom.helloWolrdLambdaName;
    const lambda = new LambdaClient({ credentials, region: awsRegion });
    const command = new InvokeCommand({
      FunctionName: funcName,
    });
    const apiResponse = await lambda.send(command);
    if (apiResponse.Payload) {
      const decodePayload = JSON.parse(
        new TextDecoder().decode(apiResponse.Payload)
      );
      const payload = JSON.parse(decodePayload.body);
      setText(payload.message);
    }
  }

  return (
    <Authenticator>
      {({ user, signOut }) => (
        <div>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <p>
            <button onClick={invokeHelloWorld}>invoke</button>
            <div>{text}</div>
          </p>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
