import { VideoPlayer } from "@/components/VideoPlayer";
import Head from "next/head";
import { ActionButtonsColumn } from "@/components/ActionButtonsColumn";
import { ForwardButton } from "@/components/ForwardButton";
import { BackButton } from "@/components/BackButton";

async function getData(videoId: string) {
  const post = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cid&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const saves = await fetch(`${process.env.NEXT_PUBLIC_STORE_API}/posts`);

  if (!post.ok || !saves.ok) {
    throw new Error("Failed to fetch data");
  }

  return {
    posts: await post.json(),
    saves: await saves.json(),
  };
}

export default async function Page({ params }: { params: { postId: string } }) {
  const videoId = params.postId;
  const data = await getData(videoId);
  const video = data.posts.items[0];
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
      <main className="flex min-h-[80vh] lg:min-h-screen flex-col items-center p-1 justify-center">
        <div className="w-full max-w-full flex lg:justify-center items-center flex-col lg:flex-row">
          <BackButton videoId={videoId} />
          <VideoPlayer videoId={videoId} />
          <ForwardButton videoId={videoId} />
        </div>
        <ActionButtonsColumn
          videoId={videoId}
          saved={data.saves.some((e: any) => e.id == videoId)}
        />
      </main>
    </>
  );
}
