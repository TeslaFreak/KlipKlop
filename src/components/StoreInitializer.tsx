"use client";

import { useQueueStore } from "@/store/queue";
import { useEffect } from "react";

export default function StoreInitializer({ newQueue }: { newQueue: string[] }) {
  const { set } = useQueueStore();
  useEffect(() => {
    set(newQueue);
  }, [newQueue, set]);
  return null;
}
