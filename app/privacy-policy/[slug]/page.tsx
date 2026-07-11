import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Terminal, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { getPolicy, getPolicyContent, policies } from "@/lib/policies";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) return {};

  return {
    title: `${policy.name} Privacy Policy | Enes Demirel`,
    description: `Privacy policy for ${policy.name}.`,
  };
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  const content = getPolicyContent(slug);

  if (!policy || !content) notFound();

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
            <Link href="/#projects" className="hover:underline hidden sm:inline">
              projects
            </Link>
            <Link href="/#about" className="hover:underline hidden sm:inline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline hidden sm:inline">
              contact
            </Link>
            <Link href="/blog" className="hover:underline hidden sm:inline">
              blog
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 grow w-full">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/privacy-policy">
            <ArrowLeft className="w-4 h-4" />
            all policies
          </Link>
        </Button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={policy.icon}
          alt={`${policy.name} icon`}
          className="w-20 h-20 rounded-2xl border mb-6"
        />

        <article className="blog-content">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </article>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} enes demirel</span>
            </div>
            <p className="font-mono text-xs">
              you should really watch{" "}
              <a
                href="https://www.imdb.com/title/tt1839578/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                person of interest
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
