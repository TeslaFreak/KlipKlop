"use client";

import ReactPlayer from "react-player/youtube";

export function VideoPlayer({ videoId }: { videoId: string }) {
  const isMobile = window.innerWidth <= 600;

  return (
    <>
      {!isMobile && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          loop={true}
          playing={true}
          controls={false}
        />
      )}
      {isMobile && (
        <div className="max-w-full h-fit justify-center items-center flex">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            loop={true}
            height="56.25vw"
            playing={true}
            controls={false}
          />
        </div>
      )}
    </>
  );
}
