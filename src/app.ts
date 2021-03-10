import 'reflect-metadata'
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './error/AppError';

createConnection();

const app = express();
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ error: err.message });
    }

    return response.status(500).json({
        status: 'Error',
        message: err.message
    });
});

export { app };
