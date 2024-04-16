import { VideoPlayer } from "@/components/VideoPlayer";
import Head from "next/head";
import { ActionButtonsColumn } from "@/components/ActionButtonsColumn";
import { ForwardButton } from "@/components/ForwardButton";
import { BackButton } from "@/components/BackButton";
import type { Metadata, ResolvingMetadata } from "next";

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

export async function generateMetadata(
  { params }: { params: { postId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const videoId = params.postId;
  const data = await getData(videoId);
  const video = data.posts.items[0];

  return {
    title: `${video.snippet.title} On MySaves`,
    description: video.snippet.description,
    openGraph: {
      title: `${video.snippet.title} On MySaves`,
      description: video.snippet.description,
      url: `https://my-saves-kappa.vercel.app/${videoId}`,
      siteName: "MySaves",
      images: [
        {
          url: video.snippet.thumbnails.standard.url,
          width: video.snippet.thumbnails.width,
          height: video.snippet.thumbnails.height,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: { postId: string } }) {
  const videoId = params.postId;
  const data = await getData(videoId);
  return (
    <>
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
