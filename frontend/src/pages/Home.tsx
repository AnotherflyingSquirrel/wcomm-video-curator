import React from 'react';
import { TopicFilter } from '../components/TopicFilter';
import { SearchBar } from '../components/SearchBar';
import { SortControls } from '../components/SortControls';
import { VideoGrid } from '../components/VideoGrid';
import { StatsOverview } from '../components/StatsOverview';
import { useStore } from '../store/useStore';

import { ThemeToggle } from '../components/ThemeToggle';

export function Home() {
  const init = useStore((s: any) => s.init);
  React.useEffect(() => {
    init();
  }, [init]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Wireless Communication Tutorial Curator</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 md:max-w-xl"><SearchBar /></div>
            <SortControls />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-20">
            <TopicFilter />
            <div className="mt-6"><StatsOverview /></div>
          </div>
        </aside>
        <section className="md:col-span-3">
          <VideoGrid />
        </section>
      </main>
    </div>
  );
}
