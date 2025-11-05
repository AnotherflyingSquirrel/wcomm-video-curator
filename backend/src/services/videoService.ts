import mongoose from 'mongoose';
import { computeEngagementScore } from '../utils/score.js';
import { classifyTopics } from '../utils/classifier.js';
import type { YouTubeVideo } from './youtubeService.js';
import { Video } from '../models/video.js';
import { Topic } from '../models/topic.js';

export async function upsertVideos(videos: YouTubeVideo[]) {
  for (const v of videos) {
    const engagementScore = computeEngagementScore({
      likeCount: v.likeCount,
      commentCount: v.commentCount,
      viewCount: v.viewCount,
      publishedAt: v.publishedAt,
    });

    const doc = await Video.findOneAndUpdate(
      { youtubeId: v.id },
      {
        $set: {
          title: v.title,
          description: v.description,
          thumbnailUrl: v.thumbnailUrl,
          channelName: v.channelName,
          channelId: v.channelId,
          publishedAt: new Date(v.publishedAt),
          duration: v.duration,
          viewCount: v.viewCount,
          likeCount: v.likeCount,
          commentCount: v.commentCount,
          engagementScore,
        },
        $setOnInsert: { youtubeId: v.id },
      },
      { new: true, upsert: true }
    );

    // Update topic associations
    const matchedSlugs = classifyTopics(doc.title, doc.description ?? undefined);
    const topics = await Topic.find({ slug: { $in: matchedSlugs } }).select('_id');
  doc.topics = topics.map((t: any) => t._id as mongoose.Types.ObjectId);
    await doc.save();
  }
}

export async function refreshExistingVideoStats(fetcher: (ids: string[]) => Promise<YouTubeVideo[]>) {
  const all = await Video.find({}, { youtubeId: 1, _id: 0 });
  const ids = all.map((v: any) => v.youtubeId as string);
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 50) chunks.push(ids.slice(i, i + 50));
  for (const chunk of chunks) {
    const details = await fetcher(chunk);
    await upsertVideos(details);
  }
}
