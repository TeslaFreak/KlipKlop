"use client";

import { useQueueStore } from "@/store/queue";
import { ArrowLeftIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";

interface BackButtonProps {
  videoId: string;
}

export const BackButton: FC<BackButtonProps> = ({ videoId }) => {
  const { queue } = useQueueStore();
  const queueIndex = queue.indexOf(videoId);
  const atStartOfQueue = queueIndex == 0 || queue.length == 0;
  const nextIndex = Math.max(queueIndex - 1, 0);
  return (
    <>
      {!atStartOfQueue && (
        <Link href={`/${queue[nextIndex]}`}>
          <ArrowLeftIcon className=" w-20 h-auto hover:scale-125 cursor-pointer m-4 hidden lg:flex" />
          <ArrowUpIcon className=" w-20 h-auto hover:scale-125 cursor-pointer m-4 flex lg:hidden" />
        </Link>
      )}

      {atStartOfQueue && <div className="w-20 h-20 m-4" />}
    </>
  );
};
