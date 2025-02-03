export const handler = async () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
  return response;
};
