import { NextResponse } from "next/server";

// Croatian is served at the root without a prefix; /en and /de are prefixed.
// Internally every route lives under app/[lang], so bare paths are rewritten
// to /hr/* (invisible to the visitor), while explicit /hr/* URLs redirect to
// the canonical unprefixed form.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/hr" || pathname.startsWith("/hr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/hr/, "") || "/";
    return NextResponse.redirect(url, 301);
  }

  if (
    pathname === "/en" || pathname.startsWith("/en/") ||
    pathname === "/de" || pathname.startsWith("/de/")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/hr${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and static files (anything with an extension).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
