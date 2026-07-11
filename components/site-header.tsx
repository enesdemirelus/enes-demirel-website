import Link from "next/link";
import { Terminal } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm hover:opacity-80 transition-opacity"
        >
          <Terminal className="w-4 h-4" />
          <span>enesdemirel</span>
        </Link>
        <div className="flex gap-6 text-sm items-center">
          <Link href="/#projects" className="hover:underline hidden sm:inline">
            projects
          </Link>
          <Link href="/#about" className="hover:underline hidden sm:inline">
            about
          </Link>
          <Link href="/#contact" className="hover:underline hidden sm:inline">
            contact
          </Link>
          <Link href="/blog" className="hover:underline">
            blog
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
