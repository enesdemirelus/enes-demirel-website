"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, ChevronDown, Star } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

type Category = "Watch" | "Read" | "Listen" | "Play" | "Watch - Subscribe";

interface Item {
  title: string;
  rating?: number;
  description?: string;
  artist?: string;
  link?: string;
}

const items: Record<Category, Item[]> = {
  Watch: [
    {
      title: "Interstellar",
      rating: 5,
      link: "https://www.imdb.com/title/tt0816692/",
    },
    {
      title: "Pantheon",
      rating: 5,
      link: "https://www.imdb.com/title/tt11680642/?ref_=fn_t_1/",
    },
  ],
  Read: [
    {
      title: "Project Hail Mary",
      rating: 5,
      link: "https://www.goodreads.com/book/show/54493401-project-hail-mary",
    },
  ],
  Listen: [
    {
      title: "Welcome to the Machine",
      artist: "Pink Floyd",
      link: "https://www.youtube.com/watch?v=lt-udg9zQSE",
    },
  ],
  Play: [
    {
      title: "Stray",
      rating: 5,
      link: "https://store.steampowered.com/app/1332010/Stray/",
    },
  ],
  "Watch - Subscribe": [
    {
      title: "Enes Demirel",
      description: "me 👋🏻",
      link: "https://www.youtube.com/@demirelnes",
    },
    {
      title: "3Blue1Brown",
      description: "Best math channel on Youtube with stunning visualizations",
      link: "https://www.youtube.com/@3blue1brown",
    },
  ],
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "fill-foreground text-foreground"
              : "fill-none text-foreground/20"
          }`}
        />
      ))}
    </span>
  );
};

export default function YouShouldReallyWatch() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Watch");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories: Category[] = [
    "Watch",
    "Read",
    "Listen",
    "Play",
    "Watch - Subscribe",
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
          <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm items-center">
            <Link
              href="/#projects"
              className="hover:underline hidden sm:inline"
            >
              projects
            </Link>
            <Link href="/#about" className="hover:underline hidden sm:inline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline hidden sm:inline">
              contact
            </Link>
            <Link href="/you-should-really-watch" className="hover:underline">
              YSRW
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8 sm:py-16 flex-grow w-full">
        <div className="space-y-6">
          {/* Dynamic Title */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold flex flex-wrap items-center gap-2">
              <span>You Should Really</span>
              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-1 cursor-pointer hover:text-primary transition-colors px-1 -mx-1 rounded"
                >
                  <span className="underline decoration-2">
                    {selectedCategory}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-background border rounded-md shadow-lg overflow-hidden z-10 min-w-[180px]">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm ${
                          selectedCategory === category ? "font-semibold" : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </h1>
            <p className="text-sm text-muted-foreground">
              A curated list of things I enjoyed a lot and I think you should
              too. <br />
              Note: These items are not unique or rare, most of them are even
              mainstream.
              <br />
              So, don't expect anything groundbreaking or revolutionary.
            </p>
          </div>

          {/* Simple Bullet List */}
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            {items[selectedCategory].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                >
                  {item.title}
                </a>
                {item.artist && (
                  <span className="text-sm text-muted-foreground">
                    {item.artist}
                  </span>
                )}
                {item.rating && (
                  <>
                    <span>:</span>
                    <StarRating rating={item.rating} />
                  </>
                )}
                {item.description && (
                  <>
                    <span>:</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
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
    </div>
  );
}
