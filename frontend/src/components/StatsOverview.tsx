import React from 'react';
import { useStore } from '../store/useStore';

export function StatsOverview() {
  const { total, lastUpdated, videos } = useStore();
  const uniqueTopics = new Set(videos.flatMap((v: any) => v.topics.map((t: any) => t.slug))).size;
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-2">Overview</h3>
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <div>Total videos: {new Intl.NumberFormat().format(total)}</div>
        <div>Topics in results: {uniqueTopics}</div>
        <div>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : '—'}</div>
      </div>
    </div>
  );
}
