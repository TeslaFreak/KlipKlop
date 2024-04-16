"use client";

import { saveVideo, unsaveVideo } from "@/app/actions";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeartFilledIcon, Share1Icon, HeartIcon } from "@radix-ui/react-icons";

export function ActionButtonsColumn({
  videoId,
  saved,
}: {
  videoId: string;
  saved: boolean;
}) {
  const handleOnSave = () => {
    saveVideo(videoId);
  };

  const handleOnRemove = () => {
    unsaveVideo(videoId);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://my-saves-kappa.vercel.app/${videoId}`
    );
    const isMobile = window.innerWidth <= 600;
    const toastPosition = isMobile ? "top-right" : "bottom-right";
    toast("URL copied to clipboard", {
      position: toastPosition,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      closeButton: false,
      transition: Bounce,
    });
  };

  return (
    <div className="fixed right-4 bottom-12 flex flex-col gap-4">
      {!saved && (
        <HeartIcon
          className="w-8 h-auto hover:scale-125 cursor-pointer"
          onClick={handleOnSave}
        />
      )}
      {saved && (
        <HeartFilledIcon
          className="w-8 h-auto hover:scale-125 cursor-pointer"
          onClick={handleOnRemove}
        />
      )}
      <Share1Icon
        className="w-8 h-auto  hover:scale-125 cursor-pointer"
        onClick={copyToClipboard}
      />
      <ToastContainer />
    </div>
  );
}
