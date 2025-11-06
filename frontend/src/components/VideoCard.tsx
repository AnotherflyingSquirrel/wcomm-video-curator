import React from 'react';
import type { Video } from '@video-curator/shared';

type Props = { video: Video; onClick: () => void };

export function VideoCard({ video, onClick }: Props) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full flex flex-col" onClick={onClick}>
      <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold line-clamp-2 text-base">{video.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{video.channelName}</p>
        <div className="mt-auto pt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.viewCount)} views</span>
          <span>👍 {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.likeCount)}</span>
          <span className="ml-auto text-sm font-bold text-foreground">{video.engagementScore.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
