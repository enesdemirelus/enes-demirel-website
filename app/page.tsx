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
import { Github, Linkedin, Mail, Coffee, Code2, FileText } from "lucide-react";
import Image from "next/image";

import { TerminalDemo } from "@/components/terminal-demo";
import { HackathonTimeline } from "@/components/hackathon-timeline";
import { ProjectTicker } from "@/components/project-ticker";

const experience = [
  {
    title: "Software Developer Intern",
    orgs: [{ name: "Airblox", href: "https://www.airblox.com/" }],
    period: "Jun. 2025 - Mar. 2026",
    bullets: [
      "Recreated UI components from the Figma design system as reusable React components in a Storybook-driven codebase using pnpm.",
      "Matched each component's visuals and behavior to the design specs and backend requirements, fixing issues found during manual checks and sprint reviews.",
      "Used Git and GitLab in a two-week sprint process to address code review feedback, resolve merge conflicts, and ship changes with the team via Jira and Slack.",
    ],
  },
  {
    title: "Undergraduate Research Assistant",
    orgs: [
      { name: "DePaul University", href: "https://www.depaul.edu/" },
      {
        name: "College of Science and Health",
        href: "https://csh.depaul.edu/",
      },
    ],
    period: "Jan. 2025 - Nov. 2025",
    bullets: [
      "Modeled a Crab Nebula–inspired signal by rotating synthetic 2D point clouds and optimizing a kernel-based objective;",
      "Implemented angle estimation via bisection and built an interactive matplotlib slider to explore angle dependence.",
      "Implemented and tested an AGD-Until-Guilty method (JAX) to certify convexity and surface counterexamples via witness pairs; evaluated behavior on convex and non-convex functions.",
    ],
  },
  {
    title: "Grader",
    orgs: [
      { name: "DePaul University", href: "https://www.depaul.edu/" },
      {
        name: "College of Computing and Digital Media",
        href: "https://cdm.depaul.edu/",
      },
    ],
    period: "Apr. 2025 - Jun. 2025",
    bullets: [
      "Graded assignments for 90+ Data Structures students and coordinated with professors to keep grading consistent.",
    ],
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExperience, setShowExperience] = useState(true);

  return (
    <div className="w-full">
      <ProjectTicker />

      <section className="max-w-5xl mx-auto px-6 pt-8 pb-8">
        <div className="space-y-6">
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
              <Link href="/projects">see my work</Link>
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

        <TerminalDemo onFootballClick={() => setIsModalOpen(true)} />
      </section>

      <section id="about" className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">about me</h2>
              <div className="prose prose-neutral space-y-4 text-muted-foreground">
                <p>
                  Merhaba (Hi) 👋🏻 , my name is Enes. I am 22 years old and
                  living in Chicago, IL. I am currently studying Math and
                  Computer Science at DePaul University. I am interested in
                  Machine Learning, Artificial Intelligence, Software
                  Development, and Math.
                </p>
                <p>
                  As far as I can remember, I have always been interested in
                  coding and math. I love the mathematical side of computers a
                  lot, and that is what excites me the most. If you go back to
                  elementary grade Enes, he would say that he wants to be a
                  software engineer as well.
                </p>
                <p>
                  Outside of coding, I like to play football, play FIFA, watch
                  F1, and enjoy some other sports.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative inline-flex items-center bg-muted rounded-lg p-1 gap-1">
                <button
                  onClick={() => setShowExperience(true)}
                  className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    showExperience
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  experience
                </button>
                <button
                  onClick={() => setShowExperience(false)}
                  className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    !showExperience
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  education
                </button>
                <div
                  className={`absolute top-1 h-[calc(100%-8px)] bg-primary rounded-md transition-all duration-300 ease-out ${
                    showExperience
                      ? "left-1 w-[calc(50%-4px)]"
                      : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
                  }`}
                />
              </div>

              {showExperience ? (
                <>
                  {experience.map((job) => (
                    <Card key={job.title} className="gap-0">
                      <CardHeader className="pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">
                              {job.title}
                            </CardTitle>
                            <CardDescription>
                              {job.orgs.map((org, i) => (
                                <span key={org.name}>
                                  {i > 0 && ","}
                                  <a
                                    href={org.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary transition-colors"
                                  >
                                    {org.name}
                                  </a>
                                </span>
                              ))}
                            </CardDescription>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {job.period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-1">
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          {job.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <Card className="gap-0">
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            B.S. in Mathematics and Computer Science
                          </CardTitle>
                          <CardDescription>
                            <a
                              href="https://www.depaul.edu/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-primary transition-colors"
                            >
                              DePaul University
                            </a>
                          </CardDescription>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Sep. 2023 - June 2027
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-1">
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex gap-2">
                          <span className="font-medium text-foreground">
                            GPA:
                          </span>
                          <span>3.87 Overall • 3.95 Major</span>
                        </div>

                        <div>
                          <p className="font-medium text-foreground mb-2">
                            Relevant Coursework
                          </p>
                          <div className="space-y-2 pl-4 border-l-2 border-muted">
                            <div>
                              <p className="font-medium text-foreground/80 mb-1">
                                Mathematics
                              </p>
                              <p className="text-xs leading-relaxed">
                                Calculus I, II, III, Discrete Mathematics I, II,
                                Linear Algebra, Multivariable Calculus,
                                Probability & Statistics, Optimization Theory,
                                Combinatorics, Graph Theory
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-foreground/80 mb-1">
                                Computer Science
                              </p>
                              <p className="text-xs leading-relaxed">
                                Intro to Computer Science I, II, Data Structures
                                I, II, Web Computing, Ethics in Technology,
                                Design & Analysis of Algorithms, Object-Oriented
                                Software Development, Computer Systems I, II
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span className="font-medium text-foreground">
                            Extracurricular:
                          </span>
                          <span>
                            Treasurer of Turkish Student Association & DePaul AI
                            Club
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <span className="font-medium text-foreground">
                            Dean's List:
                          </span>
                          <span>Every Quarter</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="gap-0">
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            Summer Visiting Student
                          </CardTitle>
                          <CardDescription>
                            <a
                              href="https://www.stanford.edu/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-primary transition-colors"
                            >
                              Stanford University
                            </a>
                          </CardDescription>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Summer 2026
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-1">
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Coursework:
                        </span>
                        <span>CS 229: Machine Learning</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="gap-0">
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">
                            High School
                          </CardTitle>
                          <CardDescription>
                            <a
                              href="https://formkampuskoleji.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-primary transition-colors"
                            >
                              Private Form Kampus Anatolian High School
                            </a>
                          </CardDescription>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Sep. 2018 - June 2022
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-1">
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          GPA:
                        </span>
                        <span>4.0</span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
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
                    probably watching person of interest or trying to learn vim.
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

      <section id="hackathons" className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">hackathons</h2>
            <p className="text-muted-foreground">
              hackathons i&apos;ve attended and competed in.
            </p>
          </div>
          <HackathonTimeline />
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
            alt="Football"
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
