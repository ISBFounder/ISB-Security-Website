import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { PUBLIC_PATHS } from "./i18n/paths";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

const KNOWN_PATHS = new Set<string>(PUBLIC_PATHS);

function knownPath(pathname: string) {
  let path = pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "nl") parts.shift();
  const normalized = parts.length === 0 ? "/" : `/${parts.join("/")}`;
  return KNOWN_PATHS.has(normalized);
}

export default function middleware(request: NextRequest) {
  const response = handleI18n(request);
  if (knownPath(request.nextUrl.pathname)) return response;

  const headers = new Headers(response.headers);
  return new NextResponse(response.body, {
    status: 404,
    headers,
  });
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|.*opengraph-image.*|.*twitter-image.*).*)",
  ],
};
