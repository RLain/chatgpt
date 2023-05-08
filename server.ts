import 'dotenv/config';
import serverless from 'serverless-http';

import app from './app';

// the server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// handle unhandled rejections
process.on('unhandledRejection', (err: Record<string, any>) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Au revoir');
  server.close(() => {
    process.exit(1);
  });
});

// Export serverless handler
export const handler = serverless(app);
