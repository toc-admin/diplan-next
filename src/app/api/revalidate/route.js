import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Strapi webhook target: invalidates all cached Strapi data so content
// changes show up in the served (and view-source) HTML within seconds.
export async function POST(request) {
  const secret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidateTag("strapi");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
