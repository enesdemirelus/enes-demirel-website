"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

function page() {
  const params = useParams();
  const project = params.project;
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

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
            <Link href="/#projects" className="hover:underline">
              projects
            </Link>
            <Link href="/#about" className="hover:underline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline">
              contact
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8 flex-grow w-full">
        <div>{project}</div>
      </section>

      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} enes demirel</span>
            </div>
            <p className="font-mono text-xs">
              you should really watch person of interest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default page;
