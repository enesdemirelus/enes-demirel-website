"use client";

export interface Hackathon {
  name: string;
  date: string;
  location: string;
}

const hackathons: Hackathon[] = [
  {
    name: "HackIllinois",
    date: "2026-02-28",
    location: "Urbana, IL",
  },
  {
    name: "MTC Hacks",
    date: "2025-10-31",
    location: "Urbana, IL",
  },
  {
    name: "Hack Harvard",
    date: "2025-03-01",
    location: "Cambridge, MA",
  },
];

export function HackathonTimeline() {
  return (
    <div>
      {hackathons.map((h, i) => (
        <div key={i} className="flex gap-4">
          {/* Timeline column: dot + connecting line */}
          <div className="flex flex-col items-center w-3 shrink-0">
            <div className="mt-2 w-2.5 h-2.5 rounded-full border border-border bg-background shrink-0" />
            {i < hackathons.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1 mb-0.5" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-between gap-4 py-1 pb-3 px-2 rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium truncate">{h.name}</span>
              <span className="text-muted-foreground text-xs hidden sm:inline">
                ·
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline truncate">
                {h.location}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-mono shrink-0">
              {h.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
