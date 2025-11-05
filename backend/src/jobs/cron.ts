import cron from 'node-cron';
import { searchVideos, fetchVideoDetails } from '../services/youtubeService.js';
import { refreshExistingVideoStats, upsertVideos } from '../services/videoService.js';

export function startCronJobs() {
  // Daily at 03:00
  cron.schedule('0 3 * * *', async () => {
    try {
      console.log('[cron] Daily fetch started');
      const publishedAfter = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString();
      const ids = await searchVideos({ publishedAfter, maxPerQuery: 10 });
      const details = await fetchVideoDetails(ids);
      await upsertVideos(details);
      console.log('[cron] Daily fetch done. Upserted:', details.length);
    } catch (e) {
      console.error('[cron] Daily fetch error', e);
    }
  });

  // Weekly on Sunday at 04:00
  cron.schedule('0 4 * * 0', async () => {
    try {
      console.log('[cron] Weekly metrics update started');
      await refreshExistingVideoStats(fetchVideoDetails);
      console.log('[cron] Weekly metrics update done');
    } catch (e) {
      console.error('[cron] Weekly update error', e);
    }
  });
}
