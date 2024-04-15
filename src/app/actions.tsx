"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(currentState, formData: FormData) {
  const url = formData.get("url");
  if (typeof url !== "string" || !url) {
    return {
      success: false,
      message: "invalid URL",
    };
  }
  const parsedUrl = new URL(url);
  const videoId = parsedUrl.searchParams.get("v");

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
