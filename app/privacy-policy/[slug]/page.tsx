import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
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
  );
}
