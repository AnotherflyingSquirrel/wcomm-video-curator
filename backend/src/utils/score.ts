export function computeEngagementScore(params: {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  publishedAt: Date | string;
}): number {
  const { likeCount, commentCount, viewCount } = params;
  const published = new Date(params.publishedAt);
  const now = new Date();
  const ageDays = Math.max(1, (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24));
  const raw = likeCount * 2 + commentCount * 3 + viewCount * 0.01;
  // Normalize by age: dampen older videos but not too harshly
  const normalized = raw / Math.pow(ageDays, 0.5);
  return Math.round(normalized * 100) / 100; // 2 decimals
}
