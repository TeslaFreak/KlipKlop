"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(currentState: any, formData: FormData) {
  const url = formData.get("url");
  if (typeof url !== "string" || !url) {
    return {
      success: false,
      message: "invalid URL",
    };
  }
  const parsedUrl = new URL(url);
  let videoId = parsedUrl.searchParams.get("v");
  if (!videoId) {
    const pathSegments = parsedUrl.pathname.split("/");
    // Check if the path includes 'shorts' and then get the next segment as the video ID
    const shortsIndex = pathSegments.indexOf("shorts");
    if (shortsIndex !== -1 && pathSegments.length > shortsIndex + 1) {
      videoId = pathSegments[shortsIndex + 1];
    }
  }

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cid&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    const postData = data.items[0];

    const response = await fetch(`${process.env.NEXT_PUBLIC_STORE_API}/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "an error occurred",
    };
  }
  revalidatePath("/saved");
  redirect(`/${videoId}`);
  return {
    success: true,
    message: "",
  };
}

export async function saveVideo(videoId: string) {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cid&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    const postData = data.items[0];

    const response = await fetch(`${process.env.NEXT_PUBLIC_STORE_API}/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "an error occurred",
    };
  }
  revalidatePath("/saved");
  revalidatePath(`/${videoId}`);
  return {
    success: true,
    message: "",
  };
}

export async function unsaveVideo(videoId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STORE_API}/posts/${videoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      message: "an error occurred",
    };
  }
  revalidatePath("/saved");
  revalidatePath(`/${videoId}`);
  return {
    success: true,
    message: "",
  };
}
