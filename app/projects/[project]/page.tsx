import { ModeToggle } from "@/components/mode-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Link
              href="/projects"
              className="hover:underline flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>back to projects</span>
            </Link>
          </div>
          <div className="flex gap-6 text-sm items-center">
            <ModeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">{project}</h1>
      </main>
    </div>
  );
}