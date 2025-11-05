import type { VideosResponse, SortOption, Topic, Video } from '@video-curator/shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchVideos(params: { topic?: string[]; sort?: SortOption; search?: string; page?: number; pageSize?: number }): Promise<VideosResponse> {
  const url = new URL(`${API_URL}/api/videos`);
  if (params.topic?.length) url.searchParams.set('topic', params.topic.join(','));
  if (params.sort) url.searchParams.set('sort', params.sort);
  if (params.search) url.searchParams.set('search', params.search);
  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch videos');
  return res.json();
}

export async function fetchVideoById(id: string): Promise<Video> {
  const res = await fetch(`${API_URL}/api/videos/${id}`);
  if (!res.ok) throw new Error('Failed to fetch video');
  return res.json();
}

export async function fetchTopics(): Promise<Topic[]> {
  const res = await fetch(`${API_URL}/api/topics`);
  if (!res.ok) throw new Error('Failed to fetch topics');
  return res.json();
}
