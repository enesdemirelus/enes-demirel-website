import Link from "next/link";
import { redirect } from "next/navigation";
import { DesktopProjectView } from "@/components/project/desktop-view";
import { MobileProjectView } from "@/components/project/mobile-view";
import { projects, projectLinks } from "@/lib/projects";
import { getRepoInfo, getRepoReadme, repoPath } from "@/lib/repo";

export const revalidate = 3600;

export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: projectSlug } = await params;
  const project = projects.find((p) => p.slug === projectSlug);
  const link = projectLinks[projectSlug];

  if (!project || !link) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  if (link.type === "redirect") {
    redirect(link.value);
  }

  const repoUrl = link.type === "github" ? link.value : link.githubRepo;
  const repo = repoUrl ? repoPath(repoUrl) : null;
  const [info, readme] = await Promise.all([
    repo ? getRepoInfo(repo) : null,
    repo && link.type === "github" ? getRepoReadme(repo) : null,
  ]);

  const viewProps = { project, link, repoUrl, repo, info, readme };

  // Same URL, two layouts: phones get their own view instead of a squeezed
  // desktop page.
  return (
    <>
      <div className="md:hidden grow flex flex-col">
        <MobileProjectView {...viewProps} />
      </div>
      <div className="hidden md:flex grow flex-col">
        <DesktopProjectView {...viewProps} />
      </div>
    </>
  );
}
