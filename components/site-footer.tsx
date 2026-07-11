import { Terminal } from "lucide-react";

export function SiteFooter() {
  return (
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
  );
}
