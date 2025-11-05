import React from 'react';
import { TopicFilter } from '../components/TopicFilter';
import { SearchBar } from '../components/SearchBar';
import { SortControls } from '../components/SortControls';
import { VideoGrid } from '../components/VideoGrid';
import { StatsOverview } from '../components/StatsOverview';
import { useStore } from '../store/useStore';

export function Home() {
  const init = useStore((s: any) => s.init);
  React.useEffect(() => {
    init();
  }, [init]);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-semibold">Wireless Communication Tutorial Curator</h1>
          <div className="flex-1 md:max-w-xl"><SearchBar /></div>
          <SortControls />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <TopicFilter />
          <div className="mt-6"><StatsOverview /></div>
        </aside>
        <section className="md:col-span-3">
          <VideoGrid />
        </section>
      </main>
    </div>
  );
}
