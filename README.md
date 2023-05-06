# chatgpt

Playground for ChatGPT API

## Testing locally

- Run $ `npm run start`. You will see the express app create:

```
> chatgpt@1.0.0 start
> nodemon ./src/index.ts

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/index.ts`
kicked off
Server started on port 3000
```

- Invoke the endpoint e.g. $ `curl -X POST http://localhost:3000/query -H 'Content-Type: application/json' -d '{"message": "hello"}'`

## Using Serverless offline

🚨 Not yet finished setting up: WIP

- Run $ `npm run local`. You will see the localhost set up

```
Starting Offline at stage dev (af-south-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * handler: chat-gpt-app-dev-handler

┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   POST | http://localhost:3000/                                │
│   POST | http://localhost:3000/2015-03-31/functions/handler/   │
│   invocations                                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```

- Invoke the endpoint e.g. $ `curl -X POST http://localhost:3000/query -H 'Content-Type: application/json' -d '{"message": "hello"}'`

## Useful links

- https://platform.openai.com/playground
- https://developer.android.com/studio/projects/create-project

## ChatGPT Advice

1. Configure your ChatGPT account: You will need to create an account with ChatGPT and obtain an API key. The API key will be used to authenticate your requests to the ChatGPT APIs.

2. Write your Node.js server code: Write the server code that will handle requests from your Android app, authenticate requests using your ChatGPT API key, and interact with the ChatGPT APIs to return the appropriate responses.

3. Test your server: Test your server by making requests to it using a tool like Postman or a web browser.

4. Integrate your Android app: Finally, integrate your Android app with your Node.js server. You can use HTTP requests to send data from your app to your server, and receive responses back from the server.
