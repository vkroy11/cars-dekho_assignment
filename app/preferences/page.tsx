import { PreferenceForm } from "@/components/PreferenceForm";

export default function PreferencesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tell us what you want
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Takes about 60 seconds. You can change anything and re-rank instantly.
        </p>
      </div>
      <PreferenceForm />
    </div>
  );
}
