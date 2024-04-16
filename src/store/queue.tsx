import { create } from "zustand";

type QueueStore = {
  queue: string[];
  set: (newQ: any[]) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  queue: [],
  set: (newQ: any[]) =>
    set((state) => ({
      queue: newQ ?? state.queue,
    })),
}));
