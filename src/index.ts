import 'dotenv/config';
import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

/*
As a Javascript developer, provide me a very simple skeleton framework to start building an Android app that leverages off the ChatGPT API.

Here is a very simple skeleton framework for building an Android app that leverages the ChatGPT API:

1. Create a new Android project in Android Studio. 
2. Add the ChatGPT SDK as a dependency in your project. 
3. Create an instance of the ChatGPT class.
4. Set up the ChatGPT listener to receive responses from the ChatGPT API.
5. Create a UI for the app, including an input box for the user to type in their query and a list to display the response from the ChatGPT API.
6. Connect the UI to the ChatGPT instance by sending the user query to the ChatGPT instance and displaying the response in the list.
7. Implement additional features and customizations as needed.
*/

console.log('kicked off');
const app = express();

// Use the body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Replace the ChatGPT API URL with your own
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

// API request to ChatGPT
app.post('/query', function (req, res) {
  console.info('reached application');
  // Check if the query and sessionId parameters are present
  // if (!req.body.query || !req.body.sessionId) {
  //   return res.status(400).send('Missing parameters: query and sessionId are required');
  // }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHATGPT_API_KEY}`,
    },
    body: JSON.stringify({
      // query: req.body.query,
      // sessionId: req.body.sessionId,
      model: 'text-davinci-003',
      prompt: 'Write a short story about a haunted house.',
      temperature: 0.7,
      max_tokens: 100,
    }),
  };
  request.post('https://api.openai.com/v1/completions', options, function (err, response, body) {
    console.log('reached post');
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    const data = JSON.parse(body);
    console.log(data);
    // {
    //   id: 'cmpl-7D79pHlhXpnsernSuu4hsjOLxt8Wy',
    //   object: 'text_completion',
    //   created: 1683360133,
    //   model: 'text-davinci-003',
    //   choices: [
    //     {
    //       text: '\n' +
    //         '\n' +
    //         'The old house on the edge of town had been abandoned for years. It had been the home of a family of five, until one fateful night when a fire claimed the lives of all but one of them. The sole survivor was the youngest child, a young girl named Mary.\n' +
    //         '\n' +
    //         'Mary had never been the same since that night. She had withdrawn into her shell, refusing to speak or interact with anyone. When her family had died, so had her spirit.\n' +
    //         '\n' +
    //         'As the',
    //       index: 0,
    //       logprobs: null,
    //       finish_reason: 'length'
    //     }
    //   ],
    //   usage: { prompt_tokens: 9, completion_tokens: 100, total_tokens: 109 }
    // }

    // Check if the ChatGPT API returned an error
    if (data.error) {
      console.log(data.error);
      return res.status(500).send(data.error);
    }

    // Return the response from the ChatGPT API to the client
    return res.status(200).send(data.response);
  });
});

// Start the server
app.listen(3000, function () {
  console.log('Server started on port 3000');
});

// Export serverless handler
export const handler = serverless(app);
