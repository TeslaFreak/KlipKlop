import { create } from "zustand";

type QueueStore = {
  queue: string[];
  index: number;
  goToNext: () => void;
  goToPrev: () => void;
  set: (newQ: any[]) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  queue: [],
  index: 0,
  goToNext: () =>
    set((state) => ({ index: Math.min(state.index + 1, state.queue.length) })),
  goToPrev: () => set((state) => ({ index: Math.max(state.index - 1, 0) })),
  set: (newQ: any[]) =>
    set((state) => ({
      queue: newQ ?? state.queue,
    })),
}));
