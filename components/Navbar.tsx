"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";

export function Navbar() {
  const pathname = usePathname();
  const hydrated = useHasHydrated();
  const shortlistCount = useShortlistStore((s) => Object.keys(s.entries).length);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
            ⌁
          </span>
          Car Decision Assistant
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/preferences"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isActive("/preferences") && "text-foreground underline underline-offset-4"
            )}
          >
            Questionnaire
          </Link>
          <Link
            href="/recommendations"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isActive("/recommendations") && "text-foreground underline underline-offset-4"
            )}
          >
            Recommendations
          </Link>
          <Link
            href="/shortlist"
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-foreground",
              isActive("/shortlist") && "text-foreground underline underline-offset-4"
            )}
          >
            My List
            {hydrated && shortlistCount > 0 && (
              <Badge variant="secondary">{shortlistCount}</Badge>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
