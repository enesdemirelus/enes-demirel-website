import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  month: "short" | "long" = "short",
) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
  });
}
