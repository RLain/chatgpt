import express from 'express';
import { createQuery } from '../controllers/queryController';

const queryRouter = express.Router();

queryRouter.route('/').post(createQuery);

export default queryRouter;
