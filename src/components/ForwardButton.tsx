"use client";

import { useQueueStore } from "@/store/queue";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";

interface ForwardButtonProps {
  videoId: string;
}

export const ForwardButton: FC<ForwardButtonProps> = ({ videoId }) => {
  const { queue } = useQueueStore();
  const queueIndex = queue.indexOf(videoId);
  const atEndOfQueue = queueIndex == queue.length - 1 || queue.length == 0;
  const nextIndex = Math.min(queueIndex + 1, queue.length - 1);

  return (
    <>
      {!atEndOfQueue && (
        <Link href={`/${queue[nextIndex]}`}>
          <ArrowRightIcon className="w-20 h-auto hover:scale-125 cursor-pointer m-4 hidden lg:flex" />
          <ArrowDownIcon className="w-20 h-auto hover:scale-125 cursor-pointer m-4 flex lg:hidden" />
        </Link>
      )}
      {atEndOfQueue && <div className="w-20 h-20 m-4" />}
    </>
  );
};
