import StoreInitializer from "@/components/StoreInitializer";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player/youtube";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STORE_API}/posts`);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function Page() {
  const videoList = await getData();
  const videoIdList = videoList.map((video: any) => video.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left lg:mt-16">
        <StoreInitializer newQueue={videoIdList} />
        {videoList.map((video: any) => {
          return (
            <Link
              href={`/${video.id}`}
              className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              key={video.id}
            >
              <Image
                src={video.snippet.thumbnails.standard.url}
                width={video.snippet.thumbnails.standard.width}
                height={video.snippet.thumbnails.standard.height}
                alt={video.snippet.title}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
