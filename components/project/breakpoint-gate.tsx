"use client";
import { useEffect, useState } from "react";

// Mounts children only when the media query matches, so heavy embeds
// (github1s, YouTube) load only in the view that is actually visible.
export function BreakpointGate({
  query,
  children,
  fallback = null,
}: {
  query: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches ? children : fallback;
}

export const MOBILE_QUERY = "(max-width: 767px)";
export const DESKTOP_QUERY = "(min-width: 768px)";
