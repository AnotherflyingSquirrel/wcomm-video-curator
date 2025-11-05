import React from 'react';
import { fetchVideoById } from '../services/api';

type Props = { videoId: string; onClose: () => void };

export function VideoModal({ videoId, onClose }: Props) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>();
  const [video, setVideo] = React.useState<any>(null);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchVideoById(videoId);
        if (active) setVideo(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load video');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [videoId]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video bg-black">
          {video && (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div className="p-4">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {video && (
            <div>
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{video.channelName}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm">{video.description}</p>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
