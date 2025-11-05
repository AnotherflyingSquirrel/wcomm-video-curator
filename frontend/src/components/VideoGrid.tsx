import React from 'react';
import { useStore } from '../store/useStore';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

export function VideoGrid() {
  const { videos, loading, error, loadMore } = useStore();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <div>
      {error && <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onClick={() => setSelectedId(v.id)} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button disabled={loading} onClick={() => loadMore()} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
          {loading ? 'Loading...' : 'Load more'}
        </button>
      </div>
      {selectedId && <VideoModal videoId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
