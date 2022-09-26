import express from 'express';
require('express-async-errors');    // required for handling async error,  without this request gets stuck in loop
import { errorHandler, NotFoundError, currentUser } from '@frst-ticket-app/common';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);   // add to trust the nginx proxy
app.use(express.json());
// cookie session has to be run before currentUser
app.use(
    cookieSession({
    signed: false,  // disable encryption
    // true value allows https.
    // secure will be false in test env and true in production
    secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

// throw exception for all path unmatched requests
app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };