import express, { Request, Response } from 'express';
import apiRouter from './routes/api';
import sequelize from './services/sequelize';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import connectWithRetry from './helpers/connectWithRetry';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// List of all available routes
app.get('/', (_req: Request, res: Response) => {
    res.json({
        signalements: {
            create: '/signalements/create',
            list: '/signalements/list',
            one: '/signalements/one/:id',
            user: '/signalements/user/:uid'
        }
    });
});

// API routes
app.use('/', apiRouter);

connectWithRetry(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
}, "Sequelize");

connectWithRetry(async () => {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
        })
    });
}, "Firebase Admin");


connectWithRetry(async () => {
    initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: process.env.FIREBASE_PROJECT_ID
    });
}, "Firebase SDK");

// Start server
app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
});

export default app;
