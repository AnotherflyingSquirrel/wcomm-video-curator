import type { Request, Response } from 'express';
import { Video } from '../models/video.js';
import { Topic } from '../models/topic.js';
import { z } from 'zod';
import { searchVideos, fetchVideoDetails } from '../services/youtubeService.js';
import { upsertVideos } from '../services/videoService.js';

const listSchema = z.object({
  topic: z.string().optional(),
  sort: z.enum(['score', 'date', 'views']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(50).optional().default(20),
});

export async function getVideos(req: Request, res: Response) {
  const { topic, sort, search, page, pageSize } = listSchema.parse(req.query);
  const filter: any = {};
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { title: regex },
      { channelName: regex },
      { description: regex },
    ];
  }
  if (topic) {
    const slugs = topic.split(',').map((t: string) => t.trim());
    const topicDocs = await Topic.find({ slug: { $in: slugs } }).select('_id');
    const ids = topicDocs.map((t: any) => t._id);
    filter.topics = { $in: ids };
  }
  const sortBy: any = sort === 'date' ? { publishedAt: -1 } : sort === 'views' ? { viewCount: -1 } : { engagementScore: -1 };

  const [total, records] = await Promise.all([
    Video.countDocuments(filter),
    Video.find(filter)
      .sort(sortBy)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('topics'),
  ]);

  const items = records.map((v: any) => ({
    id: v.id,
    youtubeId: v.youtubeId,
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    channelName: v.channelName,
    channelId: v.channelId,
    publishedAt: v.publishedAt.toISOString(),
    duration: v.duration,
    viewCount: v.viewCount,
    likeCount: v.likeCount,
    commentCount: v.commentCount,
    engagementScore: v.engagementScore,
    topics: (v.topics as any[]).map((t: any) => ({ id: t._id.toString(), name: t.name, slug: t.slug, description: t.description })),
    createdAt: (v.createdAt as Date).toISOString(),
    updatedAt: (v.updatedAt as Date).toISOString(),
  }));

  const lastUpdated = records.length ? new Date(Math.max(...records.map((r: any) => (r.updatedAt as Date).getTime()))).toISOString() : null;

  res.json({ items, page, pageSize, total, totalPages: Math.ceil(total / pageSize), lastUpdated });
}

export async function getVideoById(req: Request, res: Response) {
  const id = req.params.id;
  const v = await Video.findById(id).populate('topics');
  if (!v) return res.status(404).json({ error: 'Not found' });
  const item = {
    id: v._id.toString(),
    youtubeId: v.youtubeId,
    title: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    channelName: v.channelName,
    channelId: v.channelId,
    publishedAt: (v.publishedAt as Date).toISOString(),
    duration: v.duration,
    viewCount: v.viewCount,
    likeCount: v.likeCount,
    commentCount: v.commentCount,
    engagementScore: v.engagementScore,
    topics: (v.topics as any[]).map((t: any) => ({ id: t._id.toString(), name: t.name, slug: t.slug, description: t.description })),
    createdAt: (v.createdAt as Date).toISOString(),
    updatedAt: (v.updatedAt as Date).toISOString(),
  };
  res.json(item);
}

export async function getTopics(_req: Request, res: Response) {
  const topics = await Topic.find({}).sort({ name: 1 });
  res.json(topics.map((t: any) => ({ id: t._id.toString(), name: t.name, slug: t.slug, description: t.description })));
}

export async function postRefresh(req: Request, res: Response) {
  if (process.env.ADMIN_TOKEN) {
    const auth = req.headers['authorization'] || '';
    const token = auth.replace('Bearer ', '');
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const publishedAfter = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString();
    const ids = await searchVideos({ publishedAfter, maxPerQuery: 10 });
    const details = await fetchVideoDetails(ids);
    await upsertVideos(details);
    res.json({ status: 'ok', addedOrUpdated: details.length });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Failed to refresh' });
  }
}
