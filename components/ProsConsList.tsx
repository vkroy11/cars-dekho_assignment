export function ProsConsList({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          Pros
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {pros.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-400">
          Cons
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {cons.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
