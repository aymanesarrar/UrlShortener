"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { GoClippy } from "react-icons/go";

export default function Home() {
  const [short, setShort] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLink(e.target.value);
  };
  const getShortLink = async () => {
    const data = await (
      await fetch("/api/getUrl", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url: link }),
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
      <div className=" max-w-5xl  min-h-screen text-white mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6 w-full justify-center">
          <input
            type="text"
            className=" p-2 outline-none bg-black border-b-2 w-1/2"
            onChange={handleChange}
            value={link}
          />
          <button
            onClick={getShortLink}
            className="bg-pink-500 px-4 py-1 rounded-xl"
          >
            short me
          </button>
        </div>
        {short.length !== 0 && (
          <div className="border-2 border-white rounded-xl p-2 w-1/2 flex items-center justify-between">
            <p>{short}</p>
            <GoClippy onClick={copyUrl} className="text-white cursor-pointer" />
          </div>
        )}
        {copied && <p>url copied !!!</p>}
      </div>
    </div>
  );
}
