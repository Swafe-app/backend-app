import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import apiRouter from './routes/api';
import sequelize from './services/sequelize';
import connectWithRetry from './helpers/connectWithRetry';
import { sendSuccess } from './helpers/response';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger/swaggerOptions';
import mime from 'mime-types';
import apiMetrics from 'prometheus-api-metrics';

const app = express();
const port = process.env.PORT || 3000;

// Configuration CORS, accept all origins in development
const whitelist = ['https://api.swafe.app', 'https://admin.swafe.app'];
const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: any) => {
        if (process.env.NODE_ENV === 'development' || !origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(`Origin ${origin} not allowed by CORS`, false);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(apiMetrics())
app.use(cors(corsOptions));
app.use(express.json());

// Swagger documentation
if (process.env.NODE_ENV === 'development') {
    const specs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// List of all available routes
app.get('/', (_req: Request, res: Response) => {
    sendSuccess(res, {
        routes: [
            {
                name: "Get image",
                path: "/get-selfie/:filename",
            },
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
                    },
                    {
                        method: "POST",
                        path: "/upload-selfie"
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
                    },
                    {
                        method: "PUT",
                        path: "/updateUser"
                    }
                ]
            }
        ]
    })
});

// API routes
app.use('/', apiRouter);

// File static route
app.use('/get-selfie', express.static('uploads/selfies', {
    setHeaders: (res, filePath) => {
        const type = mime.lookup(filePath);
        if (type) {
            res.setHeader('Content-Type', type);
        }
    }
}));

connectWithRetry(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
}, "Sequelize", 5);

// Start server
app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') console.log(`App listening at port ${port}`);
});

export default app;
