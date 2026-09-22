import type { Project, ProjectLink } from "@/lib/projects";
import type { RepoInfo } from "@/lib/repo";

export interface ProjectViewProps {
  project: Project;
  link: ProjectLink;
  repoUrl?: string;
  repo: string | null;
  info: RepoInfo | null;
  readme: string | null;
}
