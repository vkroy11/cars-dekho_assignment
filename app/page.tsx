import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MARQUEE_CARS = [
  "maruti-swift",
  "hyundai-creta",
  "tata-nexon",
  "mahindra-xuv700",
  "mahindra-thar",
  "kia-seltos",
  "toyota-hyryder",
  "tata-harrier",
  "honda-city",
  "hyundai-verna",
  "mg-windsor-ev",
  "tata-nexon-ev",
  "maruti-baleno",
  "maruti-fronx",
  "mahindra-scorpio-n",
];

function IconArrowRight({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconSpark({ className }: { className?: string }) {
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
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M5.6 5.6l2.1 2.1" />
      <path d="M16.3 16.3l2.1 2.1" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M5.6 18.4l2.1-2.1" />
      <path d="M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconScale({ className }: { className?: string }) {
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
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MockRecCard() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card shadow-lg">
      <div className="relative aspect-[5/3] w-full bg-muted">
        <Image
          src="/cars/hyundai-creta.jpg"
          alt="Hyundai Creta"
          fill
          sizes="(min-width: 1024px) 360px, 80vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3 inline-flex h-7 items-center rounded-full bg-background/95 px-2 text-xs font-semibold shadow">
          #1 match
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-muted-foreground">Hyundai</div>
        <div className="font-semibold">Hyundai Creta</div>
        <p className="mt-2 text-xs text-muted-foreground">
          Recommended because it offers{" "}
          <span className="font-medium text-foreground">a high safety rating</span>{" "}
          and{" "}
          <span className="font-medium text-foreground">strong fuel efficiency</span>{" "}
          within your budget.
        </p>
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Match score</span>
            <span className="font-semibold text-foreground">86%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-muted">
            <div className="h-full w-[86%] bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MockQuestionnaire() {
  const sliders = [
    { label: "Mileage", value: 5 },
    { label: "Safety", value: 5 },
    { label: "Brand", value: 3 },
  ];
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        What matters most
      </div>
      <div className="mt-4 space-y-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm">{s.label}</span>
              <span className="text-xs font-semibold tabular-nums">{s.value}</span>
            </div>
            <div className="mt-1.5 h-1 w-full rounded bg-muted">
              <div
                className="h-full rounded bg-primary"
                style={{ width: `${(s.value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockStages() {
  const stages = [
    { label: "Exploring", active: true },
    { label: "Comparing", active: true },
    { label: "Shortlisted", active: true },
    { label: "Test drive", active: false },
    { label: "Final pick", active: false },
  ];
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Your decision journey
      </div>
      <ol className="mt-4 space-y-3">
        {stages.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3 text-sm">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold",
                s.active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              {s.active ? <IconCheck className="h-3 w-3" /> : i + 1}
            </span>
            <span className={s.active ? "" : "text-muted-foreground"}>
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MockCompare() {
  const rows = [
    { label: "Price", a: "₹11.0L", b: "₹10.8L", winner: "b" as const },
    { label: "Mileage", a: "19.1 kmpl", b: "17.7 kmpl", winner: "a" as const },
    { label: "Power", a: "160 bhp", b: "160 bhp", winner: null },
    { label: "Safety", a: "4★", b: "5★", winner: "b" as const },
  ];
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="grid grid-cols-3 border-b bg-muted/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <span>Feature</span>
        <span className="text-center">Creta</span>
        <span className="text-center">Seltos</span>
      </div>
      <div className="divide-y text-sm">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-3 items-center px-4 py-2.5">
            <span className="text-muted-foreground">{r.label}</span>
            <span
              className={cn(
                "text-center",
                r.winner === "a" &&
                  "rounded bg-emerald-50 font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
              )}
            >
              {r.a}
            </span>
            <span
              className={cn(
                "text-center",
                r.winner === "b" &&
                  "rounded bg-emerald-50 font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
              )}
            >
              {r.b}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(186,230,253,0.55),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(14,165,233,0.15),transparent_70%)]"
      />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free · No sign-up · 40 curated cars · 2025/26 models
            </span>

            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
              Buying a car{" "}
              <span className="text-muted-foreground">shouldn&apos;t feel like</span>{" "}
              <span className="whitespace-nowrap">homework.</span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-muted-foreground sm:text-lg">
              Tell us what actually matters — budget, body type, fuel, and how much
              you care about mileage vs safety vs brand. We rank 40 popular Indian
              cars, explain the picks in plain English, and walk you from
              &ldquo;exploring&rdquo; all the way to &ldquo;final decision.&rdquo;
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/preferences"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "cursor-pointer gap-2 px-5 text-base",
                )}
              >
                Find your car
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/recommendations"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "cursor-pointer px-5 text-base",
                )}
              >
                Browse recommendations
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-l pl-6">
              {[
                { k: "40", v: "Indian cars" },
                { k: "3", v: "Clear picks" },
                { k: "<60s", v: "Questionnaire" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-semibold tracking-tight">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Stacked mock card cluster */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100 via-transparent to-transparent dark:from-sky-500/10" />

            <div className="relative">
              <div className="relative z-20">
                <MockRecCard />
              </div>
              <div className="absolute -left-8 top-24 z-10 hidden w-52 rotate-[-4deg] sm:block">
                <MockQuestionnaire />
              </div>
              <div className="absolute -right-6 -bottom-10 z-10 hidden w-56 rotate-[3deg] sm:block">
                <MockStages />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section aria-label="Cars in the catalogue" className="border-y bg-card/50">
        <div className="mx-auto max-w-7xl overflow-hidden py-6">
          <div className="flex gap-4 animate-[marquee_50s_linear_infinite] will-change-transform">
            {[...MARQUEE_CARS, ...MARQUEE_CARS].map((id, i) => (
              <div
                key={`${id}-${i}`}
                className="relative aspect-[5/3] w-48 flex-shrink-0 overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={`/cars/${id}.jpg`}
                  alt=""
                  fill
                  sizes="192px"
                  className="object-cover opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            How it works
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps between you and clarity.
          </h2>
          <p className="mt-3 text-muted-foreground">
            No jargon, no overwhelm, no &ldquo;click this EMI calculator&rdquo;
            detours. Just a structured path from 40 options to 1 decision.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Tell us what matters",
              body: "Budget range, one or more body types, fuel preference, and five priority sliders. Under a minute.",
            },
            {
              n: "02",
              title: "See your top matches",
              body: "We normalise each spec across your filtered pool, apply your weights, and explain the reasoning per pick.",
            },
            {
              n: "03",
              title: "Shortlist to final pick",
              body: "Move cars through Exploring → Comparing → Shortlisted → Test drive → Final. State saved on your device.",
            },
          ].map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-sm font-medium text-primary">
                  {s.n}
                </span>
                <span className="h-px flex-1 origin-right scale-x-50 bg-border ml-4" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* BENTO FEATURE GRID */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            Built around how buyers actually think
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Not a spec sheet. A decision tool.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-6 md:grid-rows-2">
          {/* Big: weighted scoring */}
          <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-6 md:col-span-4 md:row-span-2">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <IconSpark className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">
                Weighted, explainable recommendations
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Your sliders directly shape the score. Every pick tells you which two
                priorities it actually wins on for <em>you</em> — not a generic
                &ldquo;Editor&apos;s Choice&rdquo; badge.
              </p>
            </div>
            <div className="mt-6">
              <MockRecCard />
            </div>
          </article>

          {/* Medium: comparison */}
          <article className="flex flex-col justify-between rounded-2xl border bg-card p-6 md:col-span-2">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <IconScale className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                Side-by-side with winners
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Compare 2–3 cars. Best-in-row cells highlighted so trade-offs are obvious.
              </p>
            </div>
            <div className="mt-5">
              <MockCompare />
            </div>
          </article>

          {/* Medium: shortlist journey */}
          <article className="flex flex-col justify-between rounded-2xl border bg-card p-6 md:col-span-2">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                <IconLayers className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                A journey, not a list
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track each car through 5 stages. Your progress persists — close the tab
                and come back next week.
              </p>
            </div>
            <div className="mt-5">
              <MockStages />
            </div>
          </article>
        </div>
      </section>

      {/* TRUST / DIFFERENTIATORS */}
      <section className="border-t bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Why not just Google it?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Review sites bury trade-offs under sponsored banners. Spec sheets treat
                every buyer the same. This tool fits the decision to <em>you</em> —
                and shows its work.
              </p>
            </div>
            <dl className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  k: "Weighted to your priorities",
                  v: "Two buyers, same budget, different #1 picks.",
                },
                {
                  k: "Plain-English reasoning",
                  v: "Every card explains which two factors it actually wins on.",
                },
                {
                  k: "No sign-up, no email",
                  v: "Preferences and shortlist stay on your device.",
                },
                {
                  k: "Real 2025/26 data",
                  v: "40 popular Indian cars, fresh from CarDekho listings.",
                },
              ].map((d) => (
                <div key={d.k} className="flex gap-3">
                  <div className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IconCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <dt className="font-medium">{d.k}</dt>
                    <dd className="text-sm text-muted-foreground">{d.v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-primary/70 p-10 text-primary-foreground shadow-xl sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Ready to stop scrolling?
            </h2>
            <p className="mt-4 text-primary-foreground/90 sm:text-lg">
              Three clear choices, picked for how <em>you</em> drive, live, and spend.
              One minute to start.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/preferences"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-background px-5 py-3 text-base font-medium text-foreground shadow-sm transition hover:shadow-md"
              >
                Find your car
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/recommendations"
                className="inline-flex cursor-pointer items-center rounded-lg border border-primary-foreground/30 px-5 py-3 text-base font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                Browse recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
