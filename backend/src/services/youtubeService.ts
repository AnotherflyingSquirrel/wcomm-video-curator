import axios from 'axios';

const YT_API_BASE = 'https://www.googleapis.com/youtube/v3';

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelName: string;
  channelId: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

const DEFAULT_QUERIES = [
  'wireless communication tutorial',
  '5G technology',
  'RF engineering',
  'antenna design',
  'WiFi explained',
  'cellular networks',
];

function ensureKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YOUTUBE_API_KEY is not set');
  return key;
}

export async function searchVideos(options: { queries?: string[]; publishedAfter?: string; maxPerQuery?: number }) {
  const key = ensureKey();
  const queries = options.queries ?? DEFAULT_QUERIES;
  const publishedAfter = options.publishedAfter;
  const maxPerQuery = options.maxPerQuery ?? 10;
  const allIds: string[] = [];
  for (const q of queries) {
    const params: Record<string, string> = {
      key,
      part: 'id',
      q,
      type: 'video',
      maxResults: String(maxPerQuery),
      safeSearch: 'none',
    };
    if (publishedAfter) params.publishedAfter = publishedAfter;
    const res = await axios.get(`${YT_API_BASE}/search`, { params });
    const ids = (res.data.items ?? []).map((it: any) => it.id?.videoId).filter(Boolean);
    allIds.push(...ids);
  }
  return Array.from(new Set(allIds));
}

export async function fetchVideoDetails(ids: string[]): Promise<YouTubeVideo[]> {
  if (!ids.length) return [];
  const key = ensureKey();
  const res = await axios.get(`${YT_API_BASE}/videos`, {
    params: {
      key,
      id: ids.join(','),
      part: 'snippet,contentDetails,statistics',
      maxResults: String(Math.min(50, ids.length)),
    },
  });
  const items = res.data.items ?? [];
  return items.map((it: any) => ({
    id: it.id,
    title: it.snippet?.title ?? '',
    description: it.snippet?.description ?? '',
    thumbnailUrl: it.snippet?.thumbnails?.medium?.url || it.snippet?.thumbnails?.default?.url || '',
    channelName: it.snippet?.channelTitle ?? '',
    channelId: it.snippet?.channelId ?? '',
    publishedAt: it.snippet?.publishedAt ?? new Date().toISOString(),
    duration: it.contentDetails?.duration ?? 'PT0S',
    viewCount: Number(it.statistics?.viewCount ?? 0),
    likeCount: Number(it.statistics?.likeCount ?? 0),
    commentCount: Number(it.statistics?.commentCount ?? 0),
  }));
}
