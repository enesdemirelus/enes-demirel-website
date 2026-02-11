import type { ReactNode } from "react";
import { InlineMath, BlockMath } from "react-katex";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  emoji: string;
  pinned?: boolean;
  content: () => ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "interesting-fact-of-the-day",
    title: "interesting fact of the day",
    excerpt: "",
    date: "2026-02-11",
    readTime: "1 min",
    emoji: "🤔",
    pinned: true,
    content: () => (
      <>
        <div className="border rounded-lg px-6 py-4 mb-6 bg-muted/30">
          <h2 style={{ marginTop: 0 }}>February 11, 2026</h2>
          <p>
          Did you know that in 2014, a radar data processing system used by the regional air traffic control facility serving Southern California failed after running continuously for an extended period? The failure caused hundreds of flights to be delayed by 1 to 3 hours, and some were even canceled. Later, it was revealed that the failure happened because of a very small software bug involving a signed integer overflow.

          </p>
          <p style={{ fontWeight: "bold" }}>But what is a signed integer overflow?
          </p>
          <p>
          Computers store numbers in binary. Most older computers were/are still using 32-bit systems. That means that the biggest number a 32-bit unsigned integer can store is a binary value with 32 1's next to each other. That number is:

          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
          <BlockMath math="2^{32} - 1 = 4,294,967,295" />
          </div>
          <p>
          However, computers need to store negative numbers as well. So, computer scientists in the 1960s came up with a solution. Using the most significant bit to store the sign. If it is 0, that is a positive number; if it is 1, that is a negative number. This is called a 32-bit signed integer. To be able to read a negative number, you have to invert all the bits and add 1.
          </p>
          <p style={{ fontWeight: "bold" }}>
          Example:
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
          <BlockMath math="\begin{aligned} &\rightarrow \text{ } 11111111 = -1 \\ &\rightarrow \text{ } 00000001 = 1 \end{aligned}" />
          </div>
          <p>
          Therefore, we can now represent negative numbers, with a small caveat. The biggest positive number we can go up to now is 31 1's next to each other. So, our range became:
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
          <BlockMath math="-2,147,483,648 \text{ to } 2,147,483,647" />
          </div>
          <p>
          An integer overflow happens when a number exceeds the maximum value the data type can store. Which basically means that a 32-bit signed integer cannot exceed <InlineMath math="2,147,483,647" />.
          </p>
          <p>
          After the investigation, authorities found that the system was keeping track of time using a 32-bit signed integer, counting milliseconds. Which means the system was going to crash after:
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
          <BlockMath math="2,147,483,647 \text{ ms} \approx 24.85 \text{ days}" />
          </div>
          <p>
          They knew about this, but their solution was basically restarting the system. However, this time they forgot. This was a good lesson for those programmers not to keep track of time using a 32-bit signed integer.
          </p>
          <p>
          A nice note: A 64-bit signed integer can run for <InlineMath math="292" /> million years (counting milliseconds) without crashing.
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
          <BlockMath math="2^{63} - 1 = 9,223,372,036,854,775,807 \text{ ms} \approx 292,471,208 \text{ years}" />
          </div>
          <p>
          I first read about this story in the book{" "}
          <a
            href="https://www.amazon.com/Humble-Pi-Comedy-Maths-Errors/dp/0141989149"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-2 hover:opacity-70 transition-opacity"
          >
            Humble Pi
          </a>
          {" "}by{" "}
          <a
            href="https://www.standupmaths.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-2 hover:opacity-70 transition-opacity"
          >
            Matt Parker
          </a>
          . I strongly recommend it to everyone interested in math.
          </p>
        </div>
        <div className="border rounded-lg px-6 py-4 mb-6 bg-muted/30">
          <h2 style={{ marginTop: 0 }}>February 10, 2026</h2>
          <p>
            Did you know that all possible arangements of a 52 deck cards is
            greater than the number of atoms in the solar system?
          </p>
          <p style={{ fontWeight: "bold" }}>Explanation:</p>
          <p>
            We first need to calculate the total number of permutations of a 52
            deck cards. This can be done with calculating how many ways we can
            arrange 52 distinct cards:
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
            <BlockMath math="\begin{aligned} &\text{There are 52 choices for the first card.} \\ &\text{There are 51 choices for the second card.} \\ &\vdots \\ &\text{There is 1 choice for the 52nd card.} \end{aligned}" />
          </div>
          <p>
            By the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Rule_of_product"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 hover:opacity-70 transition-opacity"
            >
              product principle
            </a>
            , the total number of permutations is:
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
            <BlockMath math="52 \times 51 \times \cdots \times 1 = 52! ≈ 10^{67}" />
          </div>
          <p>
            The number of atoms in the solar system is estimated to be around{" "}
            <InlineMath math="10^{50}" />.
          </p>
          <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
            <BlockMath math="52! > 10^{50}" />
          </div>
          <p>
            Therefore, the number of permutations of a 52 deck cards is greater
            than the number of atoms in the solar system.
          </p>
        </div>
      </>
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
