import React from 'react';
import { useStore } from '../store/useStore';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

export function VideoGrid() {
  const { videos, loading, error, loadMore } = useStore();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <div>
      {error && <div className="p-4 bg-destructive text-destructive-foreground rounded-md mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onClick={() => setSelectedId(v.id)} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button disabled={loading} onClick={() => loadMore()} className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold disabled:opacity-50 transition-colors hover:bg-primary/90">
          {loading ? 'Loading...' : 'Load more'}
        </button>
      </div>
      {selectedId && <VideoModal videoId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
