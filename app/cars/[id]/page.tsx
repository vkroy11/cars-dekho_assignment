import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CarDekhoLogo, YouTubeLogo } from "@/components/BrandLogos";
import { CarImage } from "@/components/CarImage";
import { DetailActions } from "@/components/DetailActions";
import { FuelBadges } from "@/components/FuelBadges";
import { ProsConsList } from "@/components/ProsConsList";
import { getAllCars, getCarById } from "@/lib/cars";
import { cardekhoUrl, efficiencyLabel, formatPriceRange, isEV, ytSearchUrl } from "@/lib/utils";

export function generateStaticParams() {
  return getAllCars().map((c) => ({ id: c.id }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  const specs: { label: string; value: string }[] = [
    { label: "Body type", value: car.type },
    { label: "Brand", value: car.brand },
    {
      label: "Ex-showroom",
      value: formatPriceRange(car.priceMin, car.priceMax),
    },
    {
      label: isEV(car) && car.rangeKm ? "Range" : "Mileage",
      value: efficiencyLabel(car),
    },
    { label: "Max power", value: `${car.power} bhp` },
    { label: "Safety rating", value: `${car.safety} / 5` },
    { label: "Brand tier", value: `${car.brandTier} / 5` },
    { label: "Maintenance", value: `${car.maintenanceCost} / 5 (lower = cheaper)` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/recommendations"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to recommendations
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl border bg-muted">
          <CarImage car={car} priority />
          <Badge variant="secondary" className="absolute right-3 top-3">
            {car.type}
          </Badge>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">{car.brand}</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {car.name}
          </h1>
          <div className="mt-1 text-lg">
            {formatPriceRange(car.priceMin, car.priceMax)}{" "}
            <span className="text-sm text-muted-foreground">(ex-showroom)</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <FuelBadges fuelTypes={car.fuelTypes} />
          </div>

          <div className="mt-6">
            <DetailActions carId={car.id} carName={car.name} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={ytSearchUrl(car.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", className: "gap-2" })}
            >
             
              Watch reviews on YouTube <YouTubeLogo className="h-5 w-5" />
            </a>
            <a
              href={cardekhoUrl(car.id)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Detailed specs for ${car.name} on CarDekho`}
              className={buttonVariants({ variant: "outline", className: "gap-2" })}
            >
              <span className="text-sm text-muted-foreground">Detailed specs on</span>
              <CarDekhoLogo className="h-4 w-auto" />
            </a>
          </div>
        </div>
      </div>

      <section className="mt-12 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">Specifications</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {specs.map((s) => (
            <div key={s.label} className="flex justify-between border-b pb-2">
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="text-sm font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
        {car.variants.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold">Variants</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {car.variants.map((v) => (
                <Badge key={v} variant="outline">
                  {v}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">The honest take</h2>
        <div className="mt-4">
          <ProsConsList pros={car.pros} cons={car.cons} />
        </div>
      </section>
    </div>
  );
}
