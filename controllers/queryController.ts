import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import request from 'request';

// Replace the ChatGPT API URL with your own
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

export const createQuery = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
