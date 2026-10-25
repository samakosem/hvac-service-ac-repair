import Link from "next/link";
import type { HubText } from "@/lib/content/city-hubs";

/** Copy with inline links: plain strings, internal links and official external sources. */
export default function RichText({ text }: { text: HubText }) {
  return (
    <>
      {text.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : part.href.startsWith("/") ? (
          <Link key={i} href={part.href} className="text-hvac-blue-700 font-medium underline underline-offset-2 hover:text-hvac-blue-800">
            {part.label}
          </Link>
        ) : (
          <a key={i} href={part.href} rel="noopener" className="text-hvac-blue-700 font-medium underline underline-offset-2 hover:text-hvac-blue-800">
            {part.label}
          </a>
        ),
      )}
    </>
  );
}
