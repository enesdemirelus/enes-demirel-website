import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";

// Renders a GitHub README in-page. Relative image paths point at raw files,
// relative links at the file on GitHub, matching how github.com resolves them.
export function ReadmeMarkdown({
  children,
  repo,
  branch,
}: {
  children: string;
  repo: string;
  branch: string;
}) {
  const isRelative = (url: string) => !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);

  const urlTransform = (url: string, key: string) => {
    if (isRelative(url)) {
      const path = url.replace(/^\.?\//, "");
      url =
        key === "src"
          ? `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
          : `https://github.com/${repo}/blob/${branch}/${path}`;
    }
    return defaultUrlTransform(url);
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      urlTransform={urlTransform}
      components={{
        a: ({ node, href, ...props }) =>
          href?.startsWith("#") ? (
            <a href={href} {...props} />
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
          ),
      }}
    >
      {children}
    </Markdown>
  );
}
