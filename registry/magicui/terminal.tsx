"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm font-mono text-sm",
        className
      )}
    >
      <div className="border-b px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  typingSpeed?: number;
  delay?: number;
}

export function TypingAnimation({
  children,
  className,
  typingSpeed = 50,
  delay = 0,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= children.length) {
            setDisplayedText(children.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
          }
        }, typingSpeed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(delayTimeout);
    } else {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= children.length) {
          setDisplayedText(children.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [children, typingSpeed, delay]);

  return (
    <div className={cn("inline-block", className)}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">_</span>}
    </div>
  );
}

interface AnimatedSpanProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSpan({
  children,
  className,
  delay = 0,
}: AnimatedSpanProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

