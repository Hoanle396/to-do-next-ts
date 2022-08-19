import { NextResponse, NextRequest } from "next/server";
import { useSelector } from "react-redux";
import { useToken } from "./hooks/useToken";

export default function middleware(req: NextRequest) {
  const protectedUrl: string[] = ["/auth", "/dashboard"];
  const urlNext = req.url;
  if (findValue(protectedUrl, urlNext)) {
    if (!req.cookies.get("token")) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (typeof window != "undefined") {
      const user = useSelector((state: any) => state.auth);
      if (!user.isLogin) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }
  }
  return NextResponse.next();
}
function findValue(protectedUrl: string[], url: string): boolean {
  for (const item of protectedUrl) {
    if (url.includes(item)) {
      return true;
    }
  }
  return false;
}
