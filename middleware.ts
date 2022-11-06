import { NextApiRequest } from "next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (req.nextUrl.pathname.split("/")[1].length !== 0) {
    if (req.nextUrl.pathname.startsWith("/api/getUrl")) {
      console.log("returning early");
      return;
    }
    const fullPath = req.nextUrl.pathname.split("/")[1];

    const data = await (
      await fetch(`${req.nextUrl.origin}/api/${fullPath}`)
    ).json();
    if (typeof data === "string") return NextResponse.redirect(data);
    else {
      const { msg } = data;
      console.log(msg);
      if (msg === "URL not found")
        return NextResponse.redirect(req.nextUrl.origin);
    }
  }
};
export default middleware;
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|mockServiceWorker.js).*)"],
};
