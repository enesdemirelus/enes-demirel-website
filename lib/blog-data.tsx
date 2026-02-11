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
        excerpt: "An interesting fact everyday",
        date: "2026-02-11",
        readTime: "1 min",
        emoji: "🤔",
        pinned: true,
        content: () => (
            <>                
                 <div className="border rounded-lg px-6 py-4 mb-6 bg-muted/30">
                     <h2 style={{ marginTop: 0 }}>February 10, 2026</h2>
                    <p>Did you know that all possible arangements of a 52 deck cards is greater than the number of atoms in the solar system?</p>
                    <p style={{ fontWeight: "bold" }}>Explanation:</p>
                    <p>We first need to calculate the total number of permutations of a 52 deck cards. This can be done with calculating how many ways we can arrange 52 distinct cards:</p>
                    <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
                        <BlockMath math="\begin{aligned} &\text{There are 52 choices for the first card.} \\ &\text{There are 51 choices for the second card.} \\ &\vdots \\ &\text{There is 1 choice for the 52nd card.} \end{aligned}" />
                    </div>
                    <p>By the <a href="https://www.amazon.com/Inquiry-Based-Enumerative-Combinatorics-Ninety-Nine-Undergraduate/dp/3030183106" target="_blank" rel="noopener noreferrer" className="underline decoration-2 hover:opacity-70 transition-opacity">product principle</a>, the total number of permutations is:</p>
                    <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
                        <BlockMath math="52 \times 51 \times \cdots \times 1 = 52! ≈ 10^{67}" />
                    </div>
                    <p>The number of atoms in the solar system is estimated to be around <InlineMath math="10^{50}" />.</p>
                    <div className="border rounded-lg p-4 my-4 bg-muted/50 overflow-x-auto">
                        <BlockMath math="52! > 10^{50}" />
                    </div>
                    <p>Therefore, the number of permutations of a 52 deck cards is greater than the number of atoms in the solar system.</p>
                    

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

