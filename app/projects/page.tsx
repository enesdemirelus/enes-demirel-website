"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowLeft } from "lucide-react";

export default function Projects() {
  return (
    <div className="min-h-screen">
      {/* Subtle grid background */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Minimal header */}
      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>enesdemirel</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/#projects" className="hover:underline">
              projects
            </Link>
            <Link href="/#about" className="hover:underline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline">
              contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                back
              </Link>
            </Button>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">all projects</h1>
            <p className="text-muted-foreground">collection of my projects</p>
          </div>

          {/* Empty content area - ready for future projects */}
          <div className="grid md:grid-cols-2 gap-6 pt-8">
            {/* Projects will go here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} [your name]</span>
            </div>
            <p className="font-mono text-xs">
              [fun footer text - like "built at 3am" or "powered by
              stackoverflow"]
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
