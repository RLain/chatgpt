import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Replace the ChatGPT API URL with your own
const CHATGPT_API_URL = process.env.CHATGPT_API_URL;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

// API request to ChatGPT
app.post('/query', function (req, res) {
  console.info('reached application');
  // Check if the query and sessionId parameters are present
  if (!req.body.query || !req.body.sessionId) {
    return res.status(400).send('Missing parameters: query and sessionId are required');
  }

  const options = {
    url: CHATGPT_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHATGPT_API_KEY}`,
    },
    body: JSON.stringify({
      query: req.body.query,
      sessionId: req.body.sessionId,
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say this is a test!' }],
      temperature: 0.7,
    }),
  };

  console.log(options);

  //   request.post(options, function (err, response, body) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send(err);
  //     }

  //     const data = JSON.parse(body);

  //     // Check if the ChatGPT API returned an error
  //     if (data.error) {
  //       console.log(data.error);
  //       return res.status(500).send(data.error);
  //     }

  //     // Return the response from the ChatGPT API to the client
  //     return res.status(200).send(data.response);
  //   });
});

// Start the server
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
