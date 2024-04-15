import { VideoPlayer } from "@/components/VideoPlayer";
import Head from "next/head";
import ReactPlayer from "react-player/youtube";

async function getData(videoId: string) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cid&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { postId: string } }) {
  const videoId = params.postId;
  const data = await getData(videoId);
  const video = data.items[0];

  return (
    <>
      <Head>
        <title>{video.snippet.title} On MySaves</title>
        <meta
          property="og:image"
          content={video.snippet.thumbnails.standard.url}
        />
        <meta
          name="twitter:image"
          content={video.snippet.thumbnails.standard.url}
        />
        <meta name="description" content={video.snippet.description} />
      </Head>
      <main className="flex min-h-screen flex-col items-center p-1 justify-center">
        <div className="w-full flex justify-center">
          <VideoPlayer videoId={videoId} />
        </div>
      </main>
    </>
  );
}
