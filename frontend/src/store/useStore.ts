import { create } from 'zustand';
import type { SortOption, Video, VideosResponse, Topic } from '@video-curator/shared';
import { fetchVideos, fetchTopics } from '../services/api';

type State = {
  topics: Topic[];
  selectedTopics: string[]; // slugs
  sort: SortOption;
  search: string;
  page: number;
  pageSize: number;
  total: number;
  videos: Video[];
  loading: boolean;
  error?: string;
  lastUpdated?: string | null;
};

type Actions = {
  init: () => Promise<void>;
  setSearch: (q: string) => void;
  toggleTopic: (slug: string) => void;
  setSort: (s: SortOption) => void;
  loadPage: (page: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const useStore = create<State & Actions>((set: any, get: any) => ({
  topics: [],
  selectedTopics: [],
  sort: 'score',
  search: '',
  page: 1,
  pageSize: 20,
  total: 0,
  videos: [],
  loading: false,
  lastUpdated: undefined,

  init: async () => {
    try {
      const topics = await fetchTopics();
      set({ topics });
      await get().refresh();
    } catch (e: any) {
      set({ error: e.message || 'Failed to initialize' });
    }
  },
  setSearch: (q: string) => set({ search: q, page: 1 }),
  toggleTopic: (slug: string) => {
    const sel = new Set(get().selectedTopics);
    sel.has(slug) ? sel.delete(slug) : sel.add(slug);
    set({ selectedTopics: Array.from(sel), page: 1 });
  },
  setSort: (s: SortOption) => set({ sort: s, page: 1 }),
  loadPage: async (page: number) => {
    set({ loading: true, error: undefined });
    try {
      const { selectedTopics, sort, search, pageSize } = get();
      const data: VideosResponse = await fetchVideos({ topic: selectedTopics, sort, search, page, pageSize });
      const merge = page === 1 ? data.items : [...get().videos, ...data.items];
      set({
        videos: merge,
        page,
        total: data.total,
        lastUpdated: data.lastUpdated,
      });
    } catch (e: any) {
      set({ error: e.message || 'Failed to load videos' });
    } finally {
      set({ loading: false });
    }
  },
  loadMore: async () => {
    const { page } = get();
    await get().loadPage(page + 1);
  },
  refresh: async () => {
    await get().loadPage(1);
  },
}));
