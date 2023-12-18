import express, { Request, Response } from 'express';
import apiRouter from './routes/api';
import sequelize from './services/sequelize';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// List of all available routes
app.get('/', (_req: Request, res: Response) => {
    res.json({
        signalements: {
            create: '/signalements/create',
            list: '/signalements/list',
            getOne: '/signalements/getOne/:id'
        }
    });
});

// API routes
app.use('/', apiRouter);

// Connect to database with retry
const connectWithRetry = async (retries = 5, delay = 7000): Promise<void> => {
    return sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');

        // Create tables if not exists
        sequelize.sync();
    }).catch(async (err: Error) => {
        console.error('Unable to connect to the database:', err);
        if (retries === 0) {
            console.error('No more retries left.');
            return;
        }
        console.log(`Retrying connection to database... (${retries} retries left)`);
        await new Promise(res => setTimeout(res, delay));
        return connectWithRetry(retries - 1, delay);
    });
};

connectWithRetry();

// Start server
app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
});

export default app;
