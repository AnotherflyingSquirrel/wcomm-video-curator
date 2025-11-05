export type Topic = {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  description?: string | null;
  thumbnailUrl: string;
  channelName: string;
  channelId: string;
  publishedAt: string; // ISO string
  duration: string; // ISO 8601 duration e.g., PT10M
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagementScore: number;
  topics: Topic[];
  createdAt?: string;
  updatedAt?: string;
};

export type VideosResponse = {
  items: Video[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  lastUpdated?: string | null;
};

export type SortOption = 'score' | 'date' | 'views';
