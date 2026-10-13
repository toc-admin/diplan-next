import { NextResponse } from "next/server";
import { STRAPI_URL } from "../../../lib/strapi";

// Proxies the contact form to Strapi so the API token stays server-side
// (the old site shipped it inside the public JS bundle).
export async function POST(request) {
  const body = await request.json();
  const { name, email, phoneNumber, clientType, message } = body || {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const res = await fetch(`${STRAPI_URL}/api/contact-forms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_CONTACT_TOKEN}`,
    },
    body: JSON.stringify({
      data: { name, email, phoneNumber, clientType, message },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
