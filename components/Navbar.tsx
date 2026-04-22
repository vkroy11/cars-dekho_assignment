"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import { cn } from "@/lib/utils";

const LINKS: { href: string; label: string; short: string }[] = [
  { href: "/preferences", label: "Questionnaire", short: "Questionnaire" },
  { href: "/recommendations", label: "Recommendations", short: "Recommendations" },
  { href: "/shortlist", label: "My List", short: "My List" },
];

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hydrated = useHasHydrated();
  const shortlistCount = useShortlistStore((s) => Object.keys(s.entries).length);
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold"
        >
          <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
            ⌁
          </span>
          <span className="truncate">
            <span className="sm:hidden">Car Assistant</span>
            <span className="hidden sm:inline">Car Decision Assistant</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 transition-colors",
                isActive(l.href)
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{l.label}</span>
              {l.href === "/shortlist" && hydrated && shortlistCount > 0 && (
                <Badge variant="secondary">{shortlistCount}</Badge>
              )}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent active:scale-95 md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          {!open && hydrated && shortlistCount > 0 && (
            <span
              aria-hidden
              className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
            >
              {shortlistCount}
            </span>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t transition-[max-height,opacity] duration-200 ease-out md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center justify-between py-3 text-base transition-colors",
                i < LINKS.length - 1 && "border-b",
                isActive(l.href)
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span>{l.short}</span>
              {l.href === "/shortlist" && hydrated && shortlistCount > 0 && (
                <Badge variant="secondary">{shortlistCount}</Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
