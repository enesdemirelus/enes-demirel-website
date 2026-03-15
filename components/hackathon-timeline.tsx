"use client";

import { MapPin } from "lucide-react";

export interface Hackathon {
  name: string;
  date: string;
  location: string;
  result?: string;
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

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function HackathonTimeline() {
  return (
    <div className="space-y-0">
      {hackathons.map((h, i) => (
        <div key={i} className="flex gap-4">
          {/* Date */}
          <div className="w-16 shrink-0 text-right pt-2">
            <span className="text-xs font-mono text-muted-foreground leading-none">
              {formatDate(h.date)}
            </span>
          </div>

          {/* Dot + connecting line */}
          <div className="flex flex-col items-center shrink-0">
            <div className="mt-2.5 h-2 w-2 rounded-full border border-border bg-background shrink-0" />
            {i < hackathons.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1.5 mb-1" />
            )}
          </div>

          {/* Content */}
          <div className={`flex-1 ${i < hackathons.length - 1 ? "pb-5" : ""}`}>
            <div className="group flex items-start justify-between gap-4 rounded-md px-3 py-1.5 hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium leading-snug">{h.name}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{h.location}</span>
                </div>
              </div>
              {h.result && (
                <span className="mt-0.5 shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {h.result}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
