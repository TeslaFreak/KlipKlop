import { create } from "zustand";

type SavesStore = {
  saves: string[];
  add: (videoId: string) => void;
  remove: (videoId: string) => void;
  fetch: () => void;
};

export const useSavesStore = create<SavesStore>((set) => ({
  saves: [],
  add: (videoId) => set((state) => ({ saves: [...state.saves, videoId] })),
  remove: (videoId) =>
    set((state) => ({
      saves: state.saves.splice(state.saves.indexOf(videoId) + 1, 1),
    })),
  fetch: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STORE_API}/posts`);
    set({ saves: await response.json() });
  },
}));
