"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { GoClippy } from "react-icons/go";

export default function Home() {
  const [short, setShort] = useState("");
  const [link, setLink] = useState("");
  const [slugg, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLink(e.target.value);
  };
  const handleSlug: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSlug(e.target.value);
  };
  const getShortLink = async () => {
    const data = await (
      await fetch("/api/getUrl", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url: link, slug: slugg }),
      })
    ).json();
    const { origin, slug } = data;
    setShort(`${origin.split("/")[2]}/${slug}`);
  };
  const copyUrl = () => {
    navigator.clipboard.writeText(short);
    setCopied(true);
  };
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col items-center justify-center max-w-5xl min-h-screen gap-6 mx-auto text-white ">
        <div className="flex justify-center w-full gap-6">
          <input
            type="text"
            className="w-1/2 p-2 bg-black border-b-2 outline-none "
            onChange={handleChange}
            value={link}
            placeholder="enter url"
          />
          <input
            type="text"
            className="w-1/3 p-2 bg-black border-b-2 outline-none "
            onChange={handleSlug}
            value={slugg}
            placeholder="enter slug"
          />
          <button
            onClick={getShortLink}
            className="px-4 py-1 bg-pink-500 rounded-xl"
          >
            short me
          </button>
        </div>
        {short.length !== 0 && (
          <div className="flex items-center justify-between w-1/2 p-2 border-2 border-white rounded-xl">
            <p>{short}</p>
            <GoClippy onClick={copyUrl} className="text-white cursor-pointer" />
          </div>
        )}
        {copied && <p>url copied !!!</p>}
      </div>
    </div>
  );
}
