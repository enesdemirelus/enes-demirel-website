import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { policies } from "@/lib/policies";

export const metadata = {
  title: "Privacy Policies | Enes Demirel",
  description: "Privacy policies for the apps built by Enes Demirel.",
};

export default function PrivacyPolicies() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">privacy policies</h1>
          <p className="text-muted-foreground">
            what my apps collect, and what they do with it.
          </p>
        </div>

        <div className="space-y-4">
          {policies.map((policy) => (
            <Link
              key={policy.slug}
              href={`/privacy-policy/${policy.slug}`}
              className="group block"
            >
              <div className="border rounded-lg p-6 transition-all hover:border-foreground/40 hover:shadow-lg backdrop-blur-sm bg-background/50">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={policy.icon}
                    alt={`${policy.name} icon`}
                    className="w-16 h-16 rounded-xl border shrink-0"
                  />
                  <div className="grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="text-2xl font-bold group-hover:text-foreground/80 transition-colors">
                        {policy.name}
                      </h2>
                      <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
