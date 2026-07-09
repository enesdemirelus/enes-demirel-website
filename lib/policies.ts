import fs from "fs";
import path from "path";

export type Policy = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const policies: Policy[] = [
  {
    slug: "reel-duel",
    name: "ReelDuel",
    description: "a party app for picking a movie together.",
    icon: "https://placehold.co/128x128/png",
  },
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}

export function getPolicyContent(slug: string) {
  if (!getPolicy(slug)) return null;

  const file = path.join(
    process.cwd(),
    "app/privacy-policy/policies",
    `${slug}.md`,
  );

  if (!fs.existsSync(file)) return null;

  return fs.readFileSync(file, "utf8");
}
