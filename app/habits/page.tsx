"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import Link from "next/link";
import PasswordProtection from "@/components/PasswordProtection";

interface Timer {
  id: string;
  name: string;
  startTime: number | null;
}

export default function HabitsPage() {
  // Set your start time here - format: "YYYY-MM-DDTHH:MM:SS"
  // December 7, 2025 at 7:30 PM Chicago time
  const START_TIME = new Date("2025-12-07T19:30:00").getTime();

  const [timer] = useState<Timer>({
    id: "habit-1",
    name: "Social Media Detox",
    startTime: START_TIME, // Fixed start time - won't reset on refresh
  });

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTime = (startTime: number | null) => {
    if (!startTime) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const diff = currentTime - startTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = calculateTime(timer.startTime);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <PasswordProtection>
      <div className="min-h-screen">
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <header className="border-b">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm hover:underline"
            >
              <Terminal className="w-4 h-4" />
              <span>enesdemirel</span>
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/#projects" className="hover:underline">
                projects
              </Link>
              <Link href="/#about" className="hover:underline">
                about
              </Link>
              <Link href="/#contact" className="hover:underline">
                contact
              </Link>
            </div>
          </nav>
        </header>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">habit tracker</h1>
              <p className="text-muted-foreground">
                track your habits with persistent timers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl">{timer.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="font-mono text-center">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">
                          {formatNumber(days)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          days
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">
                          {formatNumber(hours)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          hours
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">
                          {formatNumber(minutes)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          mins
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">
                          {formatNumber(seconds)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          secs
                        </div>
                      </div>
                    </div>
                  </div>

                  {timer.startTime && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>
                        tracking since{" "}
                        {new Date(timer.startTime).toLocaleString()}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PasswordProtection>
  );
}
