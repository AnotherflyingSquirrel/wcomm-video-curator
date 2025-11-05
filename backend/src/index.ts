import './loadEnv.js';
import { createServer } from './server.js';
import { startCronJobs } from './jobs/cron.js';
import { connectDB } from './db/mongoose.js';

async function bootstrap() {
  await connectDB();
  const app = createServer();
  const PORT = Number(process.env.PORT || 4000);
  app.listen(PORT, () => {
    console.log(`[backend] listening on http://localhost:${PORT}`);
    startCronJobs();
  });
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
