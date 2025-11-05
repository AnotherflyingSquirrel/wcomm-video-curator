import React from 'react';
import { useStore } from '../store/useStore';

export function SearchBar() {
  const { setSearch, refresh } = useStore();
  const [value, setValue] = React.useState('');
  const debounceRef = React.useRef<number | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setValue(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setSearch(v);
      refresh();
    }, 400);
  }

  return (
    <input
      type="text"
      placeholder="Search by title, channel, or description..."
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
