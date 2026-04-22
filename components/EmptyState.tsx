import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function EmptyState({
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-dashed bg-card p-10 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <Link href={ctaHref} className={buttonVariants({ className: "mt-5" })}>
        {ctaLabel}
      </Link>
    </div>
  );
}
