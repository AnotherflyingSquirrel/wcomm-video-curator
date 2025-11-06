import React from 'react';
import { useStore } from '../store/useStore';

export function TopicFilter() {
  const { topics, selectedTopics, toggleTopic, refresh } = useStore();
  function onToggle(slug: string) {
    toggleTopic(slug);
    refresh();
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t.slug}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
              selectedTopics.includes(t.slug)
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => onToggle(t.slug)}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
