import express, { Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import sequelize from './services/sequelize';
import connectWithRetry from './helpers/connectWithRetry';
import { sendSuccess } from './helpers/response';

const app = express();
const port = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// List of all available routes
app.get('/', (_req: Request, res: Response) => {
    sendSuccess(res, {
        routes: [
            {
                name: "Signalements",
                path: "/signalements",
                routes: [
                    {
                        method: "POST",
                        path: "/create"
                    },
                    {
                        method: "GET",
                        path: "/list"
                    },
                    {
                        method: "GET",
                        path: "/one/:id"
                    },
                    {
                        method: "GET",
                        path: "/user"
                    },
                    {
                        method: "PUT",
                        path: "/update/:id"
                    },
                    {
                        method: "DELETE",
                        path: "/delete/:id"
                    }
                ]
            },
            {
                name: "User",
                path: "/users",
                routes: [
                    {
                        method: "POST",
                        path: "/login"
                    },
                    {
                        method: "POST",
                        path: "/create"
                    },
                    {
                        method: "GET",
                        path: "/one"
                    },
                    {
                        method: "PUT",
                        path: "/update"
                    },
                    {
                        method: "PUT",
                        path: "/updatePassword"
                    },
                    {
                        method: "DELETE",
                        path: "/delete"
                    },
                    {
                        method: "GET",
                        path: "/verifyEmail/:token"
                    }
                ]
            },
            {
                name: "Admin",
                path: "/admins",
                routes: [
                    {
                        method: "POST",
                        path: "/create"
                    },
                    {
                        method: "GET",
                        path: "/userList"
                    },
                    {
                        method: "GET",
                        path: "/adminList"
                    }
                ]
            }
        ]
    })
});

// API routes
app.use('/', apiRouter);

connectWithRetry(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
}, "Sequelize");

// Start server
app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
});

export default app;
