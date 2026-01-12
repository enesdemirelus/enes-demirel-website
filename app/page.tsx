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

import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm hover:opacity-80 transition-opacity"
          >
            <Terminal className="w-4 h-4" />
            <span>enesdemirel</span>
          </Link>
          <div className="flex gap-6 text-sm items-center">
            <a href="#projects" className="hover:underline hidden sm:inline">
              projects
            </a>
            <a href="#about" className="hover:underline hidden sm:inline">
              about
            </a>
            <a href="#contact" className="hover:underline hidden sm:inline">
              contact
            </a>
            <Link href="/you-should-really-watch" className="hover:underline">
              YSRW
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

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
              I like building things and exploring math.
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

      <section id="projects" className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">main projects</h2>
            <p className="text-muted-foreground">
              stuff i've built or still working on.
              <br />
              <br />
              note: most of these projects will open a youtube video because i
              dont want to pay for hosting anymore. You can visit github for the
              code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/enes-ml-lab" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">🤖</div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl">enes' ml lab</CardTitle>
                  <CardDescription className="line-clamp-3">
                    personal machine learning portfolio showcasing various ai/ml
                    projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">python</Badge>
                    <Badge variant="secondary">tensorflow</Badge>
                    <Badge variant="secondary">next.js</Badge>
                    <Badge variant="secondary">keras</Badge>
                    <Badge variant="secondary">numpy</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/projects/masters-tracker" className="group">
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

            <Link href="/projects/occasion" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">📆</div>
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
                    <Badge variant="secondary">next.js</Badge>
                    <Badge variant="secondary">typescript</Badge>
                    <Badge variant="secondary">shadcn/ui</Badge>
                    <Badge variant="secondary">prisma</Badge>
                    <Badge variant="secondary">railway / mySQL</Badge>
                    <Badge variant="secondary">clerk auth</Badge>
                    <Badge variant="secondary">tailwind</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/projects" className="group">
              <Card className="border-dashed h-full transition-all hover:shadow-lg hover:border-foreground/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">📁</div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl">more projects</CardTitle>
                  <CardDescription className="line-clamp-3">
                    explore my complete portfolio of projects, experiments, and
                    side projects. from full-stack applications to machine
                    learning models and everything in between.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">view all →</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">about me</h2>
              <div className="prose prose-neutral space-y-4 text-muted-foreground">
                <p>
                  Hi, my name is Enes. I am 22 years old and living in Chicago,
                  IL. I am currently studying Math and Computer Science at
                  DePaul University. I am interested in Machine Learning,
                  Artificial Intelligence, Software Development, and Math.
                </p>
                <p>
                  As far as I can remember, I have always been interested in
                  coding and math. I love the mathematical side of computers a
                  lot, and that is what excites me the most. If you go back to
                  elementary grade Enes, he would say that he wants to be a
                  software engineer as well.
                </p>
                <p>
                  Outside of coding, I like to play soccer, play FIFA, watch F1,
                  and enjoy some other sports.
                </p>
              </div>
            </div>

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
                      Recreated UI components from the Figma design system as
                      reusable React components in a Storybook-driven codebase
                      using pnpm.
                    </li>
                    <li>
                      Matched each component's visuals and behavior to the
                      design specs and backend requirements, fixing issues found
                      during manual checks and sprint reviews.
                    </li>
                    <li>
                      Used Git and GitLab in a two-week sprint process to
                      address code review feedback, resolve merge conflicts, and
                      ship changes with the team via Jira and Slack.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="gap-0">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        Undergraduate Research Assistant
                      </CardTitle>
                      <CardDescription>
                        DePaul University, College of Science and Health
                      </CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Jan. 2025 - Present
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-1">
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>
                      Modeled a Crab Nebula–inspired signal by rotating
                      synthetic 2D point clouds and optimizing a kernel-based
                      objective;
                    </li>
                    <li>
                      Implemented angle estimation via bisection and built an
                      interactive matplotlib slider to explore angle dependence.
                    </li>
                    <li>
                      Implemented and tested an AGD-Until-Guilty method (JAX) to
                      certify convexity and surface counterexamples via witness
                      pairs; evaluated behavior on convex and non-convex
                      functions.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="gap-0">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">Grader</CardTitle>
                      <CardDescription>
                        DePaul University, College of Computing and Digital
                        Media
                      </CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Apr. 2025 - June 2025
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-1">
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>
                      Graded assignments for 90+ Data Structures students and
                      coordinated with professors to keep grading consistent.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-mono text-muted-foreground">
                  stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">languages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">python</Badge>
                    <Badge variant="secondary">typescript</Badge>
                    <Badge variant="secondary">javascript</Badge>
                    <Badge variant="secondary">c</Badge>
                    <Badge variant="secondary">java</Badge>
                    <Badge variant="secondary">c#</Badge>
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
                    <Badge variant="secondary">keras</Badge>
                    <Badge variant="secondary">gitlab</Badge>
                    <Badge variant="secondary">Tkinter</Badge>
                    <Badge variant="secondary">sqlite3</Badge>
                    <Badge variant="secondary">jira</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground dark:bg-secondary dark:text-secondary-foreground">
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
                    className="text-blue-300 dark:text-blue-600 hover:text-blue-200 dark:hover:text-blue-500 underline transition-colors"
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
                    probably watching person of interest or grinding a leetcode
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

      <section id="contact" className="max-w-5xl mx-auto px-6 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-2xl">let's connect</CardTitle>
            <CardDescription className="text-base">
              If you need to contact me, you can do so via email, github, or
              linkedin.
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

      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} enes demirel</span>
            </div>
            <p className="font-mono text-xs">
              <Link
                href="/you-should-really-watch"
                className="underline hover:opacity-80"
              >
                you should really watch
              </Link>{" "}
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

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50 transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
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
            quality={85}
          />
        </div>
      </div>
    </div>
  );
}
