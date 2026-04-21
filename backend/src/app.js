import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/index.js';
import requestLogger from './middleware/requestLogger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

/* ---------- Security ---------- */
app.use(helmet());
app.use(cors({ origin: config.cors.origin }));

/* ---------- Body parsers ---------- */
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

/* ---------- Request logging ---------- */
app.use(requestLogger);

/* ---------- Trust proxy (Cloud Run) ---------- */
app.set('trust proxy', true);

/* ---------- Routes ---------- */
app.use(routes);

/* ---------- Error handling ---------- */
app.use(notFound);
app.use(errorHandler);

export default app;
