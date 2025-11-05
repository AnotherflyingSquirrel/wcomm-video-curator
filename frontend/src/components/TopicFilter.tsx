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
      <h2 className="text-lg font-semibold mb-3">Topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t.slug}
            className={`px-3 py-1 rounded-full border text-sm ${selectedTopics.includes(t.slug) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-700'}`}
            onClick={() => onToggle(t.slug)}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
