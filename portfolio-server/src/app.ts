import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ['https://rakib-portfolio-dashboard.vercel.app','http://localhost:5173','http://localhost:3000','http://localhost:3001'],credentials: true }));

// application router
// all route
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to my portfolio server' });
});
app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    StatusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});
export default app;
