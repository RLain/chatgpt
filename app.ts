import express from 'express';
import morgan from 'morgan';

import queryRouter from './routes/queryRoutes';
import AppError from './utils/appError';

// const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/query', queryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// TODO handle global errors
// app.use(globalErrorHandler);

export default app;
