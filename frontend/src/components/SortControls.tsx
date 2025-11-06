import React from 'react';
import { useStore } from '../store/useStore';

export function SortControls() {
  const { sort, setSort, refresh } = useStore();
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as any);
    refresh();
  }
  return (
    <select value={sort} onChange={onChange} className="rounded-md border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
      <option value="score">Top score</option>
      <option value="date">Newest</option>
      <option value="views">Most viewed</option>
    </select>
  );
}
