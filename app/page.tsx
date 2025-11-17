"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Coffee,
  Code2,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Subtle grid background */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Minimal header */}
      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>enesdemirel</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#projects" className="hover:underline">
              projects
            </a>
            <a href="#about" className="hover:underline">
              about
            </a>
            <a href="#contact" className="hover:underline">
              contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>open to opportunities</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              hey, i'm enes 👋
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              I like building things, exploring math, and working hard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <a href="#projects">see my work</a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="/enesdemirel_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-4 h-4" />
                resume
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/demirelnes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                get in touch
              </a>
            </Button>
          </div>
        </div>

        {/* Quick stats - terminal style */}
        <Card className="mt-12 bg-muted/50 border-dashed">
          <CardContent className="px-4 py-3 font-mono text-sm">
            <div className="space-y-2">
              <p className="text-foreground">
                <span className="text-primary">guest</span>
                <span>:</span>
                <span className="text-primary">~</span>
                <span>$</span>
                <span className="text-muted-foreground"> whoami</span>
              </p>
              <div className="text-muted-foreground space-y-0.5 pl-0">
                <p>&gt; name: enes</p>
                <p>
                  &gt; studying: math & cs @{" "}
                  <a
                    href="https://www.depaul.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors"
                  >
                    depaul university
                  </a>
                </p>
                <p>
                  &gt; working: swe intern @{" "}
                  <a
                    href="https://www.airblox.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors"
                  >
                    airblox
                  </a>
                </p>
                <p>&gt; location: chicago, il</p>
                <p>
                  &gt; interests: math, ml, coding,{" "}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="underline decoration-primary/50 hover:decoration-primary underline-offset-2 transition-colors cursor-pointer"
                  >
                    soccer
                  </button>
                  , f1{" "}
                </p>
              </div>
              <p className="text-foreground">
                <span className="text-primary">guest</span>
                <span>:</span>
                <span className="text-primary">~</span>
                <span>$</span>
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">projects</h2>
            <p className="text-muted-foreground">
              stuff i've built and still working on.
              <br />
              <br />
              note: some of the projects will open a youtube video because i
              dont want to pay for hosting anymore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Your existing projects */}
            <Link href="/occasion" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">🎉</div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl">occasion</CardTitle>
                  <CardDescription className="line-clamp-3">
                    full-stack event management platform with user
                    authentication, real-time event creation, category
                    filtering, and collaborative planning features. built with
                    modern web technologies and deployed on vercel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">next.js 15</Badge>
                    <Badge variant="secondary">typescript</Badge>
                    <Badge variant="secondary">prisma</Badge>
                    <Badge variant="secondary">clerk auth</Badge>
                    <Badge variant="secondary">tailwind</Badge>
                    <Badge variant="secondary">postgresql</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/enes-ml-lab" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">🤖</div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl">ml lab</CardTitle>
                  <CardDescription className="line-clamp-3">
                    personal machine learning portfolio showcasing various ai/ml
                    projects including computer vision, nlp, and deep learning
                    experiments. features interactive demos and detailed
                    explanations of each model.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">python</Badge>
                    <Badge variant="secondary">pytorch</Badge>
                    <Badge variant="secondary">tensorflow</Badge>
                    <Badge variant="secondary">next.js</Badge>
                    <Badge variant="secondary">numpy</Badge>
                    <Badge variant="secondary">scikit-learn</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/masters" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">📊</div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl">masters tracker</CardTitle>
                  <CardDescription className="line-clamp-3">
                    comprehensive grad school application tracker with database
                    management, deadline tracking, and program comparison
                    features. includes password-protected personal tracker and
                    demo mode for showcasing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">next.js 15</Badge>
                    <Badge variant="secondary">typescript</Badge>
                    <Badge variant="secondary">mantine ui</Badge>
                    <Badge variant="secondary">prisma</Badge>
                    <Badge variant="secondary">postgresql</Badge>
                    <Badge variant="secondary">vercel</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Placeholder for future project */}
            <Card className="border-dashed">
              <CardHeader>
                <div className="text-3xl mb-2">💭</div>
                <CardTitle className="text-xl">[next project]</CardTitle>
                <CardDescription>
                  [idea you're working on or want to build]
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">coming soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About - asymmetric layout */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">about me</h2>
              <div className="prose prose-neutral space-y-4 text-muted-foreground">
                <p>
                  [write naturally here - who are you? what got you into cs?
                  what problems do you actually find interesting? be honest and
                  casual]
                </p>
                <p>
                  [more about your journey - what you're learning, what excites
                  you, maybe a project that went horribly wrong but taught you a
                  lot]
                </p>
                <p>
                  outside of coding: [hobbies, interests, what you do for fun]
                </p>
              </div>
            </div>

            {/* Experience cards */}
            <div className="space-y-4">
              <h3 className="font-semibold">experience</h3>

              <Card className="gap-0">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        Software Developer Intern
                      </CardTitle>
                      <CardDescription>Airblox</CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      June 2025 - Present
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-1">
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>
                      Building React components based on a design system
                      provided by the UI/UX team.
                    </li>
                    <li>
                      Using GitLab, Storybook, and Figma to collaborate and
                      maintain consistent visual standards.
                    </li>
                    <li>
                      Contributing to a frontend codebase used by a growing
                      development team.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        [another role]
                      </CardTitle>
                      <CardDescription>[place]</CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      [dates]
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    [brief description]
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-mono text-muted-foreground">
                  // stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">languages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>python</Badge>
                    <Badge>typescript</Badge>
                    <Badge>javascript</Badge>
                    <Badge>c++</Badge>
                    <Badge>java</Badge>
                    <Badge>c#</Badge>
                    <Badge>swift</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">tools & frameworks</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">react</Badge>
                    <Badge variant="secondary">next.js</Badge>
                    <Badge variant="secondary">git</Badge>
                    <Badge variant="secondary">tensorflow</Badge>
                    <Badge variant="secondary">numpy</Badge>
                    <Badge variant="secondary">prisma</Badge>
                    <Badge variant="secondary">figma</Badge>
                    <Badge variant="secondary">storybook</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">learning</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">jax</Badge>
                    <Badge variant="outline">deep learning</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="py-4 text-center">
                <p className="text-sm italic">
                  "Chess is just a game, and real people aren't pieces. You
                  can't assign more value to some of them than to others. Not to
                  me, not to anyone. People are not a thing that you can
                  sacrifice. The lesson is – anyone who looks on the world as if
                  it was a game of chess Deserves to lose."
                </p>
                <p className="text-sm italic mt-4">
                  <a
                    href="https://www.youtube.com/watch?v=YkYAoOjm27U"
                    className="text-blue-300 hover:text-blue-200 underline transition-colors"
                  >
                    - Harold Finch
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="-mb-5">
                <CardTitle className="text-sm">current status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground pb-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>
                    probably vibe coding something or failing a leetcode
                    problem.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>fueled by caffeine</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-2xl">let's connect</CardTitle>
            <CardDescription className="text-base">
              I don't think you care, but if you need to contact me, you can do
              so via email, github, or linkedin.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-3 pb-6 pt-0">
            <Button variant="outline" size="lg" asChild>
              <a
                href="mailto:enesdemirelus@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="w-4 h-4" />
                email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/enesdemirelus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                github
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://www.linkedin.com/in/demirelnes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                linkedin
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} [your name]</span>
            </div>
            <p className="font-mono text-xs">
              [fun footer text - like "built at 3am" or "powered by
              stackoverflow"]
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/gs.avif"
              alt="Soccer"
              width={1200}
              height={800}
              className="rounded-lg object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
