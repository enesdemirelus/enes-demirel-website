// Public repo data for project pages. Cached for an hour so visitors never
// hit GitHub's rate limit; GITHUB_TOKEN is used when present to raise it.

export interface RepoInfo {
  fullName: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  pushedAt: string;
  defaultBranch: string;
}

const REVALIDATE_SECONDS = 3600;

export function repoPath(githubUrl: string): string {
  return githubUrl.replace(/^https:\/\/github\.com\//, "").replace(/\/$/, "");
}

function headers(accept: string): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: accept,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getRepoInfo(repo: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: headers("application/vnd.github+json"),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      fullName: data.full_name,
      url: data.html_url,
      description: data.description,
      stars: data.stargazers_count,
      language: data.language,
      pushedAt: data.pushed_at,
      defaultBranch: data.default_branch,
    };
  } catch {
    return null;
  }
}

export async function getRepoReadme(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/readme`, {
      headers: headers("application/vnd.github.raw"),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
