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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card text-card-foreground rounded-lg max-w-4xl w-full overflow-hidden border shadow-xl" onClick={(e) => e.stopPropagation()}>
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
        <div className="p-6">
          {loading && <div>Loading...</div>}
          {error && <div className="text-destructive">{error}</div>}
          {video && (
            <div>
              <h3 className="text-2xl font-bold">{video.title}</h3>
              <a href={`https://www.youtube.com/channel/${video.channelId}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{video.channelName}</a>
              <p className="mt-4 whitespace-pre-wrap text-sm max-h-60 overflow-y-auto">{video.description}</p>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
