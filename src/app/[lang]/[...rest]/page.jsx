import { notFound } from "next/navigation";

// Catch-all for URLs that match no real route: without this, unmatched paths
// bypass [lang]/not-found.jsx and fall through to Next's default 404 page.
export default function CatchAllPage() {
  notFound();
}
