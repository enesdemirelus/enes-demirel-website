"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal";

interface TerminalDemoProps {
  onFootballClick: () => void;
}

export function TerminalDemo({ onFootballClick }: TerminalDemoProps) {
  return (
    <Terminal className="mt-12 max-w-2xl">
      <TypingAnimation>&gt; whoami</TypingAnimation>

      <AnimatedSpan className="text-muted-foreground" delay={500}>
        <span>&gt; name: enes</span>
      </AnimatedSpan>

      <AnimatedSpan className="text-muted-foreground" delay={700}>
        <span>
          &gt; studying: math & cs @{" "}
          <a
            href="https://www.depaul.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors"
          >
            depaul university
          </a>
        </span>
      </AnimatedSpan>

      <AnimatedSpan className="text-muted-foreground" delay={900}>
        <span>
          &gt; last work (9 months): swe intern @{" "}
          <a
            href="https://www.airblox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors"
          >
            airblox
          </a>
        </span>
      </AnimatedSpan>

      <AnimatedSpan className="text-muted-foreground" delay={1100}>
        <span>&gt; location: chicago, il</span>
      </AnimatedSpan>

      <AnimatedSpan className="text-muted-foreground" delay={1300}>
        <span>
          &gt; interests: math, ml, coding,{" "}
          <button
            onClick={onFootballClick}
            className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors cursor-pointer"
          >
            football
          </button>
          , f1
        </span>
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500" delay={1500}>
        ✔ Profile loaded successfully
      </AnimatedSpan>

      <TypingAnimation className="text-muted-foreground" delay={2000}>
        &gt; Ready to connect!_
      </TypingAnimation>
    </Terminal>
  );
}
