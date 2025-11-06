import React from 'react';
import { useStore } from '../store/useStore';

export function StatsOverview() {
  const { total, lastUpdated, videos } = useStore();
  const uniqueTopics = new Set(videos.flatMap((v: any) => v.topics.map((t: any) => t.slug))).size;
  return (
    <div className="p-4 rounded-lg bg-card text-card-foreground border">
      <h3 className="font-semibold mb-3 text-lg">Overview</h3>
      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex justify-between"><span>Total videos:</span> <span className="font-medium">{new Intl.NumberFormat().format(total)}</span></div>
        <div className="flex justify-between"><span>Topics in results:</span> <span className="font-medium">{uniqueTopics}</span></div>
        <div className="flex justify-between"><span>Last updated:</span> <span className="font-medium">{lastUpdated ? new Date(lastUpdated).toLocaleString() : '—'}</span></div>
      </div>
    </div>
  );
}
