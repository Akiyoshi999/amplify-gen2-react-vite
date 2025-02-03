import { defineFunction } from "@aws-amplify/backend";

export const helloWolrd = defineFunction({
  name: "hello-world",
  entry: "./handler.ts",
});
