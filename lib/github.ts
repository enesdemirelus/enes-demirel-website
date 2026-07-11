function githubConfig(): { token: string; repo: string } {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g. "enesdemirelus/enes-demirel-website"
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN or GITHUB_REPO is not configured");
  }
  return { token, repo };
}

function contentsUrl(repo: string, path: string): string {
  return `https://api.github.com/repos/${repo}/contents/${path}`;
}

export async function getFile(path: string): Promise<{ sha: string } | null> {
  const { token, repo } = githubConfig();
  const res = await fetch(contentsUrl(repo, path), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return { sha: data.sha as string };
}

export async function putFile(
  path: string,
  content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const { token, repo } = githubConfig();
  const res = await fetch(contentsUrl(repo, path), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
}

export async function deleteFile(
  path: string,
  message: string,
  sha: string,
): Promise<void> {
  const { token, repo } = githubConfig();
  const res = await fetch(contentsUrl(repo, path), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sha }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
}
