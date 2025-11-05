import { TOPICS } from '@video-curator/shared';

export function classifyTopics(title: string, description?: string | null): string[] {
  const text = `${title} ${description ?? ''}`.toLowerCase();
  const matched = new Set<string>();
  for (const t of TOPICS) {
    if (t.keywords.some((kw) => text.includes(kw))) {
      matched.add(t.slug);
    }
  }
  return Array.from(matched);
}
