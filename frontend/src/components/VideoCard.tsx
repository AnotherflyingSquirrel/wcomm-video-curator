import React from 'react';
import type { Video } from '@video-curator/shared';

type Props = { video: Video; onClick: () => void };

export function VideoCard({ video, onClick }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer" onClick={onClick}>
      <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover" />
      <div className="p-3">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{video.channelName}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
          <span>{new Intl.NumberFormat().format(video.viewCount)} views</span>
          <span>👍 {new Intl.NumberFormat().format(video.likeCount)}</span>
          <span>💬 {new Intl.NumberFormat().format(video.commentCount)}</span>
          <span className="ml-auto font-semibold">Score: {video.engagementScore.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
