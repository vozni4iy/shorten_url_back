import 'reflect-metadata';
import express from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import { AppDataSource } from './data-source.js';
import urlRoutes from './routes/urlRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const allowedHosts = process.env.ALLOWED_HOSTS?.split(',') || [];
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const host = req.headers.host;
  const origin = req.headers.origin;
  if (host && allowedHosts.includes(host)) {
    callback(null, { origin: true });
  } else if (origin && allowedOrigins.includes(origin)) {
    callback(null, { origin: true });
  } else {
    console.error(`CORS error: Host ${host} or Origin ${origin} not allowed`);
    callback(new Error('Not allowed by CORS'), { origin: false });
  }
};

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());

    // Use the imported routes
    app.use('/', urlRoutes);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
