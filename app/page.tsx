"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function Home() {
  const [short, setShort] = useState("");
  const [link, setLink] = useState("");

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

  return (
    <div className="min-h-screen bg-black">
      <div className="border-2 border-red-500 max-w-5xl  min-h-screen text-white mx-auto flex flex-col items-center justify-center">
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
        <div>
          <p>{short}</p>
        </div>
      </div>
    </div>
  );
}
