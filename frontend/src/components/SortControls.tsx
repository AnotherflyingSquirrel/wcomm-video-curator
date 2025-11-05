import React from 'react';
import { useStore } from '../store/useStore';

export function SortControls() {
  const { sort, setSort, refresh } = useStore();
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as any);
    refresh();
  }
  return (
    <select value={sort} onChange={onChange} className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
      <option value="score">Top score</option>
      <option value="date">Newest</option>
      <option value="views">Most viewed</option>
    </select>
  );
}
