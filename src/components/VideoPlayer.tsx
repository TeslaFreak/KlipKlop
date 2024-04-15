"use client";

import ReactPlayer from "react-player/youtube";

export function VideoPlayer({ videoId }: { videoId: string }) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoId}`}
      loop={true}
      playing={true}
      controls={false}
    />
  );
}
