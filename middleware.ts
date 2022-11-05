import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (req.nextUrl.pathname.startsWith("/api/getUrl")) {
    console.log("returning early");
    return;
  }
  const fullPath = req.headers.get("Referer")?.split("/").at(-1);

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/${fullPath}`)
  ).json();

  if (typeof data === "string") return NextResponse.redirect(data);
  else {
    const { msg } = data;
    if (msg === "URL not found")
      return NextResponse.redirect(req.nextUrl.origin);
  }
};
export default middleware;
