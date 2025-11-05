import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { videosRouter } from './routes/videos.js';

export function createServer() {
  const app = express();
  app.use(cors({ origin: '*'}));
  app.use(express.json());
  // light request logging
  app.use(morgan('tiny'));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', videosRouter);

  // error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}
